//App is defined in express.js, and contains all logic for
//handling and processing requests.
var app = require('./express.js');
var http = require('http');
var server = http.Server(app);
require('./mainSockets.js')(server);



server.listen('9090');