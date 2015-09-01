angular.module('meatloaf.game.start', [])

.controller('gameStartCtrl', ['$scope', '$rootScope', '$state', 'Timer',
            function ($scope, $rootScope, $state, Timer) {

  var socket = $rootScope.socket;
  var refreshDisplayTime; // Reference to Angular setInterval process
  socket.emit('enteredGame');

  $scope.timer = Timer; // Current time displayed by timer on page 

  var timerData = {startTime: Date.now()-500, duration: 10000};
  $scope.timer.syncTimerStart(timerData);
  // Receives timer data object from server which indicates start of round
  socket.on('startClock', function(timerData) {
    $scope.timer.syncTimerStart(timerData);
  });

  // Navigate to gameRound page
  socket.on('startGame', function() {
    $state.go('gameRound');
  });
  
}]);