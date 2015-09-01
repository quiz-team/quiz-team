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

  var roundData = {
    1: {answers: [{text: "Answer 1", id: 1},
                  {text: "Answer 2", id: 2},
                  {text: "Answer 3", id: 3},
                  {text: "Answer 4", id: 4},
                  {text: "Answer 5", id: 5},
                  {text: "Answer 6", id: 6}],
        question: {text: "Does anyone really know what time it is?",
                   id: 1}
                 },
    timerData: {startTime: Date.now()-600, duration: 20000}
  };

  $scope.answers = roundData[1].answers;
  $scope.question = roundData[1].question;
  $scope.timer.syncTimerStart(roundData.timerData);

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
    console.log('select ', answerId);
    selectAnswerTimeout = $timeout(function(){
      lockAnswer(answerId);
    }, 1000);
  };

  $scope.unselectAnswer = function (answerId) {
    console.log('unselect ', answerId);
    // start counting down until 0
    $timeout.cancel(selectAnswerTimeout);
  };

  $scope.isLockedAnswer = function (answerId){
    return $scope.lockedAnswer.id === answerId && $scope.lockedAnswer.locked;
  };
  
  var lockAnswer = function (answerId) {
    $scope.lockedAnswer = {};
    $scope.lockedAnswer = {id: answerId, locked: true};
    console.log('lock ', answerId);
    console.log('lockedAnswer ', $scope.lockedAnswer);

  };

  var unlockAnswer = function (answerId) {
    $scope.lockedAnswer[answerId] = false;
    console.log('unlock ', answerId);
  };

}]);