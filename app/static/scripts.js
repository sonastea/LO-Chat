$(document).ready(function() {

    namespace = '/chat';
    var socket = io(namespace);


    socket.on('connect', () => {
        socket.emit('event', {test: "User connected to ChatServer"});
    });


    socket.on('response', (response) => {
        console.log(response);
    });


    /*
    Message is relayed from the server and sent back here to the client.
    The user's message is now displayed in the chat feed for the session to see.
    */
    socket.on('message', (msg, username) => {
        $('#chatbox').append(username + '<li>' + msg + '</li>');
    });

    /*
    An event listener for when the message form is submitted.
    Client sends their message for the server to handle.
    */
    $('#msg-form').on('submit', (event) => {
        event.preventDefault();
        let msg = $('#message').val();
        socket.emit('message', msg);
    });

});
