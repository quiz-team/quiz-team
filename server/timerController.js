var timer = {};

timer.setTimer = function(duration) {
  duration = duration || 20000;
  return {
    duration: duration,
    startTime: Date.now()
  };
};

module.exports = timer;
