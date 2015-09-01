
module.exports = function() {
  var round = {};
  round.players = [];
  round.numCorrect = 0;
  round.numIncorrect = 0;
  round.roundData = []; // array of objects (questions and answers)

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
      round.numCorrect++;
    } else {
      round.numIncorrect++;
    }
  };

  return round;
};
