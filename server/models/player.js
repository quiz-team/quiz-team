module.exports = function(id){
  var player = {};
  player.id = id;
  player.number= null;
  player.ready = false;
  player.lobbyId = null;
  player.answers = [];

  return player;
};