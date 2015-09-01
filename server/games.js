var gameMaker = require('./game.js');

module.exports = function() {
  var games = {};

  games.activeGames = {};

  games.FindOrCreateGame = function(gameId) {
    // creates game if it does not exist
    if (!games.activeGames[gameId]) {
      games.activeGames[gameId] = gameMaker();
      games.activeGames[gameId].loadGameData();
    }

    return games.activeGames[gameId];
  };

  return games;
};