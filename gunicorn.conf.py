wsgi_app = "chat:app"
bind = "0.0.0.0:5000"
reload = True
workers = 1
worker_class = "eventlet"