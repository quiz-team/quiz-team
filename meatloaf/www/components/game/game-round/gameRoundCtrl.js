angular.module('meatloaf.game.round', [])

.controller('gameRoundCtrl', ['$scope', '$rootScope', '$state', '$timeout', 'Timer', 'socket', 'trivia',
            function ($scope, $rootScope, $state, $timeout, Timer, socket, trivia) {
              
  var selectAnswerTimeout;

  socket.emit('enteredRound');
  
  $scope.timer = Timer;
  $scope.question = trivia.currentQuestion;
  $scope.answers = trivia.getPlayerAnswers();
  $scope.lockedAnswer = {};


  //Constants:
  $scope.smallTextCutoff = 18;

  socket.once('startRound', function (roundData) {

    $scope.timer.syncTimerStart(roundData.timerData);
  });

  socket.on('endRound', function(){
    $scope.timer.syncTimerStop();
    socket.emit('submitAnswer', {answer: $scope.lockedAnswer, question: $scope.question});
    $state.go('gameRoundOver', $state.params, {reload: true});
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
}]);
