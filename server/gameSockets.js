var lobbies = require('./lobbies.js')();
var _und = require('underscore');
var players = require('./players.js');
var game = require('./game.js')();
var timer = require('./timerController.js');

module.exports = function(socket, io) {
  socket.on('enteredGame', function(data, callback) {
      console.log('entered game');
      game.addPlayer(data.id);
      var gameReady = _und.every(game.lobby.players, function(player) {
        return (game.players.indexOf(player) !== -1)
      }.bind(this));
      if (gameReady) {
        io.to(game.id).emit('startClock', timer.preGameTimer());
        game.startTimer(timer.preGameTimer(), function(){
          io.to(game.id).emit('startGame')
        })
      };
    });

}
