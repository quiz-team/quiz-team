angular.module('meatloaf.game.start', [])

.controller('gameStartCtrl', ['$scope', '$rootScope', '$state', '$interval', 
            function ($scope, $rootScope, $state, $interval) {

  var socket = $rootScope.socket;
  var refreshDisplayTime; // Reference to Angular setInterval process
  socket.emit('enteredGame');

  $scope.startTime;   // Server-synced start time of round
  $scope.duration;    // Duration of countdown until start of game
  $scope.displayTime; // Current time displayed by timer on page 

  var calculateDisplayTime = function () {
    // Calculate current display time based on server start time and duration
    // Display zero if time on page exceeds calculated display time
    $scope.displayTime = Math.max(0, Math.ceil((($scope.startTime + $scope.duration) - Date.now()) / 1000));
  };

  // Receives timer data object from server which indicates start of round
  socket.on('startClock', function(timerData) {
    $scope.startTime = timerData.startTime;
    $scope.duration = timerData.duration;
    // Calculate display time four times per second
    refreshDisplayTime = $interval(calculateDisplayTime, 250);
  });

  // Navigate to gameRound page
  socket.on('startGame', function() {
    // Terminate refreshDisplayTime process
    $interval.cancel(refreshDisplayTime);
    // Change state to gameRound-view
    $state.go('gameRound')
  });
  
}]);