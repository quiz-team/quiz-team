angular.module('meatloaf.game.over', [])

.controller('gameOverCtrl', ['$scope', '$rootScope', '$state', 
            function ($scope, $rootScope, $state) {

  var socket = $rootScope.socket;

  socket.emit('enteredGameOver');

  socket.on('gameStats', function(stats) {
    //TODO Do something with stats here.
  });

  socket.on('restartGame', function() {
    //TODO Handle restart game signal from server.
    $state.go('gameStart');
  })

  $scope.QuitGame = function() {
    //TODO handle quit game button press here
    socket.emit('quitGame');
  };

  $scope.PlayAgain = function() {
    //TODO handle new game button press here
    socket.emit('playAgain');
  };
}]);