var lobbies = require('../collections/lobbies.js');
var _und = require('underscore');
var players = require('../collections/players.js');
// var gameMaker = require('./game.js');
var games = require('../collections/games.js');  // CHANGE THIS TO AN OBJECT INSTEAD OF FUNCTION UNLESS ALEX HAS INSIGHT
var timer = require('../utils/timerController.js');

// Constants
var ROUND_TIMER = 6000;
var ROUND_OVER_TIMER = 3000;
var PRE_GAME_TIMER = 5000;

// testing timers
// var ROUND_TIMER = 2000;
// var ROUND_OVER_TIMER = 1000;
// var PRE_GAME_TIMER = 200;

var everyoneInView = function(game, socket){
  game.playersInView.push(socket.id);
  // return true if all expected players are in the view
  return _und.every(game.players, function(playerId) {
    return (game.playersInView.indexOf(playerId) !== -1);
  }.bind(this));
};

module.exports = function(socket, io) {
  var game;
  socket.on('enteredGame', function() {
    game = games.findGame(socket);
    if (everyoneInView(game, socket)) {
      // start game timer
      var timerData = timer.setTimer(PRE_GAME_TIMER);
      io.to(game.id).emit('startClock', timerData);
      game.startTimer(timerData, function() {
        game.resetPlayersInView();
        io.to(game.id).emit('startGame');
      });
    }
  });

  socket.on('enteredRound', function() {
    if (everyoneInView(game, socket)) {
      
      game.resetCurrentRound();
      var roundData = {};
      roundData.timerData = timer.setTimer(ROUND_TIMER);
      roundData.roundNum = game.roundNum;

      io.to(game.id).emit('startRound', roundData);
      // start the round timer
      game.startTimer(roundData.timerData, function() {
        // expect answer data from each player
        io.to(game.id).emit('endRound');
        game.resetPlayersInView();
      });
    }
  });

  // SET UP FOR LATER
  socket.on('submitAnswer', function(answerId){
    // console.log("PLAYER SUBMITTED AN ANSWER");
    var game = games.findGame(socket);
    game.updateRoundScore(answerId);
  });

  socket.on('enteredRoundOver', function() {
    if(everyoneInView(game, socket)){
      game.roundNum++;

      var timerData = timer.setTimer(ROUND_OVER_TIMER);
      game.currentRoundResults.timerData = timerData;

      io.to(game.id).emit('roundResults', game.currentRoundResults);

      game.startTimer(timerData, function() {
        if (game.roundNum > game.numRounds) {
          io.to(game.id).emit('gameOver');
        } else {
          io.to(game.id).emit('nextRound', game.roundNum);
        }
        game.resetPlayersInView();
      });
    }
  });

  socket.on('enteredGameOver', function() {
    var gameId = players[socket.id].lobbyId;
    var game = games.findGame(socket);
    game.getGameResults();
    io.to(game.id).emit('gameStats', game.gameData.stats);
    games.destroyGame(gameId);
  });

  socket.on('playAgain', function() {
    var gameId = players[socket.id].lobbyId;
    io.to(gameId).emit('restartGame');
  });

  socket.on('quitGame', function() {
    var gameId = players[socket.id].lobbyId;
    lobbies.GetLobby(gameId).RemovePlayer(socket.id);
  });

  // on disconnect, remove player from game
  socket.on('disconnect', function() {
    // check if player exists (player is created when added to lobby)
    console.log("Player Disconnected: ", socket.id);
    if (game) {
      console.log("Game of player found")
      var playerIndex = game.players.indexOf(socket.id);
      if(playerIndex !== -1){
        game.players.splice(playerIndex,1);
        console.log("Player found in game and spliced out: ", game.players);
      }
    }
  });

};
