angular.module('meatloaf.game.roundOver', [])

.controller('gameRoundOverCtrl', ['$scope', '$rootScope', '$state', 'Timer',
            function ($scope, $rootScope, $state, Timer) {

  var socket = $rootScope.socket;
  $scope.timer = Timer;
  $scope.numCorrect;

  socket.emit('enteredRoundOver');

  socket.on('roundResults', function(roundResults) {
    //do something with results
    console.log("ROUND RESULTS", roundResults);
    $scope.numCorrect = roundResults.numCorrect;
    $scope.timer.syncTimerStart(roundResults.timerData);
  });

  socket.on('nextRound', function() {
    $scope.timer.syncTimerStop();
    $state.go('gameRound', $state.params, {reload: true});
  });

  socket.on('gameOver', function() {
    $scope.timer.syncTimerStop();
    $state.go('gameOver');
  });

}]);