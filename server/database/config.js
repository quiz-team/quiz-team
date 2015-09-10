var mongoose = require('mongoose');
var random = require('mongoose-random');

var url = process.env.MONGO_URL || 
          'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/quizTeam';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('database connected');
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