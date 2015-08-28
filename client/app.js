
// var socket = io.connect('http://4c93fe6b.ngrok.io');
var socket = io.connect('http://localhost:9090');

// when button is clicked on client side, emit button push to other users
$('.push-button').on('mousedown', function(event){
  socket.emit('button clicked');
});

$('.push-button').on('mouseup', function(event){
  socket.emit('button unclicked');
});

// when button is clicked by other users, briefly change color of user square
socket.on('friend click', function(friendNum){
  $('.indicator__square--player' + friendNum).addClass('indicator__square--player' + friendNum + '--active');
});

socket.on('friend unclick', function(friendNum){
  $('.indicator__square--player' + friendNum).removeClass('indicator__square--player' + friendNum + '--active');
});