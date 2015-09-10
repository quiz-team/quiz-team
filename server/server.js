// load env 
require('dotenv').load();

//App is defined in express.js, and contains all logic for
//handling and processing requests.
var app = require('./express.js');
var http = require('http');
var server = http.Server(app);
require('./sockets/mainSockets.js')(server);

var port = process.env.PORT || 9090;

server.listen(port);