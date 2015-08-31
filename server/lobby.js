var playerMaker = require('./player.js');
var players = require('./players.js');
var _und = require('underscore');

module.exports = function(roomname) {
  var lobby = {};
  var maxPlayers = 6;
  lobby.roomname = roomname;
  lobby.players = [];

  //Add a player by a socket id number
  //Returns that player's number
  lobby.AddPlayer = function(id) {
    console.log("Player with id " + id + " joining");
    if (lobby.players.length < maxPlayers) {
      var newPlayer = playerMaker(id);
      // push returns length of array
      newPlayer.lobbyId = lobby.id; // lobby.id assigned in from lobbies
      lobby.players.push(newPlayer);
      // var index = lobby.players.indexOf(newPlayer);
      // console.log("add player, index", index);
      // lobby.players[index].number = index + 1;
      // add player to players object
      players[id] = newPlayer;
      // console.log("Assigning player num " + i);
      // return index of pushed player
      return lobby.players.length - 1;
    }
    return null;
  };

  //Remove a player by socket id number
  //Returns that player's number
  lobby.RemovePlayer = function(id) {
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
    // remove player from room and players collection
    delete players[id];
    lobby.players.splice(playerIndex, 1);
    return playerIndex;
  };

  //Get player number by socket id number
  // lobby.GetPlayerNum = function(id) {
  //   var playerIndex = -1;
  //   _und.each(lobby.players, function(player, index) {
  //     if (player && player.id === id) {
  //       playerIndex = index;
  //     }
  //   });
  //   return playerIndex + 1;
  // };

  // takes a socked.id and returns player object
  lobby.GetPlayerById = function(id){
    var result;
    _und.each(lobby.players, function(player, index) {
      if (player.id === id) {
        result = player;
      }
    });
    return result;
  };

  lobby.GetPlayers = function() {
    return lobby.players;
  };

  return lobby;
};