angular.module('meatloaf.lobby', [])

.controller('lobbyCtrl', ['$scope', '$rootScope', '$state', 'socket', 'trivia',
            function ($scope, $rootScope, $state, socket, trivia) {

  $scope.lobby = $state.params.lobby;
  $scope.players = [];
  console.log("ENTERING LOBBY STATE");
  // Updates player data on client-side when user enters a lobby
  //  callback is passed array of objects with player ID and button state
  socket.emit('enteredLobby', $scope.lobby.id, function (players){
    $scope.players = players;
  });

  // Updates player data on client-side
  //  callback is passed array of objects with player ID and button state
  socket.on('updatePlayers', function (players) {
    $scope.players = players;
    // $scope.$apply();
  });

  // Advances to the game state when a signal is received from the server.
  socket.on('goToStartScreen', function(triviaData) {
    trivia.setData(triviaData);
    trivia.updateRound(1);
    $scope.readyOff();
    $state.go('gameStart');
  });

  // Notify server when user has left
  $scope.leaveLobby = function () {
    socket.emit('leaveLobby', $scope.lobby.id);
    // Revisit this if transition animations become an issue
    $state.go('selection');
  };

  // Notify server that ready button is being pressed by user
  $scope.readyOn = function () {
    $scope.players.forEach(function(player){
      if(player.id === socket.getId()){
        player.ready=true;
      }
    })
    socket.emit('readyOn', $scope.lobby.id);
  };

  // Notify server that ready button has been released by user
  $scope.readyOff = function () {
    $scope.players.forEach(function(player){
      if(player.id === socket.getId()){
        player.ready=false;
      }
    })
    socket.emit('readyOff', $scope.lobby.id);
  };

}]);