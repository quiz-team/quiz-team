angular.module('meatloaf.services', [])

.factory('Timer', ['$interval', function($interval){
  var timerObj = {}; 

  var startTime;
  var duration;
  var timeRemaining;
  var refreshDisplayTime;

  timerObj.syncTimerStart = function(timerData){
    // Calculate display time four times per second
    startTime = timerData.startTime;
    duration = timerData.duration;
    refreshDisplayTime = $interval(calculateTimeRemaining, 250);
  };

  var calculateTimeRemaining = function(){
    timerObj.timeRemaining = (startTime + duration - Date.now()) / 1000;
    timerObj.displayTime = Math.max(0, Math.ceil(timerObj.timeRemaining));
  };

  timerObj.syncTimerStop = function(){
    $interval.cancel(refreshDisplayTime);
  };
  return timerObj;
  
}])