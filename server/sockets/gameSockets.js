var lobbies = require('../collections/lobbies.js');
var _und = require('underscore');
var players = require('../collections/players.js');
var games = require('../collections/games.js');  // CHANGE THIS TO AN OBJECT INSTEAD OF FUNCTION UNLESS ALEX HAS INSIGHT
var timer = require('../utils/timerController.js');
var config = require('../utils/gameConfig');

var everyoneInView = function(game, socket){
  game.playersInView.push(socket.playerId);
  console.log('game.playersInView: ', game.playersInView);
  // return true if all expected players are in the view
  return _und.every(game.players, function(player) {
    return (game.playersInView.indexOf(player.id) !== -1);
  }.bind(this));
};

module.exports = function(socket, io) {
  var game;
  socket.on('enteredGame', function() {
    game = games.findGame(socket);
    if (everyoneInView(game, socket)) {
      // console.log("everyone in view, GAME.ID: ", game.id);
      // start game timer
      var timerData = timer.setTimer(config.PRE_GAME_TIMER);
      io.to(game.id).emit('startClock', timerData);
      game.startTimer(timerData, function() {
        game.resetPlayersInView();
        // console.log("RESETING PLAYERS IN VIEW")
        // console.log("emitting start game with: ", game.id);
        io.to(game.id).emit('startGame');
      });
    }
  });

  socket.on('enteredRound', function() {
    if (everyoneInView(game, socket)) {
      // console.log("EVERYONE IN ROUND");
      game.resetCurrentRound();
      var roundData = {};
      roundData.timerData = timer.setTimer(config.ROUND_TIMER);
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
  socket.on('submitAnswer', function(answerObj){
    var game = games.findGame(socket);
    game.updateRoundScore(answerObj, socket);
  });

  socket.on('enteredRoundOver', function() {
    if(everyoneInView(game, socket)){
      // console.log("EVERYONE ROUND OVER");
      game.roundNum++;

      var timerData = timer.setTimer(config.ROUND_OVER_TIMER);
      game.currentRoundResults.timerData = timerData;
      io.to(game.id).emit('roundResults', game.currentRoundResults);

      game.startTimer(timerData, function() {
        if (game.roundNum > game.numRounds) {
          io.to(game.id).emit('gameOver');
        } else {
          // console.log("TELLING EVERYONE TO GO TO NEXT ROUND");
          io.to(game.id).emit('nextRound', game.roundNum);
        }
        game.resetPlayersInView();
      });
    }
  });

  socket.on('enteredGameOver', function() {
    var gameId = players[socket.playerId].lobbyId;
    var lobby = lobbies.getLobby(gameId);
    var game = games.findGame(socket);
    game.getGameResults();
    // Signal to others that game is over
    lobby.inGame = false;

    // Calculate score normalized to number of players 
    var normalizedScore = game.gameData.stats.gameEndTotal / game.players.length;
    
    // Keep track of scores for current quiz in database 
    game.writeScoreToDatabase(normalizedScore, game.quizId);

    // Update status of lobby across all lobbies
    io.emit('updateLobbies', lobbies.getAllLobbies());
    io.to(game.id).emit('gameStats', game.gameData.stats);
  });

  // play again using the same lobbyId
  socket.on('playAgain', function() {
    var gameId = players[socket.playerId].lobbyId;
    var lobby = lobbies.getLobby(gameId);
    io.to(socket.id).emit('restartGame', lobby);
  });

  socket.on('quitGame', function() {
    var gameId = players[socket.playerId].lobbyId;
    var lobby = lobbies.getLobby(gameId);
    lobby.removePlayer(socket.playerId);
    io.to(lobby.id).emit('updatePlayers', lobby.getPlayers());
    if (lobby.getPlayers().length === 0) {
      // console.log('LOBBY BEING REMOVED BECAUSE PLAYERS IS 0');
      lobbies.removeLobby(gameId);
    } 
    // Remove player from socket room
    socket.leave(lobby.id);
    // update lobbies for all players
    io.emit('updateLobbies', lobbies.getAllLobbies());
  });

  // on disconnect, remove player from game
  socket.on('disconnect', function() {
    // check if player exists (player is created when added to lobby)
    // console.log(' | Player disconnected: ', socket.playerId);
    if (game) {
      // console.log(' | Game of disconnected player found')
      var playerIndex = -1;
      game.players.forEach(function(player, index){
        if (player.id === socket.playerId){
          playerIndex = index;
        }
      })
      if(playerIndex !== -1){
        game.players.splice(playerIndex,1);
        // console.log(' | Player removed from game: ', game.players);
      }
    }
  });

};
