angular.module('meatloaf.lobby', [])

.controller('lobbyCtrl', ['$scope', '$rootScope', '$state',
  function($scope, $rootScope, $state) {

  var socket = $rootScope.socket;

  console.log($state.params);

  $scope.lobby = $state.params.lobby.roomname;

}]);