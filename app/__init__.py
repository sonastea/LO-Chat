from config import Config
from flask import Flask
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_bootstrap import Bootstrap


import eventlet
eventlet.monkey_patch()

socketio = SocketIO()
db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()
bootstrap = Bootstrap()
login.login_view = 'auth.login'
login.login_message = ('Please log in to access this page.')
login.refresh_view = 'auth.login'
login.needs_refresh_message = ('Please login to access this page.')
login.needs_refresh_message_category = 'info'
login.session_protection = 'strong'


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    socketio.init_app(app, async_mode='eventlet')
    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)
    bootstrap.init_app(app)

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)
    
    return app

from app import models