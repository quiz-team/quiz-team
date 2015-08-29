angular.module('meatloaf.lobby', [])

.controller('lobbyCtrl', ['$scope', '$rootScope', '$state', 
            function ($scope, $rootScope, $state) {

  var socket = $rootScope.socket;
  
  $scope.lobby = $state.params.lobby;
  $scope.players = [{number: 1, ready: false}, {number: 2, ready: false}];

  // Updates player data on client-side when user enters a lobby
  //  callback is passed array of objects with player ID and button state
  socket.emit('enteredLobby', null, function (players){
    $scope.players = players;
  });

  // Updates player data on client-side 
  //  callback is passed array of objects with player ID and button state
  socket.on('updatePlayers', function (players) {
    $scope.players = players;
    $scope.$apply();
  });

  // Advances to the game state when a signal is received from the server.
  socket.on('startGame', function(data) {
    $state.go('game');
  })

  // Notify server when user has left
  $scope.leaveLobby = function () {
    socket.emit('leaveLobby');
    // Revisit this if transition animations become an issue
    $state.go('selection');
  };

  // Notify server that ready button is being pressed by user
  $scope.readyOn = function () {
    console.log("ready button ON");
    $scope.players[0].ready = true;
    socket.emit('readyOn');
  };

  // Notify server that ready button has been released by user
  $scope.readyOff = function () {
    console.log("ready button OFF");
    $scope.players[0].ready = false;
    socket.emit('readyOff');
  };

}]);