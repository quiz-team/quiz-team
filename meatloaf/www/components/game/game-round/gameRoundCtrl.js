angular.module('meatloaf.game.round', [])

.controller('gameRoundCtrl', ['$scope', '$rootScope', '$state', '$timeout', 'Timer',
            function ($scope, $rootScope, $state, $timeout, Timer) {

  var socket = $rootScope.socket;
  // var myId = $rootScope.myId;
  var myId = socket.id;

  var selectAnswerTimeout;
  socket.emit('enteredRound');
  $scope.timer = Timer;
  $scope.question;
  $scope.answers;

  $scope.lockedAnswer = {};

  socket.on('startRound', function (roundData) {
    //do something with Q&A data here.
    $scope.answers = roundData[myId].answers;
    $scope.question = roundData[myId].question;
    $scope.timer.syncTimerStart(roundData.timeData);
  });

  socket.on('endRound', function(data, callback){
    $scope.timer.syncTimerStop();
    callback($scope.lockedAnswer);
    $state.go('gameRoundOver');
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