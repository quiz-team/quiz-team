angular.module('meatloaf.game.roundOver', [])

.controller('gameRoundOverCtrl', ['$scope', '$rootScope', '$state', 
            function ($scope, $rootScope, $state) {

  var socket = $rootScope.socket;

  socket.emit('enteredResults');

  socket.on('roundResults', function(results) {
    //do something with results
  });

  socket.on('nextRound', function() {
    $state.go('gameRound');
  });

  socket.on('gameOver', function() {
    $state.go('gameOver');
  });

}]);