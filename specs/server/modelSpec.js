var expect = require('chai').expect;
var lobbyMaker = require('../../server/models/lobby.js')();
// var gameMaker = require('../../server/models/game.js')();
var lobbies = require('../../server/collections/lobbies.js');
var playerMaker = require('../../server/models/player.js');
var players = require('../../server/collections/players.js');

xdescribe('server/models/game.js', function() {
  describe('Helper functions', function() {
    xit('Should generate unique ids for each question', function() {
      expect(false).to.be.true;
    });
    xit('Should shuffle the question data', function() {
      expect(false).to.be.true;
    });
    xit('Should load correct answers for each round', function() {
      expect(false).to.be.true;
    });
  });
  describe('Players', function() {
    it('Should add a players to the game', function() {
      gameMaker.addPlayer(1);
      expect(gameMaker.players.length).to.equal(1);
    });
  });
  describe('Rounds', function() {
    xit('Should update round score at the end of a round', function() {
      expect(false).to.be.true;
    });
    xit('Should reset the current round after a round has ended', function() {
      expect(false).to.be.true;
    })
  });
  describe('Game Data', function() {
    it('Should create game data', function() {
      gameMaker.loadGameData(1);
    });
    xit('Should create create timer Data', function() {
      expect(false).to.be.true;
    });
  });
});

describe('server/models/lobby.js', function() {
  beforeEach(function() {
    // clear all players
    for (var player in players) {
      delete players[player];
    }
    // have two players
    players['1'] = playerMaker('1');
    players['2'] = playerMaker('2');
    lobbyMaker.players = [];
  });

  describe('Add and remove players', function() {
    it('Should add a player to the lobby', function() {
      lobbyMaker.addPlayer('1');
      expect(lobbyMaker.players.length).to.equal(1);
    });
    it('Should remove a player from the lobby', function() {
      lobbyMaker.addPlayer('1');
      lobbyMaker.removePlayer('1');
      expect(lobbyMaker.players.length).to.equal(0);
    });
  });

  describe('finding players in the lobby', function() {
    beforeEach(function() {
      lobbyMaker.players = [];
    })
    it('Should return a list of all players in the lobby', function() {
      lobbyMaker.addPlayer('1');
      lobbyMaker.addPlayer('2');
      expect(lobbyMaker.getPlayers().length).to.equal(2);
    });
    it('Should find a player by id and return it', function() {
      lobbyMaker.addPlayer('1');
      lobbyMaker.addPlayer('2');
      expect(lobbyMaker.getPlayerById('1').id).to.equal('1');
      expect(lobbyMaker.getPlayerById('2').id).to.equal('2');
    });
  });
});

xdescribe('server/models/players.js', function() {
  describe('Player attributes', function() {
    // fill this out more
    xit('Should have a number', function() {
      expect(false).to.be.true;
    });
    xit('should have a lobbyId', function() {
      expect(false).to.be.true;
    });
    xit('should have a list of answers', function() {
      expect(false).to.be.true;
    });
    xit('should have an id', function() {
      expect(false).to.be.true;
    });
  });
});
