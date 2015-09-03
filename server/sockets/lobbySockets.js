var lobbies = require('../collections/lobbies.js');
var _und = require('underscore');
var players = require('../collections/players.js');
var games = require('../collections/games.js');

module.exports = function(socket, io) {

  // create room
  socket.on('createRoom', function(data, callback) {
    console.log('trying to create room');
    var lobby = lobbies.addLobby();
    lobby.addPlayer(socket.id);
    // update lobbies for all players
    io.emit('updateLobbies', lobbies.getAllLobbies());
    socket.join(lobby.id);
    // pass back lobby object
    callback(lobby);
  });

  // join room
  socket.on('joinRoom', function(lobbyid, callback) {
    var lobby = lobbies.getLobby(lobbyid);
    lobby.addPlayer(socket.id);
    socket.join(lobby.id);
    // pass back lobby object
    callback(lobby);
  });

  // get initial list
  socket.on('enteredSelectionRoom', function(data, callback) {
    callback(lobbies.getAllLobbies());
    // console.log('returning rooms', lobbies.getAllLobbies());
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
    lobby.removePlayer(socket.id);
    // console.log("LOBBY", lobby);
    io.to(lobbyId).emit('updatePlayers', lobby.getPlayers());
    // update lobbies for all players
    if (lobby.getPlayers().length === 0) {
      lobbies.removeLobby(lobbyId);
      // console.log("LOBBY LEAVE", lobbies);
      // update lobbies for all players
      io.emit('updateLobbies', lobbies.getAllLobbies());
    }
  });

  // on disconnect, remove player from lobby
  socket.on('disconnect', function() {
    var player = players[socket.id];
    // check if player exists (player is created when added to lobby)
    if (player) {
      var lobbyId = player.lobbyId;
      var lobby = lobbies.getLobby(lobbyId);
      lobby.removePlayer(socket.id);
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
    lobby.getPlayerById(socket.id).ready = true;
    var allPlayers = lobby.getPlayers();
    // console.log("allPlayers", allPlayers);
    var allReady = _und.every(allPlayers, function(player) {
      return player.ready;
    });

    if (allReady) {
      // create a new game with lobby Id
      var game = games.createGame(lobbyId, allPlayers);
      io.emit('goToStartScreen', game.gameData);
    }
    io.to(lobbyId).emit('updatePlayers', allPlayers);
  });

  socket.on('readyOff', function(lobbyId) {
    // updates players when a player is no longer ready
    var lobby = lobbies.getLobby(lobbyId);
    lobby.getPlayerById(socket.id).ready = false;
    io.to(lobbyId).emit('updatePlayers', lobby.getPlayers());
  });
};
