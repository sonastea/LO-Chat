from datetime import datetime
from app import db, login
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


room_users = db.Table('room_users', db.metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('room_id', db.Integer, db.ForeignKey('room.id')),
    db.Column('role', db.Integer, default=0, nullable=False),
    db.Column('is_active', db.Boolean, default=False, nullable=False)
    )


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email =  db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    messages = db.relationship('Message', backref='sender', lazy='dynamic')
    rooms = db.relationship(
        'Room', secondary=room_users,
        backref='members', lazy='joined')


    def __repr__(self):
        return f"<User {self.username}>"


    def set_password(self, password):
        self.password_hash = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    

@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(320))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'))


    def __repr__(self):
        return f"<Message {self.body}>"


class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Boolean, default=False)
    name = db.Column(db.String(24), index=True, unique=True)
    description = db.Column(db.String(128))
    created = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


    def __repr__(self):
        return f"<Room {self.name}>"
