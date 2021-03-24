from app import create_app, socketio, db
from app.models import User, Message, Room, room_users

app = create_app()


if __name__ == '__main__':
    socketio.run(app, debug=True)


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Message': Message, 'Room': Room, 'room_users': room_users}
