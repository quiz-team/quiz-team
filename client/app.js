
// var socket = io.connect('http://4c93fe6b.ngrok.io');
var socket = io.connect('http://localhost:9090');
var username;

socket.on('player name', function(data){
  username = data.username;
})

// when button is clicked on client side, emit button push to other users
$('.push-button').on('mousedown', function(event){
  console.log('MOUSE DOWN');
  socket.emit('button clicked', {username: username});
});

$('.push-button').on('mouseup', function(event){
  console.log('MOUSE UP');
  socket.emit('button unclicked', {username: username});
});

// when button is clicked by other users, briefly change color of user square
socket.on('friend click', function(data){
  var playerName = data.username;
  $('.indicator__square--' + playerName).addClass('indicator__square--' + playerName + '--active');
});

socket.on('friend unclick', function(data){
  $('.indicator').removeClass('indicator--active');
});