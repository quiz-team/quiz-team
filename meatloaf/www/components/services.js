angular.module('meatloaf.services', [])

.factory('Timer', ['$interval', function($interval){
  var timerObj = {}; 

  var startTime;
  timerObj.duration;
  var timeRemaining;
  var refreshDisplayTime;

  timerObj.syncTimerStart = function(timerData){
    // Calculate display time four times per second
    startTime = timerData.startTime;
    timerObj.duration = timerData.duration;
    refreshDisplayTime = $interval(calculateTimeRemaining, 250);
  };

  var calculateTimeRemaining = function(){
    timerObj.timeRemaining = (startTime + timerObj.duration - Date.now()) / 1000;
    timerObj.displayTime = Math.max(0, Math.ceil(timerObj.timeRemaining));
  };

  timerObj.syncTimerStop = function(){
    $interval.cancel(refreshDisplayTime);
  };
  return timerObj;
  
}])

.factory('socket', ['$rootScope', function ($rootScope) {
  // var socket = io.connect('http://44f61333.ngrok.io');
  var socketio = io.connect('http://localhost:9090');
  return {

    getId: function() {
      return socketio.id;
    },

    on: function (eventName, callback) {
      socketio.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socketio, args);
        });
      });
    },

    emit: function (eventName, data, callback) {
      socketio.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socketio, args);
          }
        });
      });
    },

    once: function (eventName, callback) {
      socketio.once(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socketio, args);
        });
      });
    }
  };
}])

.factory('trivia', ['socket', function(socket) {
  var triviaData = {};

  return {

    title: null,

    description: null,

    currentQuestion: null,

    roundNum: 1,

    updateRound: function(roundNum) {
      this.roundNum = roundNum;
      this.currentQuestion = triviaData.questions[roundNum-1];
    },

    setData: function(gameData) {
      // basic data, fill out later
      // trivia data is only for current user
      triviaData = gameData.players[socket.getId()];
      this.title = gameData.title;
      this.description = gameData.description;
    },

    getAnswers: function() {
      return triviaData.answers;
    }

  };

}]);