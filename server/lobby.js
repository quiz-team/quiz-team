module.exports = function() {
  var lobby = {};
  lobby.players = [null, null, null, null];

  //Add a player by a socket id number
  //Returns that player's number
  lobby.AddPlayer = function(id) {
    for (var i = 0; i < players.length; i++) {
      if (lobby.players[i] === null) {
        lobby.players[i] = id;
        return i;
      }
    }
    return null;
  }
  
  //Remove a player by socket id number
  //Returns that player's number
  lobby.RemovePlayer = function(id) {
    var playerIndex = lobby.players.indexOf(id);
    if (playerIndex === -1) {
      return null;
    }
    lobby.players[playerIndex] = null;
    return playerIndex;
  }

  //Get player number by socket id number
  lobby.GetPlayerNum = function(id) {
    return lobby.players.indexOf(id);
  }

  lobby.GetPlayers = function() {
    return players;
  }

  return lobby;
}