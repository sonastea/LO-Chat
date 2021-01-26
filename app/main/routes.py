from .forms import LoginForm
from app.main import bp
from flask import render_template


@bp.route('/', methods=['GET', 'POST'])
@bp.route('/index', methods=['GET', 'POST'])
def index():
    form = LoginForm()
    return render_template('index.html', title='Home', form=form)


@bp.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    return render_template('login.html', title='Login', form=form)