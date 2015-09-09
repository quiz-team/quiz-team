var playerMaker = require('./player.js');
var players = require('../collections/players.js');
var _und = require('underscore');
var config = require('../utils/gameConfig');

/**
 * @constructor Lobby
 * @param  {string} roomname
 */
module.exports = function(roomname) {

  var lobby = {
    roomname: roomname,
    players: [],
    full: false,
    inGame: false
  };

  /**
   * Adds a player to the lobby.
   * @memberOf Lobby
   * @param {string} playerId The ID of a player
   * @returns {number|null} Player's position number in lobby.
   */
  lobby.addPlayer = function(playerId) {
    if (lobby.players.length < config.MAX_PLAYERS) {
      console.log(' | Add player: ' + playerId + ' to lobby: ', lobby.roomname);
      var player = players[playerId];
      // push returns length of array
      player.lobbyId = lobby.id; // lobby.id assigned in from lobbies
      lobby.players.push(player);
      if (lobby.players.length === config.MAX_PLAYERS) {
        lobby.full = true;
      }
      // console.log("Assigning player num " + i);
      // return index of pushed player
      return lobby.players.length - 1;
    } else {
      console.log(' | Lobby full. Cannot join:', lobby.roomname);
    }
    return null;
  };

  /**
   * Removes a player to the lobby.
   * @memberOf Lobby
   * @param {string} playerId The ID of a player
   * @returns {number|null} Player's position index if found.
   */
  lobby.removePlayer = function(playerId) {
    var playerIndex = -1;
    // get player index
    _und.each(lobby.players, function(player, index) {
      if (player.id === playerId) {
        playerIndex = index;
        player.lobbyId = null;
      }
    });

    if (playerIndex === -1) {
      return null;
    }

    console.log(' | Remove player:', playerId, ' from lobby: ', lobby.roomname);
    // remove player from room and players collection
    lobby.players.splice(playerIndex, 1);
    lobby.full = false;
    
    return playerIndex;
  };

  /**
   * Gets a player in the lobby by id.
   * @memberOf Lobby
   * @param {string} playerId The ID of a player
   * @returns {Player} 
   */
  // takes a socked.id and returns player object
  lobby.getPlayerById = function(playerId){
    var result;
    _und.each(lobby.players, function(player, index) {
      if (player.id === playerId) {
        result = player;
      }
    });
    return result;
  };

  /**
   * Gets list of players in the lobby
   * @memberOf Lobby
   * @returns {Array.<Player>} 
   */
  lobby.getPlayers = function() {
    return lobby.players;
  };

  return lobby;
};