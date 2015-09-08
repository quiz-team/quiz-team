var playerMaker = require('./player.js');
var players = require('../collections/players.js');
var _und = require('underscore');

/**
 * @constructor Lobby
 * @param  {string} roomname
 */
module.exports = function(roomname) {

  var maxPlayers = 2;

  var lobby = {
    roomname: roomname,
    players: [],
    full: false,
    inGame: false
  };

  /**
   * Adds a player to the lobby.
   * @memberOf Lobby
   * @param {string} id The socket ID of a player
   * @returns {number|null} Player's position number in lobby.
   */
  lobby.addPlayer = function(id) {
    if (lobby.players.length < maxPlayers) {
      console.log(' | Add player: ' + id + ' to lobby: ', lobby.roomname);
      var newPlayer = playerMaker(id);
      // push returns length of array
      newPlayer.lobbyId = lobby.id; // lobby.id assigned in from lobbies
      lobby.players.push(newPlayer);
      if (lobby.players.length === maxPlayers) {
        lobby.full = true;
      }
      // add player to players object
      players[id] = newPlayer;
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
   * @param {string} id The socket ID of a player
   * @returns {number|null} Player's position index if found.
   */
  lobby.removePlayer = function(id) {
    var playerIndex = -1;
    // get player index
    _und.each(lobby.players, function(player, index) {
      if (player.id === id) {
        playerIndex = index;
      }
    });

    if (playerIndex === -1) {
      return null;
    }

    console.log(' | Remove player:', id, ' from lobby: ', lobby.roomname);
    // remove player from room and players collection
    delete players[id];
    lobby.players.splice(playerIndex, 1);
    lobby.full = false;
    
    return playerIndex;
  };

  /**
   * Gets a player in the lobby by id.
   * @memberOf Lobby
   * @param {string} id The socket ID of a player
   * @returns {Player} 
   */
  lobby.getPlayerById = function(id){
    var result;
    _und.each(lobby.players, function(player, index) {
      if (player.id === id) {
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