var socket = io();

console.log('js file connected');

socket.on('send-message', function(data){
  console.log(data);
  // This is where the client side JS receives the data from the server and then
  // appends to it to the chat board for all connected users on a socket.
  // Call a function that will do the appending using jQuery on Vanilla JS DOM Manipulation.
  sendMessage(data);
});

function sendMessage(message) {
  $('.chat-area').append(message + '<br>');
}

function pullMessage() {
  return $('#textarea1').val();
}

$('button').on('click', function(){
  socket.emit('send-message', pullMessage());
});
