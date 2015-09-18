angular.module('meatloaf.services', [])

.factory('Timer', ['$interval', function($interval){
  var timerObj = {}; 

  var startTime;
  // timerObj.duration;
  var timeRemaining;
  var timerPercentage;
  var refreshDisplayTime;

  timerObj.syncTimerStart = function(timerData){
    // Calculate display time four times per second
    startTime = timerData.startTime;
    timerObj.duration = timerData.duration;
    refreshDisplayTime = $interval(calculateTimeRemaining, 16);
  };

  var calculateTimeRemaining = function(){
    timerObj.timeRemaining = (startTime + timerObj.duration - Date.now()) / 1000;
    timerObj.timerPercentage = Math.max((timerObj.timeRemaining / (timerObj.duration/1000) * 100) , 0);;
    // console.log("Timer Percentage: ", timerObj.timerPercentage);
    timerObj.displayTime = Math.max(0, Math.ceil(timerObj.timeRemaining));
  };

  timerObj.syncTimerStop = function(){
    $interval.cancel(refreshDisplayTime);
  };
  return timerObj;
  
}])

.factory('socket', ['$rootScope', 'session',
  function ($rootScope, session) {
  var playerSocket;
  return {

    setupSocket: function() {
      // create session if none
      if (!session.getId()) {
        session.setId();
      }

      var sessionId = session.getId();
      // console.log('sessionId: ', sessionId);
      playerSocket = io.connect({ query: 'sessionId=' + sessionId});
    },

    getId: function() {
      return playerSocket.id;
    },

    on: function (eventName, callback) {
      // remove listener to refresh callback
      playerSocket.removeListener(eventName);
      playerSocket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(playerSocket, args);
        });
      });
    },

    emit: function (eventName, data, callback) {
      playerSocket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(playerSocket, args);
          }
        });
      });
    },

    once: function (eventName, callback) {
      playerSocket.once(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(playerSocket, args);
        });
      });
    }
  };
}])


.factory('trivia', ['session', function(session) {
  var triviaData = {};

  return {

    title: null,

    description: null,

    currentQuestion: null,

    roundNum: 1,

    updateRound: function(roundNum) {
      this.roundNum = roundNum;
      this.currentQuestion = triviaData.players[session.getId()].questions[roundNum-1];
    },

    setData: function(gameData) {
      // basic data, fill out later
      // trivia data is only for current user
      triviaData = gameData;
      this.title = gameData.title;
      this.description = gameData.description;
    },
    
    getPlayerAnswers: function() {
      return triviaData.players[session.getId()].answers;
    },
    getAnswer: function(id) {
      // console.log("TriviaData is ", triviaData);
      var answers = triviaData.roundAnswerObjects[this.roundNum-1];
      for (var i = 0; i < answers.length; i++) {
        if ( answers[i].id === id) {
          return answers[i];
        }
      }
    },

    getCorrectQnA: function() {
      //for each of the player's answers
      var questionAnswerPair = {};
      triviaData.roundAnswerObjects[this.roundNum-1].forEach(function(roundAnswer) {
        var myAnswers = triviaData.players[session.getId()].answers;
        myAnswers.forEach(function(myAnswer) {
          if (myAnswer.id === roundAnswer.id) {
            questionAnswerPair.answer = myAnswer;
            questionAnswerPair.question = triviaData.answerMap[myAnswer.id];

            return;
          }
        })
      });
      return questionAnswerPair;
    }
  };
}])

.factory('session', ['$window', function($window) {

  var makeId = function() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for( var i=0; i < 16; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
  };

  var getId = function() {
    return $window.localStorage.getItem('sessionId');
  };

  var setId = function() {
    var sessionId = makeId();
    return $window.localStorage.setItem('sessionId', sessionId);
  };

  return {
    getId: getId,
    setId: setId
  };
}])

.factory('playerInfo', [function() {
  return {num: null, color: undefined};
}]);
