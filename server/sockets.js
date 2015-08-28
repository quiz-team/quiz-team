module.exports = function(server) {
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
}
