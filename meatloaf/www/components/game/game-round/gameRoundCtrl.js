angular.module('meatloaf.game.round', [])

.controller('gameRoundCtrl', ['$scope', '$rootScope', '$state', '$timeout', 'Timer', 'socket', 'trivia', 'session', 'playerInfo',
            function ($scope, $rootScope, $state, $timeout, Timer, socket, trivia, session, playerInfo) {
              
  var selectAnswerTimeout;

  socket.emit('enteredRound');
  // console.log('EMITTING ENTERED ROUND');
  
  $scope.timer = Timer;
  $scope.question = trivia.currentQuestion;
  $scope.answers = trivia.getPlayerAnswers();
  $scope.lockedAnswer = {};
  $scope.playerName;
  $scope.playerNum = playerInfo.num;
  $scope.playerColor = playerInfo.color;

  var createAnimationStyle = function(duration){
    var animationString = 'animateColor ' + duration +'s ease, barWidth ' + duration + 's linear';
    // console.log("ANIMATION STRING: ", animationString)
    return {
      'animation': animationString,
      '-webkit-animation': animationString,
      '-moz-animation': animationString 
    };
  };

  var removeAnimateStyle = {  
    'animation': '',
    '-webkit-animation': '',
    '-moz-animation': '' 
  };

  var animateStyle;

  //Constants:
  $scope.smallTextCutoff = 18;

  socket.on('startRound', function (roundData) {
    // console.log("Round Start!");
    $scope.timer.syncTimerStart(roundData.timerData);
    animateStyle = createAnimationStyle($scope.timer.duration/1000);
    $('.timer-bar').css(animateStyle);
    $scope.question = trivia.currentQuestion;
    $scope.lockedAnswer = {};
  });

  socket.on('endRound', function(){
    // console.log("Round End!");
    $scope.timer.syncTimerStop();
    $('.timer-bar').css(removeAnimateStyle);
    socket.emit('submitAnswer', {answer: $scope.lockedAnswer, question: $scope.question});
    socket.emit('enteredRoundOver');
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
  $scope.ownAnswerCorrect = '';
  $scope.correctQuestion = '';
  $scope.correctAnswer = '';
  $scope.total = '';
  $scope.dummy = 50;

  socket.on('roundResults', function(roundResults) {
    // console.log("RECEIVED ROUND RESULTS!");
    //do something with results
    var questionAnswerPair = trivia.getCorrectQnA();
    $scope.numCorrect = roundResults.numCorrect;
    // $scope.roundOverTimer.syncTimerStart(roundResults.timerData);
    $scope.ownAnswerCorrect = roundResults.scoreByPlayer[session.getId()] ? 'correct' : 'incorrect';
    $scope.correctQuestion = questionAnswerPair.question.text;
    $scope.correctAnswer = questionAnswerPair.answer.text;
    $scope.total = roundResults.numCorrect.toString() + '/' + Object.keys(roundResults.scoreByPlayer).length;

    $('.ng-modal').removeClass('fade-out');
    $('.ng-modal').addClass('fade-in');
    $scope.toggleModal();
  });

  socket.on('nextRound', function(roundNum){
    trivia.updateRound(roundNum);
    $('.ng-modal').removeClass('fade-in');
    $('.ng-modal').addClass('fade-out');
    setTimeout(function(){
      $scope.toggleModal();
    },300);
    socket.emit('enteredRound');
  });

  socket.on('gameOver', function(){
    $state.go('gameOver');
  });

  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
}]);
