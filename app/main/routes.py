from flask import render_template
from flask_login import login_required
from app.main import bp
from app.main.forms import MessageForm


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
    return render_template('chat.html', msg=form)
