var gameMaker = require('../models/game.js');

module.exports = function() {
  var games = {};

  games.activeGames = {};

  games.FindOrCreateGame = function(gameId) {
    // creates game if it does not exist
    if (!games.activeGames[gameId]) {
      games.activeGames[gameId] = gameMaker(gameId);
    }
    return games.activeGames[gameId];
  };

  games.DestroyGame = function(gameId) {
    if (games.activeGames[gameId]) {
      delete games.activeGames[gameId];
    }
  };

  return games;
};
