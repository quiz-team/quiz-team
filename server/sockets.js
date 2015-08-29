var lobbies = require('./lobbies.js')();

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

      // update lobbies for all players
      io.emit('updateLobbies', lobbies.GetAllLobbies());
      // pass back lobby object
      callback(lobby);
    });

    // join room
    socket.on('joinRoom', function(lobbyid, callback) {
      var lobby = lobbies.GetLobby(lobbyid);
      lobby.AddPlayer(socket.id);
      // pass back lobby object
      callback(lobby);
    });

    // get initial list
    socket.on('enteredSelectionRoom', function(data, callback) {
      callback(lobbies.GetAllLobbies());
      console.log('returning rooms', lobbies.GetAllLobbies());
    });
  });

};
