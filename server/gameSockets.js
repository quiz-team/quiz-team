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
        // start game timer
        var timerData = timer.preGameTimer();
        io.to(game.id).emit('startClock', timerData);
        game.startTimer(timerData, function() {
          io.to(game.id).emit('startGame');
        });
      };
    });
  socket.on('enteredRound', function(){
    var gameData;
    var timerData = timer.roundTimer(20000);
    io.to(game.id).emit('startRound', gameData);
    game.startTimer(timerData, function() {
      io.to(game.id).emit('endRound', function() {
        
      });
    });

  })

}
