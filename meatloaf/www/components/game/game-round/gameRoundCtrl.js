angular.module('meatloaf.game.round', [])

.controller('gameRoundCtrl', ['$scope', '$rootScope', '$state', 
            function ($scope, $rootScope, $state) {

  var socket = $rootScope.socket;

  socket.emit('enteredRound');

  socket.on('startRound', function(data) {
    //do something with Q&A data here.
  });

  socket.on('endRound', function() {
    $state.go('gameRoundOver');
  });

  var submitAnswer = function(answer) {
    //do something to submit an answer here.
  }
  
}]);