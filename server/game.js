var playerMaker = require('./player.js');
var players = require('./players.js');
var roundMaker = require('./round.js');
var timer = require('./timerController.js');
var _und = require('underscore');
var gameData = require('./trivia.json');

module.exports = function(lobby, numRounds) {
  var game = {};
  game.points = 0;
  game.lobby = lobby;
  game.players = [];
  game.id = lobby.id;
  game.numRounds = numRounds || 6;
  game.roundNum = 1;
  game.rounds = {};
  game.gameData = {};

  game.loadGameData = function(numPlayers) {
    // sets game.gameData
  };

  game.addPlayer = function(player) {
    game.players.push(player);
  };

  game.gameStart = function() {
    var questions = Array.slice.apply(game.questions);
    for (var i = 0; i < game.lobby.players.length; i++) {
      game.lobby.players[i].answers = roundMaker.distributeAnswers(questions);
    }

  };


  game.distributeQuestions = function() {
    // divide up game.questions to number of players
  };

  // create round and add player to round.players
  game.createRound = function(socketId, roundData) {
    var roundNum = game.roundNum;
    if (!game.rounds.hasOwnProperty(roundNum)) {
      game.rounds[roundNum] = roundMaker(roundData);
    }


    // add player to round.players
    game.rounds[roundNum].players.push(socketId);
  };

  /** TODO
   * Distributes game questions/answers for this round
   * returns gameData
  */
  game.roundStart = function() {

  };

  /** TODO
   * Compares submitted answer
   * returns 
  */
  game.roundEnd = function(answerData) {

  };

  game.startTimer = function(timer, callback) {
    setTimeout(function() {
      callback();
    }, timer.duration);
  };

  game.redistribute = function() {

  };

  game.gameEnd = function() {

  };

  return game;

}
