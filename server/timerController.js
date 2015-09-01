module.exports = function() {
  var timer = {};

  timer.preGameTimer = function() {
    return {
      duration: 10000,
      startTime: Date.now()
    };
  };

  timer.roundTimer = function(duration) {
    return {
      duration: duration,
      startTime: Date.now()
    };
  };


  return timer;
}
