var playerMaker = require('./player.js');
var players = require('../collections/players.js');
var roundMaker = require('./round.js');
var timer = require('../utils/timerController.js');
var _und = require('underscore');
var QuestionBank = require('../database/config.js');

module.exports = function(gameId) {

  var game = {
    players: [],
    id: gameId,
    quizId: null,
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
      answerMap: {}
    },
    allRoundResults: [],
    currentRoundResults: {}
  };

  var nextId = 0;
  game.getId = function() {
    return ++nextId;
  };

  game.loadGameData = function(numPlayers, callback) {
    var filter = noRepeats(game.players);
    QuestionBank.findRandom(filter).limit(1).exec()
    .then(function(triviaSet) {
      triviaSet = triviaSet[0];
      game.quizId = triviaSet._id;

      // mark quiz played on all players in game
      markQuizPlayed(triviaSet, game.players);

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
        game.gameData.answerMap[question.id] = answer;
        game.gameData.answerMap[answer.id] = question;
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
      game.players.forEach(function(player, index) {
        game.gameData.players[player.id] = {};
        game.gameData.players[player.id].answers = playerAnswers[index];
        game.gameData.players[player.id].questions = playerQuestions[index];
      });

      game.gameData.roundQuestions = roundQuestions;

      // load up a matrix of correct answers for each round
      loadCorrectAnswers();

      callback();
    });
  };

  var markQuizPlayed = function(triviaSet, players){
    players.forEach(function(player){
      player.savePlayedQuiz(triviaSet._id);
    })
  };

  var noRepeats = function(players){
    var alreadyPlayed = [];
    players.forEach(function(player){
      player.recentlyPlayedQuizzes.forEach(function(quizId){
        if (alreadyPlayed.indexOf(quizId) === -1){
          alreadyPlayed.push(quizId);
        }
      });
    });
    var filter = {
      _id: {
        $nin: alreadyPlayed
      }
    }
    return filter;
  }

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
      
      for (var playerId in players){
        // find the question for a player
        var question = players[playerId].questions[round];
        // find id for question
        var questionId = question.id;
        // find answerId that matches questionId using the question-answer-map object
        var answer = game.gameData.answerMap[questionId];
        // push answerId to roundAnswers, at the correct round
        game.gameData.roundAnswers[round].push(answer.id);
        game.gameData.roundAnswerObjects[round].push(answer);
      }
    }
  };

  game.loadPlayers = function(players) {
    players.forEach(function(player) {
      game.players.push(player);
    });
  };

  game.startTimer = function(timer, callback) {
    setTimeout(function() {
      callback();
    }, timer.duration);
  };

  game.updateRoundScore = function(answerObj, socket){
    // given the current round, check if the answerId matches one of the expected answers
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
    // We might be able to get rid of this next line
    game.gameData.stats.players = game.players;
  };

  game.resetPlayersInView = function() {
    this.playersInView = [];
  };

  /**
   * Author: Nate Meier 
   * Writes average score and timesPlayed++ on quiz to database.
   * @param {number} scoreToAdd - The score to be added to moving average.
   * @param {string} quizId - The ID used to find quiz in database.
   */
  game.writeScoreToDatabase = function(scoreToAdd, quizId){
    // Access quiz in database
    QuestionBank.findOne({ '_id': quizId }).limit(1).exec()
      .then(function(quiz){
        // Calculate new average from averageScore and timesPlayed from quiz
        quiz.averageScore = calculateMovingAverage(scoreToAdd, quiz.averageScore, quiz.timesPlayed);  
        // Increment timesPlayed
        quiz.timesPlayed = quiz.timesPlayed + 1;
        // Store newAverage and timesPlayed in DB
        quiz.save();
      });
  };

  /**
   * Author: Nate Meier 
   * Calculates a moving average.
   * This is used to keep track of how users are scoring on each quiz.
   * @param {number} scoreToAdd - The score to be added to moving average.
   * @param {number} oldAverage - The previous average score for a given quiz.
   * @param {number} timesPlayed - Number of times the quiz has been played, excluding the current play.
   * @returns {number} - The new average score for a quiz.
   */
  var calculateMovingAverage = function(scoreToAdd, oldAverage, timesPlayed) {
    var movingAverage = (scoreToAdd + (oldAverage * timesPlayed)) / (timesPlayed + 1);
    // Round to two decimal places (good enough) 
    return Math.round( movingAverage * 100 ) / 100;
  };

  return game;
};
