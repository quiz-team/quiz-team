/** 
 * @constructor Player
 * @param {string} id - a player's socket id
 */
module.exports = function(id){
  /**
   * @memberOf Player
   * @type {Object}
   * @property {string} id - A player's socket id.
   * @property {number} number - A player's lobby position.
   * @property {boolean} ready - Signal if player is pressing the ready button.
   * @property {number} lobbyId - ID of lobby that player belongs to.
   */
  var player = {};
  player.id = id;
  player.number= null;
  player.ready = false;
  player.lobbyId = null;

  return player;
};