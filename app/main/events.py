import json
from app import socketio, db 
from app.models import Message, User, Room, room_users
from flask import session
from flask_login import current_user
from flask_socketio import send, emit
from app.auth.routes import authenticated_only


@socketio.on('connect')
def connect():
    """
    Sends a message to all users in the `/chat` namespace that a user joined the chat.
    """
    if (current_user.is_authenticated):
        print(f"[EVENT] {current_user.username} has connected to the website.")
    else:
        send(f"[EVENT] Guest has joined the chat.")


@socketio.on('event')
def handle_my_event(arg1, methods=['GET', 'POST']):
    """
    Handles event sent by clients and prints it to the terminal.
    A response is sent back to inform that its event succeeded.
    """
    print('[EVENT] ' + str((json.dumps(arg1, indent=4))) + '\n')


@socketio.on('on_join')
def on_join(arg1, methods=['GET', 'POST']):
    """
    """
    print(arg1)


@socketio.on('message')
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


@socketio.on('user_join_room')
@authenticated_only
def joinRoom(data):
    """
    User joins a group and the room's json data is retrieved here.
    A query checks if the player is already in the room or not and reacts accordingly.
    """
    user = User.query.get(session['user_id'])
    room = Room.query.filter_by(name=data['room']).first()

    if (db.session.query(room_users).
        filter((room_users.c.user_id == user.id) & (room_users.c.room_id == room.id)).
        one_or_none() == None):
            room.members.append(user)
            db.session.commit()
            emit('user_joined_room', { 'message' : 'You joined ' + room.name })
    else:
        emit('response', { 'message' : 'You are already in this group!' })


@socketio.on('user_leave_room')
@authenticated_only
def leaveRoom(data):
    """
    User leaves a group and the room's json data is retrieved here.
    A query is done to remove the user from the database.
    """
    user = User.query.get(session['user_id'])
    room = Room.query.filter_by(name=data['room']).first()
    r = db.session.query(room_users).\
        filter((room_users.c.user_id == user.id) & (room_users.c.room_id == room.id)).\
        one_or_none()

    if (r != None):
            db.session.execute(room_users.delete().\
                where(room_users.c.room_id == room.id).\
                where(room_users.c.user_id == user.id))
            db.session.commit()
            emit('user_leave_room', { 'message' : 'You left ' + room.name })
    else:
        emit('response', { 'message' : 'You are not in this group!' })
