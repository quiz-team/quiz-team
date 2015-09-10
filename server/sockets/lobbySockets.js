var lobbies = require('../collections/lobbies.js');
var _und = require('underscore');
var players = require('../collections/players.js');
var games = require('../collections/games.js');
var config = require('../utils/gameConfig');

module.exports = function(socket, io) {

  // create room
  socket.on('createRoom', function(data, callback) {
    var lobby = lobbies.addLobby();
    lobby.addPlayer(socket.playerId);
    // update lobbies for all players
    io.emit('updateLobbies', lobbies.getAllLobbies());
    socket.join(lobby.id);
    // pass back lobby object
    callback(lobby);
  });

  // join room
  socket.on('joinRoom', function(lobbyid, callback) {
    var lobby = lobbies.getLobby(lobbyid);
    lobby.addPlayer(socket.playerId);
    io.emit('updateLobbies', lobbies.getAllLobbies());
    socket.join(lobby.id);
    // pass back lobby object
    callback(lobby);
  });

  // get initial list
  socket.on('enteredSelectionRoom', function(data, callback) {
    callback(lobbies.getAllLobbies());
  });

  socket.on('enteredLobby', function(lobbyId, callback) {
    // updates players when another player enters the lobby
    var lobby = lobbies.getLobby(lobbyId);
    io.to(lobbyId).emit('updatePlayers', lobby.getPlayers());
    callback(lobby.getPlayers());
  });

  socket.on('leaveLobby', function(lobbyId) {
    // updates players when another player leaves the lobby
    var lobby = lobbies.getLobby(lobbyId);
    lobby.removePlayer(socket.playerId);
    io.to(lobbyId).emit('updatePlayers', lobby.getPlayers());
    // update lobbies for all players
    if (lobby.getPlayers().length === 0) {
      lobbies.removeLobby(lobbyId);
      console.log(' | Remove lobby:', lobby.roomname);
    }
    // Remove player from socket room
    socket.leave(lobby.id);
    // update lobbies for all players
    io.emit('updateLobbies', lobbies.getAllLobbies());
  });

  // on disconnect, remove player from lobby
  socket.on('disconnect', function() {
    var player = players[socket.playerId];
    // check if player exists
    if (player && player.lobbyId) {
      var lobbyId = player.lobbyId;
      var lobby = lobbies.getLobby(lobbyId);
      lobby.removePlayer(socket.playerId);
      // update other players
      io.to(lobbyId).emit('updatePlayers', lobby.getPlayers());
      // update lobbies for all players
      if (lobby.getPlayers().length === 0) {
        lobbies.removeLobby(lobbyId);
        // update lobbies for all players
        io.emit('updateLobbies', lobbies.getAllLobbies());
      }
    }
  });

  // check ready
  socket.on('readyOn', function(lobbyId) {
    // updates players when a player is ready and checks if all players are ready
    // if all players are ready, the gameStart event is triggered
    var lobby = lobbies.getLobby(lobbyId);
    lobby.getPlayerById(socket.playerId).ready = true;
    var allPlayers = lobby.getPlayers();
    var allReady = _und.every(allPlayers, function(player) {
      return player.ready;
    });

    if (allReady && allPlayers.length >= config.MIN_PLAYERS) {
      console.log('all players are ready!', allPlayers);

      // create a new game with lobby Id
      games.createGame(lobbyId, allPlayers, function(game) {
        io.to(lobbyId).emit('goToStartScreen', game.gameData);
      });

      lobby.inGame = true;
      io.emit('updateLobbies', lobbies.getAllLobbies());
    }
    socket.broadcast.to(lobbyId).emit('updatePlayers', allPlayers);
  });

  socket.on('readyOff', function(lobbyId) {
    // updates players when a player is no longer ready
    var lobby = lobbies.getLobby(lobbyId);
    lobby.getPlayerById(socket.playerId).ready = false;
    socket.broadcast.to(lobbyId).emit('updatePlayers', lobby.getPlayers());
  });
};