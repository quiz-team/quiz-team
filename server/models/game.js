var playerMaker = require('./player.js');
var players = require('../collections/players.js');
var roundMaker = require('./round.js');
var timer = require('../utils/timerController.js');
var _und = require('underscore');
var questionBank = require('../trivia.js').trivia;

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
      stats: {
        allRoundResults: [],
        gameEndTotal: 0
      }
    },
    questionAnswerMap: {},
    allRoundResults: [],
    currentRoundResults: {},
    roundAnswers: []
  };

  var nextId = 0;
  game.getId = function() {
    return ++nextId;
  };

  game.loadGameData = function(numPlayers) {
    var triviaSet = questionBank.sets[Math.floor(Math.random() * questionBank.sets.length)];
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
    for (var i = 0; i < this.numRounds; i++) {
      roundQuestions.push([]);
    }
    console.log("PLAYER ANSWERS: ", playerAnswers);
    // sets game.gameData
    //for each question in questionBank
    questionSet.forEach(function (questionAnswerPair, index) {
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
      //assign answer to a player in playerAnswers, rotating through players
      console.log(index % numPlayers);
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

    // Need a comment for this
    game.gameData.players = {};
    //do something with playerAnswers and playerQuestions
    game.players.forEach(function(playerId, index) {
      game.gameData.players[playerId] = {};
      game.gameData.players[playerId].answers = playerAnswers[index];
      game.gameData.players[playerId].questions = playerQuestions[index];
    });

    // load up a matrix of correct answers for each round
    loadCorrectAnswers();
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
      game.roundAnswers.push([]);
      for (var playerId in players){
        // find the question for a player
        var question = players[playerId].questions[round];
        // find id for question
        var questionId = question.id;
        // find answerId that matches questionId using the question-answer-map object
        var answerId = game.questionAnswerMap[questionId];
        // push answerId to roundAnswers, at the correct round
        game.roundAnswers[round].push(answerId);
      }
      console.log("game.roundAnswers: ", game.roundAnswers);
    }
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

  game.updateRoundScore = function(answer){
    // given the current round, check if the answerId matches one of the expected answers
    console.log("ANSWER FROM PLAYER: ", answer);

    if(game.roundAnswers[game.roundNum-1].indexOf(answer.id)!== -1){
      // if yes increase the total correct in the currentRoundResults
      // console.log("CORRECT ANSWER!")
      game.currentRoundResults.numCorrect++;
    }
    game.currentRoundResults.answersSubmitted++; // THIS WILL NOT RUN IF ANSWER NTO SUBMITTED
    if(game.currentRoundResults.answersSubmitted === game.players.length){
      game.gameData.stats.allRoundResults.push(game.currentRoundResults);
      console.log("ALL CORRECT ANSWERS FROM ROUND: ", game.roundAnswers[game.roundNum-1]);
    }
  };

  game.resetCurrentRound = function(){
    console.log("RESETTING CURRENT ROUND");
    game.currentRoundResults = {
      answersSubmitted: 0,
      numCorrect: 0
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
  };

  game.resetPlayersInView = function() {
    this.playersInView = [];
  };

  return game;

};
