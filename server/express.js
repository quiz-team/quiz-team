var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.redirect('/index.html');
});

//Serve up static files out of the client folder
app.use(express.static('client'));

module.exports = app;