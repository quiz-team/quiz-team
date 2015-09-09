angular.module('meatloaf.game.roundOver', [])

.controller('gameRoundOverCtrl', ['$scope', '$rootScope', '$state', 'Timer', 'socket', 'trivia', 'session',
            function ($scope, $rootScope, $state, Timer, socket, trivia, session) {

  $scope.timer = Timer;
  $scope.numCorrect;
  $scope.ownQuestionCorrect = "";
  $scope.question = "";
  $scope.answer = "";
  $scope.total = "";

  socket.emit('enteredRoundOver');

  socket.on('roundResults', function(roundResults) {
    //do something with results
    $scope.numCorrect = roundResults.numCorrect;
    $scope.timer.syncTimerStart(roundResults.timerData);
    $scope.ownQuestionCorrect = roundResults.scoreByPlayer[session.getId()] ? "correct" : "incorrect";
    $scope.question = trivia.currentQuestion.text;
    $scope.answer = trivia.getAnswer(roundResults.correctAnswers[session.getId()]).text;
    $scope.total = roundResults.numCorrect.toString() + "/" + Object.keys(roundResults.scoreByPlayer).length;
  });

  socket.on('nextRound', function(roundNum) {
    $scope.timer.syncTimerStop();
    trivia.updateRound(roundNum);
    $state.go('gameRound', $state.params, {reload: true});
  });

  socket.on('gameOver', function() {
    $scope.timer.syncTimerStop();
    $state.go('gameOver');
  });

}]);