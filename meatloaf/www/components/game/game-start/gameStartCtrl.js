angular.module('meatloaf.game.start', [])

.controller('gameStartCtrl', ['$scope', '$rootScope', '$state', 'Timer', 'socket', 'trivia',
            function ($scope, $rootScope, $state, Timer, socket, trivia) {

  var refreshDisplayTime; // Reference to Angular setInterval process
  socket.emit('enteredGame');

  $scope.timer = Timer; // Current time displayed by timer on page 
  $scope.title = trivia.title;
  $scope.description = trivia.description;

  // var timerData = {startTime: Date.now()-500, duration: 10000};
  // $scope.timer.syncTimerStart(timerData);

  // Receives timer data object from server which indicates start of round
  socket.once('startClock', function(timerData) {
    $scope.timer.syncTimerStart(timerData);
  });

  // Navigate to gameRound page
  socket.once('startGame', function() {
    $state.go('gameRound');
  });
  
}]);