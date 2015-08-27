var socket = io.connect('http://localhost:9090');

// when button is clicked on client side, emit button push to other users
$('.push-button').on('click', function(event){
  console.log('CLICKED BUTTON');
  socket.emit('button clicked', {meatloaf: "unexpected"});
})

// when button is clicked by other users, briefly change color of top square
socket.on('friend click', function(data){
  console.log('Someone else clicked a button!');
});

