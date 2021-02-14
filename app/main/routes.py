from flask import render_template, request, current_app, url_for
from flask_login import login_required
from app.main import bp 
from app.main.forms import MessageForm
from app.models import User, Message


@bp.route('/', methods=['GET', 'POST'])
@bp.route('/index', methods=['GET', 'POST'])
def index():
    """
    View function for the main page once the user signed in.
    User is redirected to "auth.login" if not logged in by 'login_required'.
    """
    return render_template('index.html')


@bp.route('/chat', methods=['GET', 'POST']) 
@login_required
def chat():
    """View function for the chat room"""
    form = MessageForm()
    return render_template('chat.html', form=form)


@bp.route('/user/<username>', methods=['GET'])
def user(username):
    user = User.query.filter_by(username=username).first_or_404(description='The user {} doesn\'t exist'.format(username))
    page = request.args.get('page', 1, type=int)
    messages = user.messages.filter((Message.body != '') & (Message.body != None)).order_by(
        Message.timestamp.desc()).paginate(
            page, current_app.config['MESSAGES_PER_PAGE'], False)
    next_url = url_for('main.user', username=user.username,
                       page=messages.next_num) if messages.has_next else None
    prev_url = url_for('main.user', username=user.username,
                       page=messages.prev_num) if messages.has_prev else None

    return render_template('user.html', user=user, messages=messages.items, next_url=next_url, prev_url=prev_url)
