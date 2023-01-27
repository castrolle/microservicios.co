
# app code
from app.conf import data
from app.main import app


# Flask variables
app.config['DEBUG'] = data.DEBUG
app.config['FLASK_DEBUG'] = data.FLASK_DEBUG
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_POOL_SIZE'] = 10
app.config['SQLALCHEMY_POOL_RECYCLE'] = 500
app.config['SQLALCHEMY_POOL_TIMEOUT'] = 600

