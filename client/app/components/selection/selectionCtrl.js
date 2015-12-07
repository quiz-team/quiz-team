angular.module('quizteam.selection', [])

.controller('selectionCtrl', ['$scope', '$rootScope', '$state', 'socket', '$ionicHistory', '$timeout',
            function ($scope, $rootScope, $state, socket, $ionicHistory, $timeout) {
              
  // var socket = $rootScope.socket;
  $scope.lobbies;
  
  socket.emit('enteredSelectionRoom', null, function(lobbiesData){
    // console.log("recieved lobby data");
    $scope.lobbies = lobbiesData;
    // $scope.$apply();
  });

  socket.on('updateLobbies', function(lobbiesData){
    $scope.lobbies = lobbiesData;
    // $scope.$apply();
  });
  $scope.createRoom = function() {
    $state.go('loading');
    $timeout(function(){
      socket.emit('createRoom', null, function(lobby) {
        $state.go('lobby', {lobby: lobby});
      });
    }, 1000);
  };

  $scope.joinLobby = function(lobbyId){
    $state.go('loading');
    $timeout(function(){
      socket.emit('joinRoom', lobbyId, function(lobby) {
        $state.go('lobby', {lobby: lobby});
      });
    }, 1000);
  };

}]);