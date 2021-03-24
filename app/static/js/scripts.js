const socket = io();

$(document).ready(function() {

  socket.on('response', (response) => { console.log(response['message']); });

  socket.on('user_joined_room', (data) => { console.log(data.message); });

  socket.on('user_leave_room', (data) => { console.log(data.message); });

  socket.on('room_users', (data) => { console.log(data); });


 /*
  *  An 'active' class is added to the present active tab.      
  *  This highlights the active tab in the navbar.
  */
  var url = window.location;
  $('ul.nav a[href="'+ url +'"]').parent().addClass('active');
  $('ul.nav a').filter(function() { return this.href == url; }).parent().addClass('active');


 /*
  *  Message is relayed from the server and sent back here to the client.
  *  The user's message is now displayed in the chat feed for the session to see.
  */
  socket.on('message', (msg, username) => {
    return (username != undefined) ? $('#chat-window').append('<li class="list-unstyled">' + username + ': ' + msg + '</li>') 
      : $('#chat-window').append('<li class="list-unstyled">' + msg + '</li>');
  });


 /*
  *  Listens to the enter key to be used as the send key for messages.
  *  Shift+Enter starts a new line. Enter doesn't do anything unless tere's text.
  */
  $('#chat-box').keypress(function(event) {
    if (($('#chat-box').val().trim().length > 0) && event.which === 13 && !event.shiftKey) {
      $('#chat-send').click();
      $('#chat-box').val('');
      event.preventDefault();
    } else if (event.keyCode == 13) {
      event.preventDefault();
    }
  });


 /*
  *  An event listener for when the message form is submitted.
  *  Client sends their message for the server to handle.
  */
  $('#msg-form').on('submit', (event) => {
    event.preventDefault();
    let msg = $('#chat-box');
    socket.emit('message', msg.val());

    // Reset message field
    msg.val('');
  });


 /*
  *  Every keyup when writing a message will trigger a count of current characters
  *  and display it near the send button.
  */
  $('#chat-box').keyup(() => {
    var c = $('#chat-box').val().length;
    $('#char-current').text(c);
  });

 /*
  *  Reset current character count when the chat-send button is clicked.
  *
  */
  $('#chat-send').on('click', () => { $('#char-current').text('0'); });
})
