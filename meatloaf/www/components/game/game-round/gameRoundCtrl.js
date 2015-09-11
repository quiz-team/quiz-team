angular.module('meatloaf.game.round', [])

.controller('gameRoundCtrl', ['$scope', '$rootScope', '$state', '$timeout', 'Timer', 'socket', 'trivia', 'session',
            function ($scope, $rootScope, $state, $timeout, Timer, socket, trivia, session) {
              
  var selectAnswerTimeout;

  socket.emit('enteredRound');
  
  $scope.timer = Timer;
  $scope.question = trivia.currentQuestion;
  $scope.answers = trivia.getPlayerAnswers();
  $scope.lockedAnswer = {};


  //Constants:
  $scope.smallTextCutoff = 18;

  socket.on('startRound', function (roundData) {
    $scope.timer.syncTimerStart(roundData.timerData);
    $scope.question = trivia.currentQuestion;
    $scope.lockedAnswer = {};
  });

  socket.on('endRound', function(){
    $scope.timer.syncTimerStop();
    socket.emit('submitAnswer', {answer: $scope.lockedAnswer, question: $scope.question});
    setTimeout(function(){socket.emit('enteredRoundOver')},500);
  });

  $scope.selectAnswer = function (answerId) {
    lockAnswer(answerId);
  };

  $scope.unselectAnswer = function (answerId) {
    // start counting down until 0
    $timeout.cancel(selectAnswerTimeout);
  };

  $scope.isLockedAnswer = function (answerId){
    return $scope.lockedAnswer.id === answerId && $scope.lockedAnswer.locked;
  };
  
  var lockAnswer = function (answerId) {
    $scope.lockedAnswer = {};
    $scope.lockedAnswer = {id: answerId, locked: true};
  };


  //////////////////////////////////////////////////////////////////
  // ROUND OVER MODAL
  //////////////////////////////////////////////////////////////////

  // $scope.roundOverTimer = Timer;
  $scope.numCorrect;
  $scope.ownAnswerCorrect = "";
  $scope.correctQuestion = "";
  $scope.correctAnswer = "";
  $scope.total = "";
  $scope.dummy = 50;

  socket.on('roundResults', function(roundResults) {
    console.log("RECEIVED ROUND RESULTS!");
    //do something with results
    var questionAnswerPair = trivia.getCorrectQnA();
    $scope.numCorrect = roundResults.numCorrect;
    // $scope.roundOverTimer.syncTimerStart(roundResults.timerData);
    $scope.ownAnswerCorrect = roundResults.scoreByPlayer[session.getId()] ? "correct" : "incorrect";
    $scope.correctQuestion = questionAnswerPair.question.text;
    $scope.correctAnswer = questionAnswerPair.answer.text;
    $scope.total = roundResults.numCorrect.toString() + "/" + Object.keys(roundResults.scoreByPlayer).length;

    $scope.toggleModal()

    setTimeout(function(){
      $scope.toggleModal()
      if (trivia.roundNum < 6){
        trivia.updateRound(trivia.roundNum + 1);
        socket.emit('enteredRound');
      } else {
        $state.go('gameOver');
      }
    
    }, 3000);

  });

  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };

  // $ionicModal.fromTemplateUrl('results-modal.html', {
  //     scope: $scope,
  //     animation: 'slide-in-up'
  //   }).then(function(modal) {
  //     $scope.modal = modal;
  //   });
  // $scope.openModal = function(){
  //   $scope.modal.show();
  // }
  // $scope.closeModal = function(){
  //   $scope.modal.hide();
  // }



}]);
