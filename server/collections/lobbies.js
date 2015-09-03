var lobbyMaker = require('../models/lobby.js');
var _und = require('underscore');
var fs = require('fs');

var lobbies = {};
var activeLobbies = {};
var nextId = 0;

var generateLobbyName = function () {
  // Establish paths to word files (files located in collections folder)
  var adjectivesFilePath = __dirname + '/adjectives.dat';
  var nounsFilePath = __dirname + '/nouns.dat';
  // Load adjective and noun files  
  var adjectives = fs.readFileSync(adjectivesFilePath).toString().split("\n");
  var nouns = fs.readFileSync(nounsFilePath).toString().split("\n");
  // Choose random adjective and noun from word banks
  var adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  var noun = nouns[Math.floor(Math.random() * nouns.length)];
  // Capitalize room name words
  adjective = adjective.charAt(0).toUpperCase() + adjective.slice(1);
  noun = noun.charAt(0).toUpperCase() + noun.slice(1)
  // Join lobby words
  var lobbyName = adjective + ' ' + noun;
  return lobbyName;
};

lobbies.AddLobby = function() {
  var roomname = generateLobbyName();
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

