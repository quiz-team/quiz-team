var express = require('express');
var app = express();

//Serve up static files out of the client folder
app.use(express.static('./client/app'));

// catch-all route
app.get('*', function(req, res) {
  res.redirect('/index.html');
});

module.exports = app;