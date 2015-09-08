angular.module('meatloaf.game.over', [])

.controller('gameOverCtrl', ['$scope', '$rootScope', '$state', 'socket',
            function ($scope, $rootScope, $state, socket) {

  $scope.results = {};
  $scope.players = [];

  socket.emit('enteredGameOver');

  socket.on('gameStats', function(gameDataStats) {
    $scope.results = gameDataStats.allRoundResults;
    $scope.players = gameDataStats.players;
    $scope.player = socket.getId();
    console.log("PLAYER ID: ", $scope.player);
    console.log('GAME OVER STATS', gameDataStats);
  });

  socket.on('restartGame', function(lobby) {
    // navigate back to the game lobby
    $state.go('lobby', {lobby: lobby}, {reload: true});
  });

  var playerColors = [{primary: "#03A9F4", muted: "#B3E5FC", superMuted: "#E1F5FE"}, 
                      {primary: "#FFC107", muted: "#FFECB3", superMuted: "#FFF8E1"},
                      {primary: "#FF5722", muted: "#FFCCBC", superMuted: "#FBE9E7"}, 
                      {primary: "#9C27B0", muted: "#E1BEE7", superMuted: "#F3E5F5"}];

  $scope.getTableStyle = function(index, row) {
    if (row % 2 === 0) {
      return {"background-color": playerColors[index].muted};
    } else {
      return {"background-color": playerColors[index].superMuted};
    }
  }
  $scope.getTableHeader = function(index) {
    return {"background-color": playerColors[index].primary};
  }

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