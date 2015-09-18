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
  var player = {
    id: sessionId,
    socketId: null,
    number: null,
    color: null,
    ready: false,
    lobbyId: null,
    recentlyPlayedQuizzes: []
  };

  player.setSocket = function(socket) {
    player.socketId = socket.id;
  };

  player.savePlayedQuiz = function(quizId){
    if (this.recentlyPlayedQuizzes.length === 3){
      this.recentlyPlayedQuizzes.shift();
    }
    this.recentlyPlayedQuizzes.push(quizId);
  };

  return player;
};