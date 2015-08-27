//App is defined in express.js, and contains all logic for
//handling and processing requests.
var app = require('./express.js');
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);

var numClicked = 0;

//Event for dealing with incoming socket connection.
io.on('connection', function(socket) {
  console.log("Connection happening", socket.id);

  socket.on('button clicked', function(data){
    numClicked += 1;
    io.emit("friend click");
  });

  socket.on('button unclicked', function(data){
    numClicked -= 1;
    if (numClicked === 0) {
      io.emit("friend unclick");
    }
  });
});

server.listen('9090');