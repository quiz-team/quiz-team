/** 
 * @constructor Player
 * @param {string} sessionId - a player's session id
 */
  /**
   * @memberOf Player
   * @type {Object}
   * @property {string} id - A player's socket id.
   * @property {string} socketId - A player's socket ID.
   * @property {number} number - A player's lobby position.
   * @property {boolean} ready - Signal if player is pressing the ready button.
   * @property {number} lobbyId - ID of lobby that player belongs to.
   */
module.exports = function(sessionId){
  var player = {};
  player.id = sessionId;
  player.socketId = null;
  player.number= null;
  player.ready = false;
  player.lobbyId = null;

  player.setSocket = function(socket) {
    player.socketId = socket.id;
  };

  return player;
};