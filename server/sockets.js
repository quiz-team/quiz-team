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
      callback(lobbies.AddLobby());
    });

    // join room
  });

};
