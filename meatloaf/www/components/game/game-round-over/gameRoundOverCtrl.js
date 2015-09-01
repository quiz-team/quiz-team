angular.module('meatloaf.game.roundOver', [])

.controller('gameRoundOverCtrl', ['$scope', '$rootScope', '$state', 'Timer',
            function ($scope, $rootScope, $state, Timer) {

  var socket = $rootScope.socket;
  $scope.timer = Timer;
  $scope.results;

  socket.emit('enteredResults');

  socket.on('roundResults', function(roundData) {
    //do something with results
    $scope.results = roundData.results;
    $scope.timer.syncTimerStart(roundData.timerData);
  });

  socket.on('nextRound', function() {
    $scope.timer.syncTimerStop();
    $state.go('gameRound');
  });

  socket.on('gameOver', function() {
    $scope.timer.syncTimerStop();
    $state.go('gameOver');
  });

}]);