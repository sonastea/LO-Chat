$(document).ready(function() {

    namespace = '/chat';
    var socket = io(namespace);


    socket.on('connect', () => {
        socket.emit('event', { "data": "User connected to ChatServer" });
    });


    socket.on('response', (response) => {
        console.log(response);
    });


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
     *  Shift+Enter starts a new line. Enter doesn't do anything unless there's text.
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
});
