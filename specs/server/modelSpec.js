var expect = require('chai').expect;

var config = require('../../server/utils/gameConfig.js');
var lobbies = require('../../server/collections/lobbies.js');
var players = require('../../server/collections/players.js');
var games = require('../../server/collections/games.js');

var lobbyMaker = require('../../server/models/lobby.js');
var playerMaker = require('../../server/models/player.js');
var gameMaker = require('../../server/models/game.js');

describe('server/models/player.js', function() {
  describe('Player Class', function() {
    // Instantiate a player class
    var player = playerMaker('game_player')   

    it('should be an object', function() {
      expect( player ).to.be.an.object;
    });

    it('should have a "number" property', function() {
      expect( player.hasOwnProperty('number') ).to.be.true;
    });

    it('should have a "socketId" property', function() {
      expect( player.hasOwnProperty('socketId') ).to.be.true;
    });

    it('should have a "lobbyId" property', function() {
      expect( player.hasOwnProperty('lobbyId') ).to.be.true;
    });

    it('should have a "ready" property that is initialized to false', function() {
      expect( player.hasOwnProperty('ready') ).to.be.true;
      expect( player.ready ).to.equal.false;
    });

    it('should have a "recentlyPlayedQuizzes" property that is initialized as an array', function() {
      expect( player.hasOwnProperty('recentlyPlayedQuizzes') ).to.be.true;
      expect( player.recentlyPlayedQuizzes ).to.be.an.array;
    });

    it('should have an "id" property that is defined', function() {
      expect( player.hasOwnProperty('id') ).to.be.true;
      expect( player.id ).to.be.defined;
    });
  });

  describe('Helper Methods', function(){
    var player;

    beforeEach(function(){
      player = playerMaker('game_player')
      player.recentlyPlayedQuizzes = [];
    });
    
    describe('setSocket(socket) method', function(){
      it('should assign socket id to player socketId', function(){
        var socket = { id: 'abc' };
        player.setSocket(socket);
        expect( player.socketId ).to.equal( socket.id );
      });
    });

    describe('savePlayedQuiz(quizId) method', function(){
      it('should save quiz ID of recently played quiz to player', function(){
        player.savePlayedQuiz('quiz1');
        expect( player.recentlyPlayedQuizzes[0] ).to.equal( 'quiz1' );
        expect( player.recentlyPlayedQuizzes.length ).to.equal( 1 );
      });

      it('should save previous three quizzes', function(){
        player.savePlayedQuiz('quiz1');
        player.savePlayedQuiz('quiz2');
        player.savePlayedQuiz('quiz3');

        expect( player.recentlyPlayedQuizzes.length ).to.equal( 3 );
        expect( player.recentlyPlayedQuizzes[0] ).to.equal( 'quiz1' );
        expect( player.recentlyPlayedQuizzes[1] ).to.equal( 'quiz2' );
        expect( player.recentlyPlayedQuizzes[2] ).to.equal( 'quiz3' );

        player.savePlayedQuiz('quiz4');
        expect( player.recentlyPlayedQuizzes.length ).to.equal( 3 );
        expect( player.recentlyPlayedQuizzes[0] ).to.equal( 'quiz2' );
        expect( player.recentlyPlayedQuizzes[1] ).to.equal( 'quiz3' );
        expect( player.recentlyPlayedQuizzes[2] ).to.equal( 'quiz4' );
      });
    });
  });
});

describe('server/models/lobby.js', function() {
  // Instantiate a lobby class by calling .addLobby() on lobbies collection
  var lobby = lobbies.addLobby();

  describe('Lobby Class', function() {
    
    it('should be an object', function() {
      expect( lobby ).to.be.an.object;
    });

    it('should have an "id" property', function() {
      expect( lobby.hasOwnProperty('id') ).to.be.true;
    });

    it('should have a "roomname" property that is defined', function() {
      expect( lobby.hasOwnProperty('roomname') ).to.be.true;
      expect( lobby.roomname ).to.be.defined;
    });

    it('should have a "players" property that is initialized as an array', function() {
      expect( lobby.hasOwnProperty('players') ).to.be.true;
      expect( lobby.players ).to.be.an.array;
    });

    it('should have a "full" property that is initialized to false', function() {
      expect( lobby.hasOwnProperty('full') ).to.be.true;
      expect( lobby.full ).to.equal.false;
    });

    it('should have an "inGame" property that is initialized to false', function() {
      expect( lobby.hasOwnProperty('inGame') ).to.be.true;
      expect( lobby.inGame ).to.equal.false;
    });

    it('should have an "addPlayer" method', function() {
      expect( lobby.hasOwnProperty('addPlayer') ).to.be.true;
      expect( lobby.addPlayer ).to.be.a.function;
    });

    it('should have an "removePlayer" method', function() {
      expect( lobby.hasOwnProperty('removePlayer') ).to.be.true;
      expect( lobby.removePlayer ).to.be.a.function;
    });

    it('should have an "getPlayerById" method', function() {
      expect( lobby.hasOwnProperty('getPlayerById') ).to.be.true;
      expect( lobby.getPlayerById ).to.be.a.function;
    });

    it('should have an "getPlayers" method', function() {
      expect( lobby.hasOwnProperty('getPlayers') ).to.be.true;
      expect( lobby.getPlayers ).to.be.a.function;
    });
  });

  describe('Helper Methods', function() {
    var player1, player2, player3, player4, player5;

    beforeEach(function(){
      for (var player in players){
        lobby.removePlayer(player);
        delete players[player];
      }

      // Instantiate player classes
      player1 = playerMaker('abc');    
      player2 = playerMaker('def');
      player3 = playerMaker('ghi');
      player4 = playerMaker('jkl');
      player5 = playerMaker('mno');
      
      // Add players to collection
      // Normally, this is done via middleware to store session info
      players['abc'] = player1;
      players['def'] = player2;
      players['ghi'] = player3;
      players['jkl'] = player4;
      players['mno'] = player5;
    });

    describe('addPlayer() method', function(){
      it('should add a player to the lobby', function() {
        lobby.addPlayer(player1.id);
        expect( lobby.players.length ).to.equal(1);

        lobby.addPlayer(player2.id);
        lobby.addPlayer(player3.id);      
        lobby.addPlayer(player4.id);
        expect( lobby.players.length ).to.equal(4);
      });

      it('should not add player if lobby is full (' + config.MAX_PLAYERS + ')', function() {
        lobby.addPlayer(player1.id);
        lobby.addPlayer(player2.id);
        lobby.addPlayer(player3.id);      
        lobby.addPlayer(player4.id);
        expect( lobby.players.length ).to.equal(4);

        lobby.addPlayer(player5.id);
        expect( lobby.players.length ).to.equal(4);
      });
    });

    describe('removePlayer(id) method', function(){
      it('should remove a player from the lobby', function() {
        lobby.addPlayer(player1.id);
        lobby.addPlayer(player2.id);
        lobby.addPlayer(player3.id);      
        lobby.addPlayer(player4.id);

        lobby.removePlayer(player4.id);
        expect( lobby.players.length ).to.equal(3);

        lobby.removePlayer(player3.id);
        lobby.removePlayer(player2.id);
        lobby.removePlayer(player1.id);
        expect( lobby.players.length ).to.equal(0);
      });
    });

    describe('getPlayers() method', function(){
      it('should return a list of all players in lobby', function() {
        lobby.addPlayer(player1.id);
        expect( lobby.getPlayers().length ).to.equal( 1 );
        lobby.addPlayer(player2.id);
        expect( lobby.getPlayers().length ).to.equal( 2 );
      });

      it('should return an array', function() {
        expect( lobby.getPlayers() ).to.be.an.array;
      });
    });

    describe('getPlayerById(id) method', function(){
      it('should find a player by id and return it', function() {
        lobby.addPlayer(player1.id);
        expect( lobby.getPlayerById(player1.id) ).to.be.defined;
        expect( lobby.getPlayerById(player1.id).id ).to.equal( player1.id );

        lobby.addPlayer(player2.id);
        expect( lobby.getPlayerById(player2.id) ).to.be.defined;
        expect( lobby.getPlayerById(player2.id).id ).to.equal( player2.id);
      });

      it('should return a player object', function() {
        expect( lobby.getPlayerById(player1.id) ).to.be.an.object;
      });
    });

  });
});

describe('server/models/game.js', function() {
  // Start game with four players
  var lobby = lobbies.addLobby();

  // Instantiate player classes
  var player1 = playerMaker('abc');    
  var player2 = playerMaker('def');
  var player3 = playerMaker('ghi');
  var player4 = playerMaker('jkl');

  // Add players to collection
  // Normally, this is done via middleware to store session info
  players['abc'] = player1;
  players['def'] = player2;
  players['ghi'] = player3;
  players['jkl'] = player4;

  lobby.addPlayer(player1.id);
  lobby.addPlayer(player2.id);
  lobby.addPlayer(player3.id);
  lobby.addPlayer(player4.id);

  describe('Game Class', function() {

    var allPlayers = lobby.getPlayers();
    var game = gameMaker(lobby.roomname);

    it('should be an object', function() {
      expect( game ).to.be.an.object;
    });

    it('should have a "players" property that is initialized as an array', function() {
      expect( game.hasOwnProperty('players') ).to.be.true;
      expect( game.players ).to.be.an.array;
    });

    it('should have a "id" property that is defined', function() {
      expect( game.hasOwnProperty('id') ).to.be.true;
      expect( game.id ).to.be.defined;
    });

    it('should have a "numRounds" property that is a number', function() {
      expect( game.hasOwnProperty('numRounds') ).to.be.true;
      expect( game.numRounds ).to.be.a.number;
    });

    it('should have a "roundNum" property that is a number', function() {
      expect( game.hasOwnProperty('roundNum') ).to.be.true;
      expect( game.roundNum ).to.be.a.number;
    });

    it('should have a "playersInView" property that is initialized as an array', function() {
      expect( game.hasOwnProperty('playersInView') ).to.be.true;
      expect( game.playersInView ).to.be.an.array;
    });

    it('should have a "allRoundResults" property tht is initialized as an array', function() {
      expect( game.hasOwnProperty('allRoundResults') ).to.be.true;
      expect( game.allRoundResults ).to.be.an.array;
    });

    it('should have a "currentRoundResults" that is initialized as an object', function() {
      expect( game.hasOwnProperty('currentRoundResults') ).to.be.true;
      expect( game.currentRoundResults ).to.be.an.object;
    });

    it('should have a "gameData" property that is an object', function() {
      expect( game.hasOwnProperty('gameData') ).to.be.true;
      expect( game.gameData ).to.be.an.object;
    });

    describe('"gameData" object', function(){

      it('should have a "title" property', function() {
        expect( game.gameData.hasOwnProperty('title') ).to.be.true;
        expect( game.gameData.title ).to.be.a.string;
      });

      it('should have a "description" property', function() {
        expect( game.gameData.hasOwnProperty('description') ).to.be.true;
        expect( game.gameData.description ).to.be.a.string;
      });

      it('should have a "players" property that is initialized as an object', function() {
        expect( game.gameData.hasOwnProperty('players') ).to.be.true;
        expect( game.gameData.players ).to.be.an.object;
      });

      it('should have a "roundAnswers" property that is initialized as an array', function() {
        expect( game.gameData.hasOwnProperty('roundAnswers') ).to.be.true;
        expect( game.gameData.roundAnswers ).to.be.an.array;
      });

      it('should have a "roundAnswerObjects" property that is initialized as an array', function() {
        expect( game.gameData.hasOwnProperty('roundAnswerObjects') ).to.be.true;
        expect( game.gameData.roundAnswerObjects ).to.be.an.array;
      });

      it('should have a "roundQuestions" property that is initialized as an array', function() {
        expect( game.gameData.hasOwnProperty('roundQuestions') ).to.be.true;
        expect( game.gameData.roundQuestions ).to.be.an.array;
      });

      it('should have an "answerMap" property that is initialized as an object', function() {
        expect( game.gameData.hasOwnProperty('answerMap') ).to.be.true;
        expect( game.gameData.answerMap ).to.be.an.object;
      });

      it('should have a "stats" object', function() {
        expect( game.gameData.hasOwnProperty('stats') ).to.be.true;
        expect( game.gameData.stats ).to.be.an.object;
      });

      describe('"stats" object', function(){
        it('should have an "allRoundResults" property that is initialized as an array', function() {
          expect( game.gameData.stats.hasOwnProperty('allRoundResults') ).to.be.true;
          expect( game.gameData.stats.allRoundResults ).to.be.an.array;
        });

        it('should have a "gameEndTotal" property that is a number', function() {
          expect( game.gameData.stats.hasOwnProperty('gameEndTotal') ).to.be.true;
          expect( game.gameData.stats.gameEndTotal ).to.be.a.number;
        });
      });
    });
  });

  describe('Helper Methods', function() {
    var allPlayers, game;

    beforeEach(function(){
      allPlayers = lobby.getPlayers();
      game = gameMaker(lobby.roomname);
    });

    describe('getId() method', function(){
      it('should be able to access the variable "nextId"', function(){
        var result = game.getId();
        expect( result ).to.be.defined;
      });

      it('should return a number', function(){
        var result = game.getId();
        expect( result ).to.be.a.number;
      });

      it('should not produce duplicate ids', function(){
        var result1 = game.getId();
        var result2 = game.getId();
        expect( result1 ).to.not.equal(result2);
      });
    });

    describe('loadGameData() method', function(){
      xit('should do something', function() {
        expect(false).to.be.true;
      })

      describe('markQuizPlayed() function', function(){
        xit('should add quiz ID to recentlyPlayedQuizzes list on each player' , function() {
        })
      });
      
      describe('noRepeats() function', function(){
        xit('should do something', function() {
          expect(false).to.be.true;
        })
      });
      
      describe('shuffle() function', function(){
        it('was copied from internet. should work.', function() {
          expect(true).to.be.true;
        })
      });

      describe('loadCorrectAnswers() function', function(){
        xit('should do something', function() {
          expect(false).to.be.true;
        })
      });
    });

    describe('loadPlayers(players) method', function(){
      it('should add players from lobby to the game object', function() {
        
        expect( game.players.length ).to.equal( 0 );
        
        game.loadPlayers(allPlayers);
        expect( game.players.length ).to.equal( allPlayers.length );

        // Players should actually be the same players that were in the lobby
        expect( game.players[0] ).to.equal( allPlayers[0] );
        expect( game.players[1] ).to.equal( allPlayers[1] );
        expect( game.players[2] ).to.equal( allPlayers[2] );
        expect( game.players[3] ).to.equal( allPlayers[3] );
      });
    });

    describe('startTimer(timer, callback) method', function(){
      var called;

      before(function(done){
        called = false;
        
        game.startTimer(10, function(){
          called = true;
          done();
        });
      });

      it('should call callback after set time', function() {
        expect( called ).to.be.true;
      })
    }); // 'startTimer(timer, callback) method'

    describe('updateRoundScore(answerObj, socket) method', function(){
      xit('should update round score at the end of a round', function() {
        expect(false).to.be.true;
      });
    });

    describe('resetCurrentRound() method', function(){
      xit('should reset the current round after a round has ended', function() {
        expect(false).to.be.true;
      })
    });

    describe('getGameResults() method', function(){
      var allPlayers, game;

      beforeEach(function(){
        allPlayers = lobby.getPlayers();
        game = gameMaker(lobby.roomname);
        game.gameData.stats.gameEndTotal = 0;
        game.gameData.stats.allRoundResults = [
          {numCorrect: 1}, 
          {numCorrect: 0}, 
          {numCorrect: 1},
          {numCorrect: 4},
          {numCorrect: 3},
          {numCorrect: 0}
        ];
      });

      it('should return a number', function() {
        game.getGameResults();
        expect( game.gameData.stats.gameEndTotal ).to.be.a.number;
      })

      it('should tally scores in "game.gameData.stats.allRoundResults" array', function() {
        game.getGameResults();
        expect( game.gameData.stats.gameEndTotal ).to.equal( 9 );
      })
    });

    describe('resetPlayersInView() method', function(){
      it('should empty game.playersInView array', function() {
        game.resetPlayersInView();
        expect( game.playersInView ).to.be.an.array;
        expect( game.playersInView.length ).to.equal( 0 );
      });
    });
  });
});
