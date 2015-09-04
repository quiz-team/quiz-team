describe('server/sockets/gameSockets.js', function() {
  describe('enteredGame', function() {
    it('Should create a new game', function() {
      expect(false).to.be.true;
    })
    it('Should add players to the game', function() {
      expect(false).to.be.true;
    });
    it('Should check to make sure that all players are in the game', function() {
      expect(false).to.be.true;
    })
    it('Should load up game data for the game', function() {
      expect(false).to.be.true;
    });
    it('Should emit "startClock"', function() {
      expect(false).to.be.true;
    });
    it('Should emit "startGame', function() {
      expect(false).to.be.true;
    });
  });
  describe('enteredRound', function() {
    it('Should add players to the round', function() {
      expect(false).to.be.true;
    });
    it('Should check to make sure all players are in the round', function() {
      expect(false).to.be.true;
    })
    it('Should increment the game round', function() {
      expect(false).to.be.true;
    });
    it('Should reset round data', function() {
      expect(false).to.be.true;
    });
    it('Should emit "startRound"', function() {
      expect(false).to.be.true;
    });
    it('Should emit "endRound"', function() {
      expect(false).to.be.true;
    });
    it('Should remove players from the round', function() {
      expect(false).to.be.true;
    });
  });
  describe('enteredGameOver', function() {
    it('Should emit "gameStats"', function() {
      expect(false).to.be.true;
    });
    it('Should destroy the game', function() {
      expect(false).to.be.true;
    });
  });
  describe('playAgain', function() {
    it('Should emit "restartGame"', function() {
      expect(false).to.be.true;
    });
  });
  describe('quitGame', function() {
    it('Should remove the player from the lobby', function() {
      expect(false).to.be.true;
    });
    it('Should emit "updatePlayers"', function() {
      expect(false).to.be.true;
    });
  });
});
describe('server/sockets/socketSpec.js', function() {
  describe('Setup sockets', function() {
    it('Should setup a socket connection with the lobby sockets', function() {
      expect(false).to.be.true;
    });
    it('Should setup a socket connection with the game sockets', function() {
      expect(false).to.be.true;
    });
  });
});
describe('server/sockets/lobbySpec.js', function() {
  describe('createRoom', function() {
    it('Should create a new lobby', function() {
      expect(false).to.be.true;
    });
    it('Should add the creator to the lobby', function() {
      expect(false).to.be.true;
    });
    it('Should emit "updateLobbies"', function() {
      expect(false).to.be.true;
    });
    it('Should return the lobby data to the client', function() {
      expect(false).to.be.true;
    });
  });
  describe('joinRoom', function() {
    it('Should add a player to the selected lobby', function() {
      expect(false).to.be.true;
    });
    it('Should return the lobby data to the client', function() {
      expect(false).to.be.true;
    });
  });
  describe('enteredSelectionRoom', function() {
    it('Should return a list of lobbies to the player', function() {
      expect(false).to.be.true;
    });
  });
  describe('enteredLobby', function() {
    it('Should emit "updatePlayers"', function() {
      expect(false).to.be.true;
    });
  });
  describe('leaveLobby', function() {
    it('Should remove the player from the lobby object', function() {
      expect(false).to.be.true;
    });
    it('Should emit "updatePlayers"', function() {
      expect(false).to.be.true;
    });
    it('Should remove the lobby from the list of lobbies if it is empty', function() {
      expect(false).to.be.true;
    });
    it('Should emit "updateLobbies"', function() {
      expect(false).to.be.true;
    });
  });
  describe('disconnect', function() {
    it('Should remove the player from the lobby', function() {
      expect(false).to.be.true;
    });
    it('Should emit "updatePlayers"', function() {
      expect(false).to.be.true;
    });
    it('Should remove the player from the lobby', function() {
      expect(false).to.be.true;
    });
    it('Should remove the lobby from the list of lobbies if it is empty', function() {
      expect(false).to.be.true;
    });
    it('Should emit "updateLobbies"', function() {
      expect(false).to.be.true;
    });
  });
  describe('readyOn', function() {
    it('Should should set player\'s ready status to true', function() {
      expect(false).to.be.true;
    });
    it('Should emit "updatePlayers" whenever a player signals that they are ready', function() {
      expect(false).to.be.true;
    });
    it('Should emit "startGame", when all players are ready', function() {
      expect(false).to.be.true;
    });
  });
  describe('readyOff', function() {
    it('Should should set player\'s ready status to false', function() {
      expect(false).to.be.true;
    });
    it('Should emit "updatePlayers" whenever a player stops signalling that they are ready', function() {
      expect(false).to.be.true;
    });
  });
});
