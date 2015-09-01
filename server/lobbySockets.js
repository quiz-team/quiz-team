var lobbies = require('./lobbies.js')();
var _und = require('underscore');
var players = require('./players.js');

module.exports = function(socket, io){
     
     // create room
    socket.on('createRoom', function(data, callback) {
      console.log('trying to create room');
      var lobby = lobbies.AddLobby();
      lobby.AddPlayer(socket.id);

      // update lobbies for all players
      io.emit('updateLobbies', lobbies.GetAllLobbies());
      socket.join(lobby.id);
      // pass back lobby object
      callback(lobby);
    });

    // join room
    socket.on('joinRoom', function(lobbyid, callback) {
      var lobby = lobbies.GetLobby(lobbyid);
      lobby.AddPlayer(socket.id);
      socket.join(lobby.id);
      // pass back lobby object
      callback(lobby);
    });

    // get initial list
    socket.on('enteredSelectionRoom', function(data, callback) {
      callback(lobbies.GetAllLobbies());
      console.log('returning rooms', lobbies.GetAllLobbies());
    });

    socket.on('enteredLobby', function(lobbyId, callback){
      // updates players when another player enters the lobby
      var lobby = lobbies.GetLobby(lobbyId);
      io.to(lobbyId).emit('updatePlayers', lobby.GetPlayers());
      callback(lobby.GetPlayers());
    });

    socket.on('leaveLobby', function(lobbyId){
      // updates players when another player leaves the lobby
      var lobby = lobbies.GetLobby(lobbyId);
      lobby.RemovePlayer(socket.id);
      console.log("LOBBY", lobby);
      io.to(lobbyId).emit('updatePlayers', lobby.GetPlayers());
      // update lobbies for all players
      if (lobby.GetPlayers().length === 0) {
        lobbies.RemoveLobby(lobbyId);
        console.log("LOBBY LEAVE", lobbies);
        // update lobbies for all players
        io.emit('updateLobbies', lobbies.GetAllLobbies());
      }
    });

    // on disconnect, remove player from lobby
    socket.on('disconnect', function() {
      var player = players[socket.id];
      // check if player exists (player is created when added to lobby)
      if (player) {
        var lobbyId = player.lobbyId;
        var lobby = lobbies.GetLobby(lobbyId);
        lobby.RemovePlayer(socket.id);
        // update other players
        io.to(lobbyId).emit('updatePlayers', lobby.GetPlayers());
        // update lobbies for all players
        if (lobby.GetPlayers().length === 0) {
          lobbies.RemoveLobby(lobbyId);
          // update lobbies for all players
          io.emit('updateLobbies', lobbies.GetAllLobbies());
        }
      }
    });

    // check ready
    socket.on('readyOn', function(lobbyId){
      // updates players when a player is ready and checks if all players are ready
      // if all players are ready, the gameStart event is triggered
      var lobby = lobbies.GetLobby(lobbyId);
      lobby.GetPlayerById(socket.id).ready = true;
      var allPlayers = lobby.GetPlayers();
      console.log("allPlayers", allPlayers);
      var allReady = _und.every(allPlayers, function(player){
        return player.ready;
      });

      if(allReady){
        io.emit('startGame');
      }
      io.to(lobbyId).emit('updatePlayers', allPlayers);
    });

    socket.on('readyOff', function(lobbyId){
      // updates players when a player is no longer ready
      var lobby = lobbies.GetLobby(lobbyId);
      lobby.GetPlayerById(socket.id).ready = false;
      io.to(lobbyId).emit('updatePlayers', lobby.GetPlayers());
    });
}