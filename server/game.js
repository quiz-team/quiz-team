var playerMaker = require('./player.js');
var players = require('./players.js');
var roundMaker = require('./round.js');
var timer = require('./timerController.js');
var _und = require('underscore');
var questionBank = require('./trivia.js').trivia;

module.exports = function(lobby, numRounds) {

  var game = {
    points: 0,
    lobby: lobby,
    players: [],
    //id: lobby.id,
    id: 5,  //TODO: THIS IS WRONG
    numRounds: numRounds || 6,
    roundNum: 1,
    rounds: {},
    gameData: {},
    questionAnswers: {}
  };

  game.getId = function() {
    var nextId = 0;
    return ++nextId;
  }

  game.loadGameData = function(numPlayers) {
    //FILL THIS IN SOMEHOW:
    var playerIds = [4, 76, 32, 109743];

    var playerAnswers = [];
    var playerQuestions = [];
    for (var i = 0; i < numPlayers; i++) {
      playerAnswers.push([]);
      playerQuestions.push([]);
    }
    var roundQuestions = [];
    for (var i = 0; i < this.numRounds; i++) {
      roundQuestions.push([]);
    }

    // sets game.gameData
    //for each question in questionBank
    questionBank.forEach(function (questionAnswerPair, index) {
      //assign id to question
      var question = questionAnswerPair.question;
      question.id = game.getId();
      //assign id to answer
      var answer = questionAnswerPair.answer;
      answer.id = game.getId();
      //store question->association in questionAnswers
      game.questionAnswers[question.id] = answer.id;
      //assign answer to a player in playerAnswers, rotating through players
      playerAnswers[index % numPlayers].push(answer);
      //assign question to roundQuestions, filling up one round at a time.
      roundQuestions[Math.floor(index / numPlayers)].push(question);
    });
      
    //for each round in roundQuestions
    roundQuestions.forEach(function(round) {
      //shuffle round
      shuffle(round);
      //assign one question per round to player in playerQuestions
      round.forEach(function(question, index) {
        playerQuestions[index].push(question);
      });
    });
    //for each player in playerAnswers
    playerAnswers.forEach(function(answers) {
      //shuffle player's answers
      shuffle(answers);
    })
    //do something with playerAnswers and playerQuestions
    playerIds.forEach(function(playerId, index) {
      game.gameData[playerId] = {};
      game.gameData[playerId].answers = playerAnswers[index];
      game.gameData[playerId].questions = playerQuestions[index];
    });
  };

  var shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  game.addPlayer = function(player) {
    game.players.push(player);
  };

  game.gameStart = function() {

  };

  game.startTimer = function(timer, callback) {
    setTimeout(function() {
      callback();
    }, timer.duration);
  };

  game.loadGameData(4);

  return game;

};
