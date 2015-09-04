angular.module('meatloaf.game.over', [])

.controller('gameOverCtrl', ['$scope', '$rootScope', '$state', 'socket',
            function ($scope, $rootScope, $state, socket) {

  $scope.stats = {};

  socket.emit('enteredGameOver');

  socket.once('gameStats', function(gameDataStats) {
    $scope.stats = gameDataStats;
    console.log('GAME OVER STATS', gameDataStats);
  });

  socket.once('restartGame', function() {
    //TODO Handle restart game signal from server.
    $state.go('gameStart');
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