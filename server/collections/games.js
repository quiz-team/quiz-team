var gameMaker = require('../models/game.js');
var players = require('../collections/players.js');

module.exports = {

  activeGames: {},

  createGame: function(gameId, players, callback) {
    this.activeGames[gameId] = gameMaker(gameId);
    this.activeGames[gameId].loadPlayers(players);
    this.activeGames[gameId].loadGameData(players.length, function() {
      callback(this.activeGames[gameId]);
    }.bind(this));
  },

  findGame: function(socket) {
    var gameId = players[socket.playerId].lobbyId;
    return this.activeGames[gameId];
  },

  destroyGame: function(gameId) {
    if (this.activeGames[gameId]) {
      delete this.activeGames[gameId];
    }
  }
};
