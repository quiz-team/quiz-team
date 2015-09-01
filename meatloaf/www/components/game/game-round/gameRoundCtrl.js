angular.module('meatloaf.game.round', [])

.controller('gameRoundCtrl', ['$scope', '$rootScope', '$state', '$timeout',
            function ($scope, $rootScope, $state, $timeout) {

  var socket = $rootScope.socket;
  var selectAnswerTimeout;
  socket.emit('enteredRound');

  $scope.answers = [
    {text: 'answer1', id: 1},
    {text: 'answer2', id: 2},
    {text: 'answer3', id: 3},
    {text: 'answer4', id: 4},
    {text: 'answer5', id: 5},
    {text: 'answer6', id: 6}
  ];

  $scope.lockedAnswer = {};

  socket.on('startRound', function (roundData) {
    //do something with Q&A data here.
  });

  socket.on('endRound', function() {
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
  
  var lockAnswer = function (answerId) {
    $scope.lockedAnswer = {};
    $scope.lockedAnswer[answerId] = true;
    console.log('lock ', answerId);
    console.log('lockedAnswer ', $scope.lockedAnswer);

  };

  var unlockAnswer = function (answerId) {
    $scope.lockedAnswer[answerId] = false;
    console.log('unlock ', answerId);
  };

}]);