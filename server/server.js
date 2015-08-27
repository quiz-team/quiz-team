var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server)

io.on('connection', function(socket) {
  console.log("Connection happening", socket.id);
  socket.on('button clicked', function(data){
    console.log("Someone pressed a button! ", data);
    io.emit("friend click");
  })
});


//Routing stuff. TODO: Move to different file
app.get('/', function(req, res) {
  res.redirect('/index.html');
});

app.use(express.static('client'));
//End routing stuff

server.listen('9090');