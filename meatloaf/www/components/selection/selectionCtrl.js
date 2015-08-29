angular.module('meatloaf.selection', [])

.controller('selectionCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

  var socket = $rootScope.socket;

  $scope.createRoom = function() {
    socket.emit('createRoom', null, function(lobbyname) {
      $state.go('lobby', {lobby: lobbyname});
    });
  };

}]);