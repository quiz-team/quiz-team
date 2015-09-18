var playerMaker = require('./player.js');
var players = require('../collections/players.js');
var _und = require('underscore');
var config = require('../utils/gameConfig');

/**
 * @constructor Lobby
 * @param  {string} roomname
 */
module.exports = function(roomname, id) {

  var lobby = {
    roomname: roomname,
    players: [],
    full: false,
    inGame: false,
    id: id
  };

  // make empty array that has a length of max players
  // use this array to assign player numbers to players
  var playerNumberAssignments = new Array(config.MAX_PLAYERS);

  lobby._assignPlayerNumber = function(player) {
    for (var i=0; i< playerNumberAssignments.length; i++) {
      if (playerNumberAssignments[i] === undefined || playerNumberAssignments[i] === null) {
        playerNumberAssignments[i] = i + 1;
        player.number = i + 1;
        break;
      }
    }
    return player;
  };

  lobby._removePlayerNumber = function(player) {
    for (var i=0; i< playerNumberAssignments.length; i++) {
      if (playerNumberAssignments[i] === player.number) {
        playerNumberAssignments[i] = undefined;
        player.number = undefined;
        break;
      }
    }
    return player;
  };

  var playerColorAssignments = [];

  lobby._assignPlayerColor = function(player) {
    var colorFound = false;
    while (!colorFound){
      // pick a random number from 1-4
      var randomColorNum = Math.ceil(Math.random()*4);
      // check if number is already in array
      if (playerColorAssignments.indexOf(randomColorNum) === -1){
        // if not, add to array, assign to player
        colorFound = true;
        playerColorAssignments.push(randomColorNum);
        player.color = randomColorNum;
      }
    }
    return player;
  };

  lobby._removePlayerColor = function(player) {
    var colorNum = player.color;
    var colorIndex = playerColorAssignments.indexOf(colorNum);
    playerColorAssignments[colorIndex] = undefined;
    player.color = null;
  };

  /**
   * Adds a player to the lobby.
   * @memberOf Lobby
   * @param {string} playerId The ID of a player
   * @returns {number|null} Player's position number in lobby.
   */
  lobby.addPlayer = function(playerId) {
    if (lobby.players.length < config.MAX_PLAYERS) {
      // console.log(' | Add player: ' + playerId + ' to lobby: ', lobby.roomname);
      // Grab player from socket session
      var player = players[playerId];
      // push returns length of array
      player.lobbyId = lobby.id;
      // assign a player number to the player
      lobby._assignPlayerNumber(player);
      // assign a random color to the player
      lobby._assignPlayerColor(player);
      // add the player to the lobby players array
      lobby.players.push(player);
      if (lobby.players.length === config.MAX_PLAYERS) {
        lobby.full = true;
      }
      // console.log("Assigning player num " + i);
      // return index of pushed player
      return lobby.players.length - 1;
    } else {
      // console.log(' | Lobby full. Cannot join:', lobby.roomname);
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
        lobby._removePlayerNumber(player);
        lobby._removePlayerColor(player);
      }
    });

    if (playerIndex === -1) {
      return null;
    }

    // console.log(' | Remove player:', playerId, ' from lobby: ', lobby.roomname);
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