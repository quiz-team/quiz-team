var fs = require('fs');
var QuestionSet = require('./config.js');
var _und = require('underscore');
var promise = require('bluebird');
var mongoose = promise.promisifyAll(require('mongoose'));
var readdirAsync = promise.promisify(fs.readdir);
var readFileAsync = promise.promisify(fs.readFile);
// var questionSetFindAsync = promise.promisify(QuestionSet.find);
// var questionSetSaveAsync = promise.promisify(QuestionSet.save);

module.exports = function() {
  var dbMgmt = {};
  dbMgmt.AddtoDb = function() {
    readdirAsync('./quizzes/')
      .then(function(files) {
        _und.each(files, function(file) {
          readFileAsync('./quizzes/' + file, {encoding: 'utf-8'})
          .then(function(data) {
            var questionSet = new QuestionSet(JSON.parse(data));
            return [
              QuestionSet.findAsync({ url:questionSet.url }), 
              questionSet
            ];
          })
          // pass last two returns to function in .spread
          .spread(function(dbData, questionSet) {
            if (dbData.length === 0) {
              return questionSet.saveAsync()
              .then(function() {
                console.log(questionSet.title + ' added to the db');
              });
            }
          })
          .catch(function(err) {
            throw err;
          });
        });
      });
  };

  return dbMgmt;
};

module.exports().AddtoDb();
