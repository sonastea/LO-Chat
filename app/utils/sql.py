from app import db
from app.models import Room, room_users


def getUserRooms(user):
    return Room.query.join(
        room_users, (room_users.c.user_id == user)).\
        filter(room_users.c.room_id == Room.id).order_by(Room.id.asc()).all()


def getAllMembers(room_id):
    return len(db.session.query(room_users).filter(room_users.c.room_id == room_id).all())