var lobbies = require('../collections/lobbies.js');
var _und = require('underscore');
var players = require('../collections/players.js');
// var gameMaker = require('./game.js');
var games = require('../collections/games.js')();  // CHANGE THIS TO AN OBJECT INSTEAD OF FUNCTION UNLESS ALEX HAS INSIGHT
var timer = require('../utils/timerController.js');

module.exports = function(socket, io) {
  

  socket.on('enteredGame', function() {
    var lobbyId = players[socket.id].lobbyId;
    // create a new game with lobby Id
    var game = games.FindOrCreateGame(lobbyId);


    //find the lobby with lobbyId
    var lobby = lobbies.GetLobby(lobbyId);
    console.log("THIS IS THE LOBBY ID: ", lobbyId);
    var lobbyPlayers = lobby.GetPlayers();
    // console.log(lobbyPlayers);

    game.addPlayer(socket.id);

    var gameReady = _und.every(lobbyPlayers, function(player) {
      return (game.players.indexOf(player.id) !== -1);
    }.bind(this));

    // console.log("GAME READY? ", gameReady);

    if (gameReady) {

      // console.log("GAME READY ON SOCKET: ", socket.id);

      // load up game data given number of players in game
      game.loadGameData(game.players.length);

      // start game timer
      var timerData = timer.setTimer(10000);
      io.to(game.id).emit('startClock', timerData);
      game.startTimer(timerData, function() {
        io.to(game.id).emit('startGame');
      });
    }
  });

  socket.on('enteredRound', function() {
    // console.log("PLAYER ENTERED ROUND: ", socket.id);
    var gameId = players[socket.id].lobbyId;

    // Find the appropriate game for the player
    var game = games.FindOrCreateGame(gameId);
    game.playersInView.push(socket.id);

    // TODO: REPLACE THIS
    // game.createRound(socket.id);

    // console.log("game.players ", game.players);
    // console.log("game.playersInView ", game.playersInView);

    // if all players in round, emit start round with distributed q/a and start timer
    var viewReady = _und.every(game.players, function(playerId) {
      return (game.playersInView.indexOf(playerId) !== -1);
    }.bind(this));

    if (viewReady) {
      // increase the round number on the game

      console.log("READY TO SEND OUT ROUND DATA");
      game.roundNum++;

      // reset/set up the currentRoundResults object
      game.resetCurrentRound();

      var timerData = timer.setTimer(20000);

      game.gameData.timerData = timerData;
      game.gameData.currentRound = game.roundNum;

      // console.log("GAME DATA ", game.gameData);

      io.to(game.id).emit('startRound', game.gameData);
      // start the round timer
      game.startTimer(timerData, function() {
        // expect answer data from each player
        io.to(game.id).emit('endRound');
        game.playersInView =[];
      });
    }
  });

  // SET UP FOR LATER
  socket.on('submitAnswer', function(answerId){
    // console.log("PLAYER SUBMITTED AN ANSWER");
    var game = games.FindOrCreateGame(players[socket.id].lobbyId);
    game.updateRoundScore(answerId);
  });

  socket.on('enteredRoundOver', function() {
    // console.log("ENTERED END OF ROUND VIEW: ", socket.id);
    // THIS SHOULD BE EXTRACTED OUT INTO A FUNCTION
    var gameId = players[socket.id].lobbyId;

    // Find the appropriate game for the player
    var game = games.FindOrCreateGame(gameId);
    game.playersInView.push(socket.id);
    // console.log("game.players: ", game.players)
    // console.log("game.playersInView: ", game.playersInView)

    // if all players in round, emit start round with distributed q/a and start timer
    var viewReady = _und.every(game.players, function(playerId) {
      return (game.playersInView.indexOf(playerId) !== -1);
    }.bind(this));
    // Wait for all the players to enter the view
    // send out the game.roundResults of the round
    // after a timer, send them on to the next round, or the game over screen
    if(viewReady){
      console.log("EVERYONE IN END OF ROUND VIEW")
      // EXTRACT THIS POTENTIALLY
      var timerData = timer.setTimer(10000);

      game.currentRoundResults.timerData = timerData;
      console.log("ABOUT TO EMIT, CURRENT RESULTS ARE ", game.currentRoundResults);
      io.to(game.id).emit('roundResults', game.currentRoundResults);

      game.startTimer(timerData, function() {
        if (game.roundNum === game.numRounds) {
          io.to(game.id).emit('gameOver');
        } else {
          io.to(game.id).emit('nextRound');
        }
        game.playersInView =[];
      });
    }
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
