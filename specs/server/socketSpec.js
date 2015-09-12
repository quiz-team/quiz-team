var expect = require('chai').expect;
var should = require('chai').should();
var io = require('socket.io-client');
var mongoose = require('mongoose');

var games = require('../../server/collections/games.js');
var players = require('../../server/collections/players.js');
var playerMaker = require('../../server/models/player.js');

describe('Socket Tests', function() {
  var testId = 'test';
  var server,
      options = {
        transports: ['websocket'],
        'force new connection': true,
        sessionId: testId
      };
  var client;
 
  beforeEach(function(done) {
    //start server
    server = require('../../server/server').listen(9090);
    client = io.connect('http://localhost:9090', options);

    done();
  });

  afterEach(function(done) {
    //close mongo connections
    mongoose.disconnect(function() {
      client.disconnect();
      server.close(function() {
        done();
      });
    });
  });

  after(function(done){
    mongoose.disconnect(function() {
      console.log('All Mongo Connections disconnected');
      client.disconnect();
      server.close(function() {
        console.log('close connections to server');
        done();
      });
      // console.log('>>>>>>>>>>', client);
    });
  });
  // it('echoes message', function(done) {
  //   var client = io.connect('http://localhost:9090', options);

  //   client.once('connect', function() {
  //     client.once('echo', function(message) {
  //       message.should.equal('Hello World');

  //       client.disconnect();
  //       done();
  //     });

  //     client.emit('echo', 'Hello World');
  //   });
  // });

  xdescribe('server/sockets/gameSockets.js', function() {
    describe('enteredGame', function() {
      xit('Should create a new game', function() {
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
    xdescribe('enteredRound', function() {
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
    xdescribe('enteredGameOver', function() {
      it('Should emit "gameStats"', function() {
        expect(false).to.be.true;
      });
      it('Should destroy the game', function() {
        expect(false).to.be.true;
      });
    });
    xdescribe('playAgain', function() {
      it('Should emit "restartGame"', function() {
        expect(false).to.be.true;
      });
    });
    xdescribe('quitGame', function() {
      it('Should remove the player from the lobby', function() {
        expect(false).to.be.true;
      });
      it('Should emit "updatePlayers"', function() {
        expect(false).to.be.true;
      });
    });
  });
  xdescribe('server/sockets/socketSpec.js', function() {
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

      it('Should create a new lobby', function(done) {
        client.once('connect', function() {
          client.once('updateLobbies', function(lobbies) {
            expect(lobbies.length).to.equal(1);
            done();
          });

          client.emit('createRoom', null, function() {});
        });
      });

      it('Should respond to the client with the created lobby', function(done) {
        client.once('connect', function() {
          client.emit('createRoom', null, function(lobby) {
            expect(lobby).to.be.an('object');
            done();
          });
        });
      });

      xit('Should add the creator to the lobby', function() {
        expect(false).to.be.true;
      });
      xit('Should emit "updateLobbies"', function() {
        expect(false).to.be.true;
      });
      xit('Should return the lobby data to the client', function() {
        expect(false).to.be.true;
      });
    });
    xdescribe('joinRoom', function() {
      it('Should add a player to the selected lobby', function() {
        expect(false).to.be.true;
      });
      it('Should return the lobby data to the client', function() {
        expect(false).to.be.true;
      });
    });
    xdescribe('enteredSelectionRoom', function() {
      it('Should return a list of lobbies to the player', function() {
        expect(false).to.be.true;
      });
    });
    xdescribe('enteredLobby', function() {
      it('Should emit "updatePlayers"', function() {
        expect(false).to.be.true;
      });
    });
    xdescribe('leaveLobby', function() {
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
    xdescribe('disconnect', function() {
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
    xdescribe('readyOn', function() {
      it('Should should set player\'s ready status to true', function() {
        expect(false).to.be.true;
      });
      it('Should emit "updatePlayers" whenever a player signals that they are ready', function() {
        expect(false).to.be.true;
      });
      it('Should emit "startGame", when all players are ready', function() {
        expect(false).to.be.true;
      });
      it('Should create a new game when all players in a lobby have pressed "ready"', function() {
        expect(false.to.be.true);
      });
    });
    xdescribe('readyOff', function() {
      it('Should should set player\'s ready status to false', function() {
        expect(false).to.be.true;
      });
      it('Should emit "updatePlayers" whenever a player stops signalling that they are ready', function() {
        expect(false).to.be.true;
      });
    });
  });

});
