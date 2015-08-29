angular.module('meatloaf.lobby', [])

.controller('lobbyCtrl', ['$scope', '$rootScope', '$state',
  function($scope, $rootScope, $state) {
  var socket = $rootScope.socket;
  $scope.players;


  socket.emit('enteredLobby', null, function(players){
    $scope.players = players;
  })

  console.log($state.params);

  $scope.lobby = $state.params.lobby;

}]);