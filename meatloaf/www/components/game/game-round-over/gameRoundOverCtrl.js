angular.module('meatloaf.game.roundOver', [])

.controller('gameRoundOverCtrl', ['$scope', '$rootScope', '$state', 'Timer', 'socket', 'trivia',
            function ($scope, $rootScope, $state, Timer, socket, trivia) {

  $scope.timer = Timer;
  $scope.numCorrect;
  $scope.ownQuestionCorrect = "correct";
  $scope.question = "I'd Do Anything for Love (But I Won't Do That)";
  $scope.answer = "Meatloaf";
  $scope.total = "3/4"

  socket.emit('enteredRoundOver');

  socket.on('roundResults', function(roundResults) {
    //do something with results
    console.log("ROUND RESULTS", roundResults);
    $scope.numCorrect = roundResults.numCorrect;
    $scope.timer.syncTimerStart(roundResults.timerData);
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