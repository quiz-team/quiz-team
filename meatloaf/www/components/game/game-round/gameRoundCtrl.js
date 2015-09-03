angular.module('meatloaf.game.round', [])

.controller('gameRoundCtrl', ['$scope', '$rootScope', '$state', '$timeout', 'Timer',
            function ($scope, $rootScope, $state, $timeout, Timer) {

  var socket = $rootScope.socket;
  var myId = socket.id;
  var selectAnswerTimeout;

  console.log("EMITTING ENTERED ROUND!");
  socket.emit('enteredRound');
  
  $scope.timer = Timer;
  $scope.question;
  $scope.answers;
  $scope.lockedAnswer = {};

  socket.once('startRound', function (roundData) {
    //do something with Q&A data here.
    console.log("ROUND DATA: ", roundData);
    console.log("My ID ", myId);
    $scope.answers = roundData.players[myId].answers;
    $scope.currentRound = roundData.currentRound;
    $scope.question = roundData.players[myId].questions[$scope.currentRound-1];
    $scope.timer.syncTimerStart(roundData.timerData);
    $scope.$apply();
  });

  socket.once('endRound', function(){
    $scope.timer.syncTimerStop();
    socket.emit('submitAnswer', $scope.lockedAnswer);
    $state.go('gameRoundOver',  $state.params, {reload: true});
  });

  $scope.selectAnswer = function (answerId) {
    selectAnswerTimeout = $timeout(function(){
      lockAnswer(answerId);
    }, 1000);
  };

  $scope.unselectAnswer = function (answerId) {
    // start counting down until 0
    $timeout.cancel(selectAnswerTimeout);
  };

  $scope.isLockedAnswer = function (answerId){
    return $scope.lockedAnswer.id === answerId && $scope.lockedAnswer.locked;
  };
  
  var lockAnswer = function (answerId) {
    $scope.lockedAnswer = {};
    $scope.lockedAnswer = {id: answerId, locked: true};
  };
}]);