angular.module('meatloaf.game.over', [])

.controller('gameOverCtrl', ['$scope', '$rootScope', '$state', 'socket',
            function ($scope, $rootScope, $state, socket) {

  $scope.stats = {};

  socket.emit('enteredGameOver');

  socket.on('gameStats', function(gameDataStats) {
    $scope.stats = gameDataStats;
    console.log('GAME OVER STATS', gameDataStats);
  });

  socket.on('restartGame', function(lobby) {
    // navigate back to the game lobby
    $state.go('lobby', {lobby: lobby}, {reload: true});
  });

  $scope.quitGame = function() {
    //TODO handle quit game button press here
    socket.emit('quitGame');
    $state.go('selection');
  };

  $scope.playAgain = function() {
    //TODO handle new game button press here
    socket.emit('playAgain');
  };
}]);