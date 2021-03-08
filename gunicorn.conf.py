wsgi_app = "chat:app"
bind = "192.168.0.3:5000"
reload = True
workers = 1
worker_class = "eventlet"