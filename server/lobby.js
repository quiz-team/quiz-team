var playerMaker = require('./player.js');
var players = require('./players.js');
var _und = require('underscore');

module.exports = function(roomname) {
  var lobby = {};
  lobby.roomname = roomname;
  lobby.players = [null,null,null,null];

  //Add a player by a socket id number
  //Returns that player's number
  lobby.AddPlayer = function(id) {
    console.log("Player with id " + id + " joining");
    for (var i = 0; i < lobby.players.length; i++) {
      if (lobby.players[i] === null) {
         var newPlayer = playerMaker(id);
         newPlayer.number = i+1;
         lobby.players[i] = newPlayer;
         newPlayer.lobbyId = lobby.id; // lobby.id assigned in from lobbies
         players[id] = newPlayer;
        // console.log("Assigning player num " + i);
        return i + 1;
      }
    }
    return null;
  };

  //Remove a player by socket id number
  //Returns that player's number
  lobby.RemovePlayer = function(id) {
    var playerIndex = -1;
    // get player index
    _und.each(lobby.players, function(player, index) {
      if (player && player.id === id) {
        playerIndex = index;
      }
    });

    if (playerIndex === -1) {
      return null;
    }
    // remove player from room and players collection
    delete players[id];
    lobby.players[playerIndex] = null;
    return playerIndex + 1;
  };

  //Get player number by socket id number
  lobby.GetPlayerNum = function(id) {
    var playerIndex = -1;
    _und.each(lobby.players, function(player, index) {
      if (player && player.id === id) {
        playerIndex = index;
      }
    });
    return playerIndex + 1;
  };

  lobby.GetPlayerById = function(id){
    return lobby.players[lobby.GetPlayerNum(id) - 1];
  };

  lobby.GetPlayers = function() {
    return lobby.players;
  };

  return lobby;
};