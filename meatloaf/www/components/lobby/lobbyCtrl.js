angular.module('meatloaf.lobby', [])

.controller('lobbyCtrl', ['$scope', '$rootScope', '$state', 'socket', 'trivia', 'session', '$ionicViewSwitcher', '$timeout', 'playerInfo',
            function ($scope, $rootScope, $state, socket, trivia, session, $ionicViewSwitcher, $timeout, playerInfo) {

  $scope.lobby = $state.params.lobby;
  $scope.players = [];
  $scope.isReady = false;
  $scope.playerNum = playerInfo.num;
  $scope.playerColor = playerInfo.color;
  // console.log("ENTERING LOBBY STATE");
  // Updates player data on client-side when user enters a lobby
  //  callback is passed array of objects with player ID and button state
  socket.emit('enteredLobby', $scope.lobby.id, function (players){
    $scope.players = players;
    // assign player number
    $scope.players.forEach(function(player, index){
      if(player.id === session.getId()){
        playerInfo.num = player.number;
        playerInfo.color = player.color;
        // console.log("Player Number: ", player.number, "Player Color: ", playerInfo.color);
      }
    });

  });

  // Updates player data on client-side
  //  callback is passed array of objects with player ID and button state
  socket.on('updatePlayers', function (players) {
    // players = filter(players);
    $scope.players = players;
    // $scope.$apply();
  });

  // Advances to the game state when a signal is received from the server.
  socket.on('goToStartScreen', function(triviaData) {
    console.log("RECEIVING TRIVIA DATA: ", triviaData);
    trivia.setData(triviaData);
    trivia.updateRound(1);
    // Finalize player number
    $scope.players.forEach(function(player, index){
      if(player.id === session.getId()){
        playerInfo.num = player.number;
      }
    });

    $scope.readyOff();
    $state.go('gameStart');
  });

  // Notify server when user has left
  $scope.leaveLobby = function () {
    socket.emit('leaveLobby', $scope.lobby.id);
    // Revisit this if transition animations become an issue
    $ionicViewSwitcher.nextDirection('back');
    $state.go('selection');
  };

  // Notify server that ready button is being pressed by user
  $scope.readyOn = function () {
    $scope.isReady = true;
    $scope.players.forEach(function(player){
      if(player.id === session.getId()){
        player.ready=true;
      }
    });

    if($scope.players.length === 1){
      $scope.ready = $timeout(function() {
        showModal();
      }, 600);
    } else {
      $scope.ready = $timeout(function() {
        socket.emit('readyOn', $scope.lobby.id);
      }, 200);
    } 
  };

  // Notify server that ready button has been released by user
  $scope.readyOff = function () {
    $scope.isReady = false;
    $scope.players.forEach(function(player){
      if(player.id === session.getId()){
        player.ready=false;
      }
    });
    $timeout.cancel($scope.ready);
    socket.emit('readyOff', $scope.lobby.id);
  };

  //////////////////////////////////////////////////////////////////
  // ONE PLAYER GAME MODAL
  //////////////////////////////////////////////////////////////////

  $scope.modalShown = false;
  var showModal = function() {
    $('.ng-modal').removeClass('fade-out');
    $('.ng-modal').addClass('fade-in');
    $scope.modalShown = true;
  };
  var hideModal = function() {
    $('.ng-modal').removeClass('fade-in');
    $('.ng-modal').addClass('fade-out');
    setTimeout(function(){
      $scope.modalShown = false;
      $scope.$apply();
    },300);
  };

  $scope.waitForOthers = function(){
    hideModal();
  }

  $scope.playOnePlayer = function(){
    socket.emit('readyOn', $scope.lobby.id);
  }

}]);
