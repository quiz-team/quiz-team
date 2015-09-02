var lobbies = require('./lobbies.js')();
var _und = require('underscore');
var players = require('./players.js');
// var gameMaker = require('./game.js');
var games = require('./games.js');
var timer = require('./timerController.js');

module.exports = function(socket, io) {

  socket.on('enteredGame', function() {
    var lobbyId = players[socket.id].lobbyId;

    // create a new game with lobby Id
    console.log('entered game');
    var game = games.FindOrCreateGame(lobbyId);
    game.addPlayer(socket.id);
    var gameReady = _und.every(game.lobby.players, function(player) {
      return (game.players.indexOf(player) !== -1);
    }.bind(this));
    if (gameReady) {
      // start game timer
      var timerData = timer.preGameTimer();
      io.to(game.id).emit('startClock', timerData);
      game.startTimer(timerData, function() {
        io.to(game.id).emit('startGame');
      });
    }
  });

  socket.on('enteredRound', function() {
    var gameId = players[socket.id].lobbyId;
    var game = games.FindOrCreateGame(gameId);

    // TODO: REPLACE THIS
    // game.createRound(socket.id);

    // if all players in round, emit start round with distributed q/a and start timer
    var roundReady = _und.every(game.players, function(player) {
      return (game.rounds[game.roundNum].players.indexOf(player) !== -1);
    }.bind(this));
    if (roundReady) {
      var round = game.rounds[game.roundNum];
      var roundData; // TODO - distribute the correct game data
      var timerData = timer.roundTimer(20000);
      io.to(game.id).emit('startRound', roundData);
      // start the round timer
      game.startTimer(timerData, function() {
        // expect answer data from each player
        io.to(game.id).emit('endRound', function(answerId) {
          round.checkAnswer(answerId);
        });
      });
    }
  });

  socket.on('enteredRoundOver', function() {
    var gameId = players[socket.id].lobbyId;
    var game = games.FindOrCreateGame(gameId);
    var round = game.rounds[game.roundNum];
    var timerData = timer.preGameTimer();
    round.timerData = timerData;
    io.to(game.id).emit('roundResults', round);
    game.startTimer(timerData, function() {
      if (game.roundNum === game.numRounds) {
        io.to(game.id).emit('gameOver');
      } else {
        io.to(game.id).emit('nextRound');
      }

    });
  });

  socket.on('enteredGameOver', function() {
    var gameId = players[socket.id].lobbyId;
    var game = games.FindOrCreateGame(gameId);
    io.to(game.id).emit('gameStats', game.gameData);
    games.DestroyGame(gameId);
  });

  socket.on('playAgain', function() {
    var gameId = players[socket.id].lobbyId;
    io.to(gameId).emit('restartGame');
  });

  socket.on('quitGame', function() {
    var gameId = players[socket.id].lobbyId;
    lobbies.GetLobby(gameId).RemovePlayer(socket.id);
  });

};
