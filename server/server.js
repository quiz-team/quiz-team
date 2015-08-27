//App is defined in express.js, and contains all logic for
//handling and processing requests.
var app = require('./express.js');
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server)

//Event for dealing with incoming socket connection.
io.on('connection', function(socket) {
  console.log("Connection happening");
  socket.on('button clicked', function(data){
    console.log("Someone pressed a button!");
  })
});

server.listen('9090');