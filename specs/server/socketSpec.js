// remember to use 'done' for async testing
var chai      = require('chai');
var sinon     = require('sinon');
var expect    = chai.expect;
var should    = chai.should();
var sinonChai = require("sinon-chai");
var io        = require('socket.io-client');
var mongoose  = require('mongoose');
chai.use(sinonChai);

var lobbies = require('../../server/collections/lobbies.js');
var games = require('../../server/collections/games.js');
var players = require('../../server/collections/players.js');
var playerMaker = require('../../server/models/player.js');

var app = require('express');
var http = require('http');

describe('Socket Tests', function() {
  var testId = 'playerTestSessionId';
  var testId2 = 'playerTestSessionId2';
  var testId3 = 'playerTestSessionId3';
  var server,
      options = {
        transports: ['websocket'],
        'force new connection': true,
        query: 'sessionId=' + testId
      };
  var options2 = {
        transports: ['websocket'],
        'force new connection': true,
        query: 'sessionId=' + testId2
      };
  var options3 = {
        transports: ['websocket'],
        'force new connection': true,
        query: 'sessionId=' + testId3
      };
  var client;
  var client2;
  var client3;
  var ioServer;

  before(function() {
    
    // test function to clear out lobbies collection
    lobbies._clear = function() {
      // clear all lobbies from lobby
      var allLobbies = lobbies.getAllLobbies();
      allLobbies.forEach(function(lobby) {
        lobbies.removeLobby(lobby.id);
      });
    };
  });
 
  beforeEach(function(done) {
    // connect server
    server = http.Server(app);
    //start server
    server.listen(9090);
    ioServer = require('./../../server/sockets/mainSockets.js')(server);

    // server = require('../../server/server').listen(9090);
    client = io.connect('http://localhost:9090', options);
    
    // clear out players
    for (var player in players) {
      delete players[player];
    }
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
          client.emit('createRoom', null, function() {});

          client.once('updateLobbies', function(lobbies) {
            expect(lobbies .length).to.equal(1);
            done();
          });

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

    describe('joinRoom', function() {
      var lobby;
      var lobbyId;
      var numLobbies;

      beforeEach(function() {
        // check for empty lobby
        if (lobbies.getAllLobbies().length > 0) {
          throw new Error('Lobbies object is not empty before testing');
        }

        // create a lobby and add it lobbies
        lobby = lobbies.addLobby();

        lobbyId = lobby.id;
        numLobbies = lobbies.getAllLobbies().length;
      });

      afterEach(function() {
        // clear lobbies after each test
        lobbies._clear();
      });

      it ('should update client\'s lobbies when a player joins a room', function(done) {
        client.once('connect', function() {
          client.emit('joinRoom', lobbyId, function() {});

          client.once('updateLobbies', function(lobbies) {
            // should not add any more lobbies
            expect(lobbies.length).to.equal(numLobbies);
            done();
          });

        });
      });

      it('should add a player to the selected lobby', function(done) {
        client.once('connect', function() {
          client.emit('joinRoom', lobbyId, function() {});

          client.once('updateLobbies', function(lobbies) {
            expect(lobby.getPlayers().length).to.equal(1);
            done();
          });
        });
      });

      it('Should return the lobby data to the client', function(done) {
        client.once('connect', function() {
          client.emit('joinRoom', lobbyId, function(returnedLobby) {
            expect(returnedLobby).to.be.an('object');
            done();
          });
        });
      });

      it('should have updated data when lobby is returned to the client', function(done) {
        client.once('connect', function() {
          client.emit('joinRoom', lobbyId, function(returnedLobby) {
            //updated length to client
            expect(returnedLobby.players.length).to.equal(1);
            expect(returnedLobby.id).to.equal(lobbyId);
            done();
          });
        });
      });

    });


    describe('enteredSelectionRoom', function() {
      var lobby;
      var randomNum;
      var lobbyIds;

      beforeEach(function() {
        // clear lobbies after 
        lobbies._clear();
      });

      it('Should return a list of all lobbies to the client', function(done) {
        // setup for test
        lobbyIds = [];
        lobbies = require('../../server/collections/lobbies.js');
        expect(lobbies.getAllLobbies().length).to.equal(0);
        // random number of rooms between 50 adnd 100
        randomNum = Math.floor(Math.random() * (100 - 50) + 50);
        
        for (var i=0; i< randomNum; i++) {
          lobby = lobbies.addLobby();
          lobbyIds.push(lobby.id);
        }
        expect(lobbyIds.length).to.equal(randomNum);

        client.once('connect', function() {
          client.emit('enteredSelectionRoom', null, function(returnedLobbies) {
            expect(returnedLobbies.length).to.equal(randomNum);

            for (var i=0; i<lobbyIds.length; i++) {
              expect(lobbies.getLobby(lobbyIds[i])).to.not.be.undefined;
            }
            done();
          });
        });
      });

    });


    describe('enteredLobby', function() {
      var lobby;
      var lobbyId;

      beforeEach(function() {
        // clear lobbies
        lobbies._clear();
        // create a lobby and add it lobbies
        lobby = lobbies.addLobby();
        lobbyId = lobby.id;
      });

      after(function() {
        // clear lobbies
        lobbies._clear();
      });

      it('Should emit "updatePlayers" to client in the lobby', function(done) {
        client.once('connect', function() {
          // have client join lobby
          client.emit('joinRoom', lobbyId, function() {
            client.emit('enteredLobby', lobbyId, function() {});
          });

          client.once('updatePlayers', function() {
            // will timeout if updatePlayers is not received
            done();
          });
        });
      });

      it('Should emit "updatePlayers" to clients in the lobby with players', function(done) {
        client.once('connect', function() {
          // have client join lobby
          client.emit('joinRoom', lobbyId, function() {
            // add some other players to the lobby
            players['player2'] = playerMaker('player2');
            players['player3'] = playerMaker('player3');
            players['player4'] = playerMaker('player4');
            lobby.addPlayer('player2');
            lobby.addPlayer('player3');
            lobby.addPlayer('player4');

            client.emit('enteredLobby', lobbyId, function() {});
          });

          // server emits this event on 'enteredLobby' from client
          client.once('updatePlayers', function(players) {
            // check if players is an array
            expect(Array.isArray(players)).to.be.true;
            expect(players.length).to.equal(4);
            done();
          });
        });
      });

      it('should pass a list of players to the client after entering the lobby (1 player)', function(done) {
        client.once('connect', function() {
          // have client join lobby
          client.emit('joinRoom', lobbyId, function() {
            client.emit('enteredLobby', lobbyId, function(players) {
              // check if players is an array
              expect(Array.isArray(players)).to.be.true;
              expect(players.length).to.equal(1);
              done();
            });
          });
        });
      });

      it('should pass a list of players to the client after entering the lobby (multiple player)', function(done) {
        client.once('connect', function() {
          // have client join lobby
          client.emit('joinRoom', lobbyId, function() {
            // add some other players to the lobby
            players['player2'] = playerMaker('player2');
            players['player3'] = playerMaker('player3');
            players['player4'] = playerMaker('player4');
            lobby.addPlayer('player2');
            lobby.addPlayer('player3');
            lobby.addPlayer('player4');

            client.emit('enteredLobby', lobbyId, function(players) {
              // check if players is an array
              expect(Array.isArray(players)).to.be.true;
              expect(players.length).to.equal(4);
              done();
            });
          });
        });
      });

    });

    describe('leaveLobby', function() {
      beforeEach(function() {
        lobbies._clear();
        lobby = lobbies.addLobby();
      });

      after(function() {
        lobbies._clear();
      });

      it('Should emit "updateLobbies"', function(done) {
        players['testid'] = playerMaker();
        lobby.addPlayer('testid');
        client.once('connect', function() {
          client.emit('leaveLobby', lobby.id);
        });

        client.once('updateLobbies', function() {
          done();
        });
      });

      it('Should emit "updatePlayers"', function(done) {
        client.once('connect', function() {
          // client joins lobby
          client.emit('joinRoom', lobby.id, function() {
            // player is added to lobby on 'joinRoom'
            client.emit('leaveLobby', lobby.id);
            // server fires 'updatePlayers' after receiving leaveLobby
            client.once('updatePlayers', function() {
              done();
            });
          });
        });
      });

      it('Should remove the player from the lobby object', function(done) {
        client.once('connect', function() {
          // client joins lobby
          client.emit('joinRoom', lobby.id, function() {
            // player is added to lobby on 'joinRoom'
            expect(lobby.getPlayers().length).to.equal(1);
            client.emit('leaveLobby', lobby.id);
            // server fires 'updateLobbies' after receiving leaveLobby
            client.once('updateLobbies', function() {
              expect(lobby.getPlayers().length).to.equal(0);
              done();
            });
          });
        });
      });

      it('Should remove the lobby from the list of lobbies if it is empty', function(done) {
        expect(lobbies.getAllLobbies().length).to.equal(1);
        client.once('connect', function() {
          // client joins lobby
          client.emit('joinRoom', lobby.id, function() {
            // player is added to lobby on 'joinRoom'
            client.emit('leaveLobby', lobby.id);
            // server fires 'updateLobbies' after receiving leaveLobby
            client.once('updateLobbies', function(allLobbies) {
              expect(allLobbies.length).to.equal(0);
              done();
            });
          });
        });
      });
    });

    describe('disconnect', function() {
      beforeEach(function() {
        lobbies._clear();
        lobby = lobbies.addLobby();
      });

      afterEach(function() {
        client2.disconnect();
        if (client3) {
          client3.disconnect();
        }
      });

      after(function() {
        lobbies._clear();
      });

      it('Should emit "updatePlayers" to other players in the lobby', function(done) {
        client.once('connect', function() {
          // add client 1 to the room
          client.emit('joinRoom', lobby.id, function(returnedLobby) {});
          // connect 2nd client once 1st is connected
          client2 = io.connect('http://localhost:9090', options2);
          client2.once('connect', function() {
            client2.emit('joinRoom', lobby.id, function(receivedLobby) {
              // disconnect the first client
              client.disconnect();
            });
          }); // end client2 once connect

          // server emits updatePlayers when a client disconnects
          client2.once('updatePlayers', function(returnedPlayers) {
            done();
          });
        }); // end client once connect
      });

      it('Should remove the player from the lobby', function(done) {
        client.once('connect', function() {
          // connect 2nd client once 1st is connect
          client2 = io.connect('http://localhost:9090', options2);
          
          client.emit('joinRoom', lobby.id, function(returnedLobby) {
            // check returned lobby for current connected client
            expect(returnedLobby.players[0].socketId === client.id);
          });

          client2.once('connect', function() {
            client2.emit('joinRoom', lobby.id, function(receivedLobby) {
              // disconnect the first client
              client.disconnect();
            });
          }); // end client2 once connect

          // server emits updatePlayers when a client disconnects
          client2.once('updatePlayers', function(returnedPlayers) {
            expect(returnedPlayers.length).to.equal(1);
            // check client2 is still in returned lobby
            expect(returnedPlayers[0].socketId).to.equal(client2.id);
            done();
          });
        }); // end client once connect
      });

      it('Should remove the lobby from the list of lobbies if it is empty', function(done) {
        client.once('connect', function() {
          client.emit('joinRoom', lobby.id, function() {});
          // connect 2nd client once 1st is connect
          client2 = io.connect('http://localhost:9090', options2);

          client2.once('connect', function() {
            client2.emit('joinRoom', lobby.id, function() {
              // connect 3rd client once 1st is connect
              client3 = io.connect('http://localhost:9090', options3);
              client3.once('connect', function() {
                client.disconnect();
                client2.disconnect();
              }); // end client3 once connect

              client3.once('updateLobbies', function(returnedLobbies) {
                expect(returnedLobbies.length).to.equal(0);
                done();
              });
            });
          }); // end client2 once connect
        }); // end client once connect
      });
    });

    describe('readyOn', function() {

      before(function() {
        // fake some game data
        var fakeGame = {
          gameData: null
        };
        // stub game so that a game isnt actually created
        sinon.stub(games, 'createGame', function(gameId, players, callback) {
          callback(fakeGame);
        });
      });

      beforeEach(function(done) {
        games.createGame.reset();
        lobbies._clear();
        lobby = lobbies.addLobby();

        // connect two clients
        client.once('connect', function() {
          client2 = io.connect('http://localhost:9090', options2);
          client2.once('connect', function() {
            done();
          });
        });
      });

      afterEach(function() {
        games.createGame.reset();
        client2.disconnect();
      });

      after(function() {
        // remove stub
        games.createGame.restore();
        lobbies._clear();
      });

      it('Should should set player\'s ready status to true', function(done) {
        // client 1 joins room
        client.emit('joinRoom', lobby.id, function() {
          client2.emit('joinRoom', lobby.id, function() {

            // client 2 will receive a broadcast of players
            client2.once('updatePlayers', function(allPlayers) {
              // lobby size should be two
              expect(allPlayers.length).to.equal(2);

              // client 1 should be 'ready', client 2 should not be
              expect(allPlayers[0].ready).to.be.true;
              expect(allPlayers[1].ready).to.be.false;
              done();
            });

            // emit ready on from 1st client
            client.emit('readyOn', lobby.id);
          });
        });              
      });

      it('Should emit "goToStartScreen", when all players are ready', function(done) {
        // times out if test fails
        var expectedCount = 0;
        var checkDone = function() {
          if (expectedCount === 2) {
            done();
          }
        };
        // client 1 joins room
        client.emit('joinRoom', lobby.id, function() {
          client2.emit('joinRoom', lobby.id, function() {
            client.once('goToStartScreen', function(gameData) {
              expectedCount++;
              checkDone();
            });
            client2.once('goToStartScreen', function(gameData) {
              expectedCount++;
              checkDone();
            });

            // emit ready on from clients
            client.emit('readyOn', lobby.id);
            client2.emit('readyOn', lobby.id);
          });
        });
      });
    });
    describe('readyOff', function() {

      before(function() {
        // fake some game data
        var fakeGame = {
          gameData: null
        };
        // stub game so that a game isnt actually created
        sinon.stub(games, 'createGame', function(gameId, players, callback) {
          callback(fakeGame);
        });
      });

      beforeEach(function(done) {
        lobbies._clear();
        lobby = lobbies.addLobby();

        // connect two clients
        client.once('connect', function() {
          client2 = io.connect('http://localhost:9090', options2);
          client2.once('connect', function() {
            done();
          });
        });
      });

      afterEach(function() {
        client2.disconnect();
      });

      after(function() {
        // remove stub
        games.createGame.restore();
        lobbies._clear();
      });

      it('Should should set player\'s ready status to false', function(done) {
        /**
         * client and client2 connect, both join same room, and client emits
         * readyOn followed by readyOff
         */
        // client 1 joins room
        client.emit('joinRoom', lobby.id, function() {
          client2.emit('joinRoom', lobby.id, function() {
            // client 2 will receive a broadcast of players
            client2.once('updatePlayers', function() {
              // after player 1 emits readyOn and everyone is updated, 
              // player 1 should emit readyOff
              client.emit('readyOff', lobby.id);
              client2.once('updatePlayers', function(allPlayers) {
                expect(allPlayers[0].ready).to.be.false;
                expect(allPlayers[1].ready).to.be.false;
                done();
              });
            });
            // emit ready on from 1st client
            client.emit('readyOn', lobby.id);
          });
        });              
      });

      it('Should emit "updatePlayers" whenever a player stops signalling that they are ready', function(done) {
        /**
         * client and client2 connect, both join same room, and client emits
         * readyOn followed by readyOff
         */
        // client 1 joins room
        client.emit('joinRoom', lobby.id, function() {
          client2.emit('joinRoom', lobby.id, function() {
            // client 2 will receive a broadcast of players
            client2.once('updatePlayers', function() {
              // after player 1 emits readyOn and everyone is updated, 
              // player 1 should emit readyOff
              client.emit('readyOff', lobby.id);
              client2.once('updatePlayers', function(allPlayers) {
                expect(allPlayers[0].ready).to.be.false;
                expect(allPlayers[1].ready).to.be.false;
                done();
              });
            });
            // emit ready on from 1st client
            client.emit('readyOn', lobby.id);
          });
        });              
      });
    }); // end describe readyOff
  }); // 

});
