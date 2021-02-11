from app import socketio, db 
from app.models import Message
from flask_login import current_user
from flask_socketio import send, emit
from app.auth.routes import authenticated_only


@socketio.on('event', namespace='/chat')
def handle_my_event(arg1, methods=['GET', 'POST']):
    """
    Handles event sent by clients and prints it to the terminal.
    A response is sent back to inform that its event succeeded.
    """
    print('Recieved event: ' + str(arg1))
    emit('response', str(arg1))


@socketio.on('message', namespace='/chat')
@authenticated_only
def handle_message(message, methods=['GET', 'POST']):
    """
    Sent by a client when the user sends a message.
    Message is then sent and broadcasted to all users.
    """
    emit('message', (message, current_user.username), broadcast=True)
    msg = Message(body=message, sender=current_user)
    db.session.add(msg)
    db.session.commit()
