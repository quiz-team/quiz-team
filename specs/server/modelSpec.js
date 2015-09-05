var expect = require('chai').expect;
var lobbyMaker = require('../../server/models/lobby.js')();
var lobbies = require('../../server/collections/lobbies.js');

xdescribe('server/models/game.js', function() {
  describe('Helper functions', function() {
    it('Should generate unique ids for each question', function() {
      expect(false).to.be.true;
    });
    it('Should shuffle the question data', function() {
      expect(false).to.be.true;
    });
    it('Should load correct answers for each round', function() {
      expect(false).to.be.true;
    });
  });
  describe('Players', function() {
    it('Should add a players to the game', function() {
      expect(false).to.be.true;
    });
  });
  describe('Rounds', function() {
    it('Should update round score at the end of a round', function() {
      expect(false).to.be.true;
    });
    it('Should reset the current round after a round has ended', function() {
      expect(false).to.be.true;
    })
  });
  describe('Game Data', function() {
    it('Should create game data', function() {
      expect(false).to.be.true;
    });
    it('Should create create timer Data', function() {
      expect(false).to.be.true;
    });
  });
});

describe('server/models/lobby.js', function() {
  describe('Add and remove players', function() {
    beforeEach(function() {
      lobbyMaker.players = [];
    })
    it('Should add a player to the lobby', function() {
      lobbyMaker.addPlayer(1);
      expect(lobbyMaker.players.length).to.equal(1);
    });
    it('Should remove a player from the lobby', function() {
      lobbyMaker.addPlayer(1);
      lobbyMaker.removePlayer(1);
      expect(lobbyMaker.players.length).to.equal(0);
    });
  });
  describe('finding players in the lobby', function() {
    beforeEach(function() {
      lobbyMaker.players = [];
    })
    it('Should return a list of all players in the lobby', function() {
      lobbyMaker.addPlayer(1);
      lobbyMaker.addPlayer(2);
      expect(lobbyMaker.getPlayers().length).to.equal(2)
    });
    it('Should find a player by id and return it', function() {
      lobbyMaker.addPlayer(1);
      lobbyMaker.addPlayer(2);
      expect(lobbyMaker.getPlayerById(1).id).to.equal(1);
      expect(lobbyMaker.getPlayerById(2).id).to.equal(2);
    });
  });
});

xdescribe('server/models/players.js', function() {
  describe('Player attributes', function() {
    // fill this out more
    it('Should have a number', function() {
      expect(false).to.be.true;
    });
    it('should have a lobbyId', function() {
      expect(false).to.be.true;
    });
    it('should have a list of answers', function() {
      expect(false).to.be.true;
    });
    it('should have an id', function() {
      expect(false).to.be.true;
    });
  });
});
