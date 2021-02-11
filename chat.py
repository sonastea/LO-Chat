from app import create_app, socketio, db
from app.models import User, Message

app = create_app()


if __name__ == '__main__':
    socketio.run(app, host='192.168.0.3', debug=True)


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Message': Message}
