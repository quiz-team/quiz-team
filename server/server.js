var express = require('express');
var app = express();
var http = require('http');

app.get('/', function(req, res) {
  res.redirect('/index.html');
});

app.use(express.static('client'));

app.listen('9090');