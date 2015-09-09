var playerMaker = require('./player.js');
var players = require('../collections/players.js');
var roundMaker = require('./round.js');
var timer = require('../utils/timerController.js');
var _und = require('underscore');
// var questionBank = require('../trivia.js').trivia;
var QuestionBank = require('../database/config.js');

module.exports = function(gameId) {

  var game = {
    players: [],
    id: gameId,
    numRounds: 6,
    roundNum: 1,
    playersInView: [],
    gameData: {
      title: '',
      description: '',
      players: {},
      roundAnswers: [],
      roundAnswerObjects: [],
      roundQuestions: [],
      stats: {
        allRoundResults: [],
        gameEndTotal: 0
      },
      answerQuestionObjectsMap: {}
    },
    questionAnswerMap: {},
    questionAnswerObjectsMap: {},
    allRoundResults: [],
    currentRoundResults: {}
  };

  var nextId = 0;
  game.getId = function() {
    return ++nextId;
  };

  game.loadGameData = function(numPlayers, callback) {
    console.log("load game data");
    QuestionBank.findRandom().limit(1).exec()
    .then(function(triviaSet) {
      triviaSet = triviaSet[0];
      var questionSet = triviaSet.questions;
      shuffle(questionSet);

      game.gameData.title = triviaSet.title;
      game.gameData.description = triviaSet.description;

      questionSet = questionSet.splice(0,numPlayers*6);
      var playerAnswers = [];
      var playerQuestions = [];
      for (var i = 0; i < numPlayers; i++) {
        playerAnswers.push([]);
        playerQuestions.push([]);
      }
      var roundQuestions = [];
      for (var i = 0; i < game.numRounds; i++) {
        roundQuestions.push([]);
      }
      // sets game.gameData
      //for each question in questionBank
      _und.each(questionSet, function (questionAnswerPair, index) {
        //assign id to question
        var question = {};
        question.text = questionAnswerPair.question;
        question.id = game.getId();
        //assign id to answer
        var answer = {}
        answer.text = questionAnswerPair.answer;
        answer.id = game.getId();
        //store question->association in questionAnswers
        game.questionAnswerMap[question.id] = answer.id;
        game.questionAnswerObjectsMap[question.id] = answer;
        game.gameData.answerQuestionObjectsMap[answer.id] = question;
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
      });

      // Need a comment for this
      game.gameData.players = {};
      //do something with playerAnswers and playerQuestions
      game.players.forEach(function(playerId, index) {
        game.gameData.players[playerId] = {};
        game.gameData.players[playerId].answers = playerAnswers[index];
        game.gameData.players[playerId].questions = playerQuestions[index];
      });

      game.gameData.roundQuestions = roundQuestions;

      // load up a matrix of correct answers for each round
      loadCorrectAnswers();
      callback();
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

  var loadCorrectAnswers = function() {
    // this function should load all the correct answer
    var players = game.gameData.players;
    for (var round = 0; round < game.numRounds; round++){
      // create an array in roundAnswers for each round
      game.gameData.roundAnswers.push([]);
      game.gameData.roundAnswerObjects.push([]);
      console.log
      for (var playerId in players){
        // find the question for a player
        var question = players[playerId].questions[round];
        // find id for question
        var questionId = question.id;
        // find answerId that matches questionId using the question-answer-map object
        var answer = game.questionAnswerObjectsMap[questionId];
        // push answerId to roundAnswers, at the correct round
        game.gameData.roundAnswers[round].push(answer.id);
        game.gameData.roundAnswerObjects[round].push(answer);
      }
    }
    console.log("EXITING LOADCORRECTANSWERS");
  }

  game.addPlayer = function(playerId) {
    game.players.push(playerId);
  };

  game.loadPlayers = function(players) {
    players.forEach(function(player) {
      game.players.push(player.id);
    });
  };

  game.startTimer = function(timer, callback) {
    setTimeout(function() {
      callback();
    }, timer.duration);
  };

  game.updateRoundScore = function(answerObj, socket){
    // given the current round, check if the answerId matches one of the expected answers

    game.currentRoundResults.correctAnswers[socket.playerId] = game.questionAnswerMap[answerObj.question.id];

    if(game.gameData.roundAnswers[game.roundNum-1].indexOf(answerObj.answer.id)!== -1){
      // if yes increase the total correct in the currentRoundResults
      game.currentRoundResults.numCorrect++;
      game.currentRoundResults.scoreByPlayer[socket.playerId] = 1;
    } else {
      //handle incorrect submission:
      game.currentRoundResults.scoreByPlayer[socket.playerId] = 0;
    }
    game.currentRoundResults.answersSubmitted++; // THIS WILL NOT RUN IF ANSWER NTO SUBMITTED
    if(game.currentRoundResults.answersSubmitted === game.players.length){
      game.gameData.stats.allRoundResults.push(game.currentRoundResults);
    }
  };

  game.resetCurrentRound = function(){
    game.currentRoundResults = {
      answersSubmitted: 0,
      numCorrect: 0,
      scoreByPlayer: {},
      correctAnswers: {}
    };
  };

  /**
   * sets property on game with end of game results
   */
  game.getGameResults = function() {
    game.gameData.stats.gameEndTotal = game.gameData.stats.allRoundResults
      .reduce(function(total, current) {
        total += current.numCorrect;
        return total;
      }, 0);
    game.gameData.stats.players = game.players;
  };

  game.resetPlayersInView = function() {
    this.playersInView = [];
  };

  return game;

};
