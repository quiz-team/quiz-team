var expect = require('chai').expect;
var _ = require('underscore');
var games = require('../../server/collections/games.js');
var lobbies = require('../../server/collections/lobbies.js');

describe("server/collections/games.js", function() {
  describe('Game creation and Finding a game', function() {
    beforeEach(function() {
      var all = games.activeGames;
      _.each(all, function(ind) {
        games.destroyGame(ind.id);
      })
    })
    it('Should create a new game if one is not already available for a specific lobby', function() {
      games.createGame(1, [{}, {}]);
      expect(games.activeGames[1]).to.be.an.instanceof(Object);
    });
    it('Should should find the specific game created for the lobby, if one has been created', function() {
      games.createGame(1, [{}, {}]);
      expect(games.findGame(1)).to.be.an.instanceof(Object);
    });
  });
  describe('Delete an ended game', function() {
    it('Should delete a game when the game is over', function() {
      games.createGame(1, [{}, {}]);
      games.destroyGame(1);
      expect(games.activeGames[1]).to.be.undefined;
    });
  });
});
describe('server/collections/lobbies.js', function() {
  beforeEach(function() {
    var all = lobbies.getAllLobbies();
    all.forEach(function(ind) {
      lobbies.removeLobby(ind.id);
    })
  })
  describe('Creating and Getting lobbies', function() {
    it('Should create a new lobby object and add it to the list of available lobbies', function() {
      lobbies.addLobby();
      expect(lobbies.getAllLobbies().length).to.equal(1);
    });
    it('Should remove a lobby from the list of active lobbies', function() {
      lobbies.addLobby();
      var all = lobbies.getAllLobbies();
      all.forEach(function(ind) {
        lobbies.removeLobby(ind.id);
      })
      expect(lobbies.getAllLobbies().length).to.equal(0);
    })
  });
  describe('Retrieveing lobbies', function() {
    beforeEach(function() {
      var all = lobbies.getAllLobbies();
      all.forEach(function(ind) {
        lobbies.removeLobby(ind.id);
      })
    })
    it('Should return a list of all active lobies', function() {
      lobbies.addLobby();
      lobbies.addLobby();
      expect(lobbies.getAllLobbies().length).to.equal(2);
    });
    it('Should return a specific active lobby', function() {
      lobbies.addLobby();
      lobbies.addLobby();
      var all = lobbies.getAllLobbies();
      var first = all[0].id;
      var second = all[1].id;
      expect(lobbies.getLobby(first)).to.be.an('object');
      expect(lobbies.getLobby(second)).to.be.an('object');
    });
  });
});
xdescribe('server/collections/players.js', function() {
  describe('players', function() {
    it('Should contain player objects if any have been added', function() {
      expect(false).to.be.true;
    });
  });
});
