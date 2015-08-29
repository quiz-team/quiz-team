module.exports = function(roomname) {
  var lobby = {};
  lobby.roomname = roomname;
  lobby.players = [null, null, null, null];

  //Add a player by a socket id number
  //Returns that player's number
  lobby.AddPlayer = function(id) {
    console.log("Player with id " + id + " joining");
    for (var i = 0; i < lobby.players.length; i++) {
      if (lobby.players[i] === null) {
        lobby.players[i] = id;
        console.log("Assigning player num " + i);
        return i + 1;
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
    return playerIndex + 1;
  }

  //Get player number by socket id number
  lobby.GetPlayerNum = function(id) {
    return lobby.players.indexOf(id) + 1;
  }

  lobby.GetPlayers = function() {
    return lobby.players;
  }

  return lobby;
}