angular.module('meatloaf.selection', [])

.controller('selectionCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
  var socket = $rootScope.socket;
  $scope.lobbies = [{roomname: "room 1"},{roomname: "room 2"},{roomname: "room 3"},{roomname: "room 4"} ];
  
  socket.emit('enteredSelectionRoom', null, function(lobbiesData){
    $scope.lobbies = lobbiesData;
  });
  
  socket.on('updateLobbies', function(lobbiesData){
    $scope.lobbies = lobbiesData;
  });

  $scope.createRoom = function() {
    socket.emit('createRoom', null, function(lobby) {
      $state.go('lobby', {lobby: lobby});
    });
  };

  $scope.joinLobby = function(lobbyId){
    socket.emit('joinRoom', lobbyId, function(lobby) {
      $state.go('lobby', {lobby: lobby});
    });
  }

}]);