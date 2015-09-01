angular.module('meatloaf.game.start', [])

.controller('gameStartCtrl', ['$scope', '$rootScope', '$state', 
            function ($scope, $rootScope, $state) {

  var socket = $rootScope.socket;
  $scope.startTime;
  socket.emit('enteredGame');

  socket.on('startClock', function(startTime) {
    $scope.startTime = startTime;
  });

  socket.on('startGame', function() {
    $state.go('gameRound')
  });
  
}]);