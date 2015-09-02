var lobbySocketSetup = require('./lobbySockets.js');
var gameSocketSetup = require('./gameSockets.js');

module.exports = function(server) {
  // var lobby = lobbyMaker();
  var io = require('socket.io')(server);
  //Event for dealing with incoming socket connection.
  io.on('connection', function(socket) {
    lobbySocketSetup(socket, io);
    gameSocketSetup(socket, io);
  });

};
