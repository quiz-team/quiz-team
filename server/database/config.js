var mongoose = require('mongoose');
var random = require('mongoose-random');

mongoose.connect(process.env.MONGO_URL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('database connected');
  // var questionSet = new QuestionSet({

  //   "categories": [],
  //   "description": " How many current NFL coaches can you name? At the start of the 2015 season ",
  //   "difficulty": -1,
  //   "questions": [{
  //     "answer": "Bill Belichick",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2000 - Patriots"
  //   }, {
  //     "answer": "John Harbaugh",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2008 - Ravens"
  //   }, {
  //     "answer": "Pete Carroll",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2010 - Seahawks"
  //   }, {
  //     "answer": "Rex Ryan",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2015 - Bills"
  //   }, {
  //     "answer": "Tom Coughlin",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2004 - Giants"
  //   }, {
  //     "answer": "Lovie Smith",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2014 - Buccaneers"
  //   }, {
  //     "answer": "Mike Tomlin",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2007 - Steelers"
  //   }, {
  //     "answer": "Sean Payton",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2006 - Saints"
  //   }, {
  //     "answer": "Chip Kelly",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2013 - Eagles"
  //   }, {
  //     "answer": "Jason Garrett",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2010 - Cowboys"
  //   }, {
  //     "answer": "Andy Reid",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2013 - Chiefs"
  //   }, {
  //     "answer": "Mike McCarthy",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2006 - Packers"
  //   }, {
  //     "answer": "Marvin Lewis",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2003 - Bengals"
  //   }, {
  //     "answer": "Jay Gruden",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2014 - Redskins"
  //   }, {
  //     "answer": "Jeff Fisher",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2012 - Rams"
  //   }, {
  //     "answer": "John Fox",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2015 - Bears"
  //   }, {
  //     "answer": "Ron Rivera",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2011 - Panthers"
  //   }, {
  //     "answer": "Chuck Pagano",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2012 - Colts"
  //   }, {
  //     "answer": "Bruce Arians",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2013 - Cardinals"
  //   }, {
  //     "answer": "Gary Kubiak",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2015 - Broncos"
  //   }, {
  //     "answer": "Bill O'Brien",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2014 - Texans"
  //   }, {
  //     "answer": "Jack Del Rio",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2015 - Raiders"
  //   }, {
  //     "answer": "Ken Whisenhunt",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2014 - Titans"
  //   }, {
  //     "answer": "Jim Caldwell",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2014 - Lions"
  //   }, {
  //     "answer": "Joe Philbin ",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2012 - Dolphins"
  //   }, {
  //     "answer": "Mike Pettine",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2014 - Browns"
  //   }, {
  //     "answer": "Jim Tomsula",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2015 - 49ers"
  //   }, {
  //     "answer": "Todd Bowles",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2015 - Jets"
  //   }, {
  //     "answer": "Mike Zimmer",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2014 - Vikings"
  //   }, {
  //     "answer": "Mike McCoy",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2013 - Chargers"
  //   }, {
  //     "answer": "Gus Bradley",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2013 - Jaguars"
  //   }, {
  //     "answer": "Dan Quinn",
  //     "category": "NFL Coaches Quiz",
  //     "question": "2015 - Falcons"
  //   }],
  //   "quizLength": 32,
  //   "title": "NFL Coaches Quiz",
  //   "url": "http://www.jetpunk.com/quizzes/nfl-coaches-quiz.php"
    
  // });

  // questionSet.save(function(err, questionSet) {
  //   if (err) console.error(err);
  //   console.log(questionSet);
  // })
});

// Schema
var setSchema = mongoose.Schema({
  categories: [String],
  difficulty: {
    type: Number,
    default: 5
  },
  description: String,
  questions: [{
    question: String, 
    answer: String,
    category: String
  }],
  quizLength: Number,
  title: String,
  url: String
});

setSchema.plugin(random, {path: 'r'});

var QuestionSet = mongoose.model('QuestionSet', setSchema);

module.exports = QuestionSet;