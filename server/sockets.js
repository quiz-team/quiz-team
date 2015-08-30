var lobbies = require('./lobbies.js')();
var _und = require('underscore');

module.exports = function(server) {
  // var lobby = lobbyMaker();
  var io = require('socket.io')(server);
  //Event for dealing with incoming socket connection.
  io.on('connection', function(socket) {
    // lobby.AddPlayer(socket.id);
    // socket.on('disconnect', function() {
    //   lobby.RemovePlayer(this.id);
    // });

    // console.log("Connection happening", socket.id);

    // socket.on('button clicked', function(){
    //   io.emit("friend click", lobby.GetPlayerNum(socket.id));
    // });

    // socket.on('button unclicked', function(){
    //   io.emit("friend unclick", lobby.GetPlayerNum(socket.id));
    // });

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
      io.to(lobbyId).emit('updatePlayers', lobby.GetPlayers());
    });

    // on disconnect, remove player from lobby
    socket.on('disconnect', function() {
      // TODO handle remove player from lobby object on disconnect
      // var lobby = lobbies.GetLobby(lobbyId);
      // lobby.RemovePlayer(socket.id);
    });

    // check ready
    socket.on('readyOn', function(lobbyId){
      // updates players when a player is ready and checks if all players are ready
      // if all players are ready, the gameStart event is triggered
      var lobby = lobbies.GetLobby(lobbyId);
      console.log("SOCKET-ID", socket.id);
      lobby.GetPlayerById(socket.id).ready = true;
      var allPlayers = lobby.GetPlayers();
      var allReady = _und.every(allPlayers, function(player){
        return player && player.ready;
      })
      if(allReady){
        io.emit('gameStart');
      }
      io.to(lobbyId).emit('updatePlayers', allPlayers);
    });

    socket.on('readyOff', function(lobbyId){
      // updates players when a player is no longer ready
      var lobby = lobbies.GetLobby(lobbyId);
      lobby.GetPlayerById(socket.id).ready = false;
      io.to(lobbyId).emit('updatePlayers', lobby.GetPlayers()) 
    });
  });

};




