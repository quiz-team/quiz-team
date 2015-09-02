var timer = require('../utils/timerController.js');

module.exports = function() {
  var round = {};
  round.players = [];
  round.roundData = []; // array of objects (questions and answers)
  round.results = {numCorrect: 0, numIncorrect: 0};


  round.loadQuestionData = function() {
    /* {question: answer} */
  };

  /** 
   * Takes single answer and adds to round totals
   * @params {Number} - answerId - answer id from a single player
  */
  round.distributeData = function(players, roundData) {

  };

  /** 
   * Takes single answer and adds to round totals
   * @params {Number} - answerId - answer id from a single player
  */
  round.checkAnswer = function(answerId) {
    if (round.roundData.indexOf(answerId)) {
      round.results.numCorrect++;
    } else {
      round.results.numIncorrect++;
    }
  };

  return round;
};
