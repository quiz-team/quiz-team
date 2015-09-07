var fs = require('fs');
var QuestionSet = require('./config.js');
var _und = require('underscore');

module.exports = function() {
  var dbMgmt = {};
  dbMgmt.AddtoDb = function() {
    fs.readdir('./quizzes/', function(err, files) {
      if(err){
        return console.error(err);
      }
      _und.each(files, function(file) {
        console.log(file);
        fs.readFile('./quizzes/' + file, {
          encoding: 'utf-8'
        }, function(err, data) {
          if (err) {
            return console.error(err);
          }
          var questionSet = new QuestionSet(JSON.parse(data));
          QuestionSet.find({
            url: questionSet.url
          }, function(err, data) {
            if (err) {
              return console.error(err);
            } else if (data.length===0) {
              questionSet.save(function(err, questionSet) {
                if (err) {
                  return console.error(err);
                }
                console.log(questionSet.title + ' added to the db');
              });
            }
          });
        });
      });
    });
  };

  return dbMgmt;
};

module.exports().AddtoDb();
