var lobbyMaker = require('../models/lobby.js');
var _und = require('underscore');

var lobbies = {};
var activeLobbies = {};

var nextId = 0;

var lobbyNames = [
  'vorpal meatloaf',
  'revolver ocelot',
  'brony convention',
  'questionable masseuse',
  'fractal dicks'
];

lobbies.AddLobby = function() {
  var roomname = lobbyNames[Math.floor(Math.random() * lobbyNames.length)];
  var newLobby = lobbyMaker(roomname);
  nextId++;
  newLobby.id = nextId;
  activeLobbies[nextId] = newLobby;

  return newLobby;
};

lobbies.GetLobby = function(id) {
  return activeLobbies[id];
};

lobbies.RemoveLobby = function(id) {
  delete activeLobbies[id];
};

lobbies.GetAllLobbies = function() {
  return _und.map(activeLobbies, function(item) {
    return item;
  });
};

module.exports = lobbies;

