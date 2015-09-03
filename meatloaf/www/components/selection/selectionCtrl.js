angular.module('meatloaf.selection', [])

.controller('selectionCtrl', ['$scope', '$rootScope', '$state', 'socket',
            function ($scope, $rootScope, $state, socket) {
              
  // var socket = $rootScope.socket;
  $scope.lobbies;
  
  socket.emit('enteredSelectionRoom', null, function(lobbiesData){
    console.log("recieved lobby data");
    $scope.lobbies = lobbiesData;
    // $scope.$apply();
  });
  
  socket.on('updateLobbies', function(lobbiesData){
    $scope.lobbies = lobbiesData;
    // $scope.$apply();
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