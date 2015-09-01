var playerMaker = require('./player.js');
var players = require('./players.js');
var round = require('./roundHelper.js')
var timer = require('./timerController.js')
var _und = require('underscore');

module.exports = function(lobby, numRounds) {
  var game = {};
  game.points = 0;
  game.lobby = lobby;
  game.players = [];
  game.id = lobby.id;
  game.numRounds = numRounds || 6;
  game.roundNum = 1;
  game.questions = round.loadQuestionData(numRounds);


  game.addPlayer = function(player) {
    game.players.push(player);
  }
  game.gameStart = function() {
    var questions = Array.slice.apply(game.questions);
    for (var i = 0; i < game.lobby.players.length; i++) {
      game.lobby.players[i].answers = round.distributeAnswers(questions);
    }

  };

  game.roundStart = function() {

  };

  game.startTimer = function(timer, callback) {
    setTimeout(function() {
      callback();
    }, timer.duration);
  }

  game.roundEnd = function() {

  }
  game.redistribute = function() {

  };

  game.gameEnd = function() {

  };

  return game;

}
