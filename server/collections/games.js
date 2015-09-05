var gameMaker = require('../models/game.js');
var players = require('../collections/players.js');

module.exports = {

  activeGames: {},

  createGame: function(gameId, players) {
    // creates game if it does not exist
    // if (!this.activeGames[gameId]) {
      this.activeGames[gameId] = gameMaker(gameId);
      this.activeGames[gameId].loadPlayers(players);
      this.activeGames[gameId].loadGameData(players.length);

    // }
    return this.activeGames[gameId];
  },

  findGame: function(socket) {
    var gameId = players[socket.id].lobbyId;
    return this.activeGames[gameId];
  },

  destroyGame: function(gameId) {
    if (this.activeGames[gameId]) {
      delete this.activeGames[gameId];
    }
  }
};
