var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server)

io.on('connection', function(socket) {
  console.log("Connection happening");
});


//Routing stuff. TODO: Move to different file
app.get('/', function(req, res) {
  res.redirect('/index.html');
});

app.use(express.static('client'));
//End routing stuff

server.listen('9090');