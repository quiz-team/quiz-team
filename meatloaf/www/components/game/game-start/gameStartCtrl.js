angular.module('meatloaf.game.start', [])

.controller('gameStartCtrl', ['$scope', '$rootScope', '$state', 'Timer', 'socket', 'trivia', 'playerNum',
            function ($scope, $rootScope, $state, Timer, socket, trivia, playerNum) {

  var refreshDisplayTime; // Reference to Angular setInterval process
  socket.emit('enteredGame');
  console.log('EMITTING ENTERED GAME');
  $scope.timer = Timer; // Current time displayed by timer on page 
  $scope.title = trivia.title;
  $scope.description = trivia.description;
  $scope.containerClass = 'container__gameStart--' + playerNum.num;
  // var timerData = {startTime: Date.now()-500, duration: 10000};
  // $scope.timer.syncTimerStart(timerData);

  // Receives timer data object from server which indicates start of round
  socket.on('startClock', function(timerData) {
    $scope.timer.syncTimerStart(timerData);
  });

  // Navigate to gameRound page
  socket.on('startGame', function() {
    console.log('on: startGame');
    $state.go('gameRound', $state.params, {reload: true});
  });
  
}]);