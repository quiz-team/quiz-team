var lobbySocketSetup = require('./lobbySockets.js');
var gameSocketSetup = require('./gameSockets.js');
var players = require('../collections/players.js');
var playerMaker = require('../models/player.js');


module.exports = function(server) {
  // var lobby = lobbyMaker();
  var io = require('socket.io')(server);

  // middleware to check session ID
  io.use(function(socket, next) {
    var sessionId = socket.request._query.sessionId;
    console.log('======================================================');
    console.log('sessionID: ', sessionId);
    // create player if player does not exist
    socket.playerId = sessionId;
    if (!players.hasOwnProperty(sessionId)) {
      players[sessionId] = playerMaker(sessionId);
    }
    players[sessionId].setSocket(socket);
    next();
  });




  //Event for dealing with incoming socket connection.
  io.on('connection', function(socket) {
    lobbySocketSetup(socket, io);
    gameSocketSetup(socket, io);
  });

};
