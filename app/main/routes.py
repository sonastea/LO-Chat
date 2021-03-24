from flask import render_template, request, current_app, url_for, flash, request, \
    jsonify
from flask_login import login_required, current_user
from werkzeug.utils import redirect
from app import db
from app.main import bp
from app.main.forms import MessageForm, RoomForm
from app.models import User, Message, Room, room_users
from app.utils.sql import getUserRooms, getAllMembers


@bp.route('/', methods=['GET', 'POST'])
@bp.route('/index', methods=['GET', 'POST'])
@bp.route('/home', methods=['GET', 'POST'])
def index():
    """
    View function for the main page once the user signed in.
    User is redirected to "auth.login" if not logged in by 'login_required'.
    """
    rooms = getUserRooms(current_user.get_id()) 
    return render_template('index.html', joined_rooms=rooms, page='home')


@bp.route('/user/<username>', methods=['GET', 'POST'])
def user(username):
    user = User.query.filter_by(username=username).\
        first_or_404(description=f"The user {username} doesn\'t exist")
    rooms = getUserRooms(current_user.get_id())
    page = request.args.get('page', 1, type=int)
    messages = user.messages.filter((Message.body != '') & (Message.body != None)).order_by(
        Message.timestamp.desc()).paginate(
            page, current_app.config['MESSAGES_PER_PAGE'], False)
    next_url = url_for('main.user', username=user.username,
                       page=messages.next_num) if messages.has_next else None
    prev_url = url_for('main.user', username=user.username,
                       page=messages.prev_num) if messages.has_prev else None

    return render_template('user.html', user=user, messages=messages.items, joined_rooms=rooms, 
        next_url=next_url, prev_url=prev_url)


@bp.route('/chat/<room>', methods=['GET', 'POST'])
@login_required
def room(room):
    """ 
    Chat room templated accordingly to the room name.

    """
    form = MessageForm()
    return render_template('room.html', form=form, room=room)


@bp.route('/browse', methods=['GET', 'POST'])
@login_required
def browse():
    """
    Lists all available rooms one can join to be a member of.
    User should be able to search for a specific room or create their own.
    """
    form = RoomForm()
    members = []
    rooms = Room.query.limit(current_app.config['ROOMS_PER_PAGE']).all()
    joined_rooms = getUserRooms(current_user.get_id())

    if form.validate_on_submit():
        user = current_user.get_id()
        room = Room(type=int(form.type.data), name=form.name.data, 
                   description=form.description.data, owner_id=user)
        db.session.add(room)
        db.session.commit()
        room.members.append(User.query.get(user))
        db.session.execute(
            room_users.update().
                where((room_users.c.user_id == user) & (room_users.c.room_id == room.id)).
                values({'role': '1'}))
        db.session.commit()
        flash('Room created successfully!') 
        return redirect(url_for('main.browse'))
    
    for i in range(1, 21):
        members.append(getAllMembers(i))

    return render_template('browse.html', rooms=rooms, joined_rooms=joined_rooms, members=members,
        form=form)


@bp.route('/update_room', methods=['POST'])
def update_room():
    """
    Update selected room from the database according to the user.

    """
    room = Room.query.filter(Room.name == request.form['room']).first()
    data = db.session.query(room_users).filter(room_users.c.room_id == room.id).count()

    return ({'members' : data})


@bp.route('/update_rooms', methods=['POST'])
def update_rooms():
    """
    Returns user's rooms in the specific page as a response.
    Updates client side if the room has joined the room.
    """
    data = []
    temp = []
    page = int(request.form['page'])
    offset_max = int(page) * current_app.config['ROOMS_PER_PAGE']
    offset_min = offset_max / page

    data.append(db.session.query(room_users).\
        order_by(room_users.c.room_id.asc()).\
        filter(room_users.c.user_id == current_user.get_id()).\
        filter(room_users.c.room_id <= offset_max). \
        filter(room_users.c.room_id > int(offset_min)).\
        limit(current_app.config['ROOMS_PER_PAGE']).all())

    for i in range(int(offset_min)+1, offset_max+1):
        j = len(db.session.query(room_users).filter(room_users.c.room_id == i).all())
        temp.append(j)
    data.append(temp)

    return jsonify(data)
