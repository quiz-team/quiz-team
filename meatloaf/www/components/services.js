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
  var socket = io.connect('http://44f61333.ngrok.io');
  // var socket = io.connect('http://localhost:9090');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },

    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    },

    once: function (eventName, callback) {
      socket.once(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    }
  };
}]);