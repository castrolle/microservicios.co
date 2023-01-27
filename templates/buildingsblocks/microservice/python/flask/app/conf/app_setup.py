# Import app code
from app.main import app
# Set up global variables
from app.conf import data  # noqa
# Set up Config Environments
from app.conf import config  # noqa


# couch_db
#from app.conf.db import couch_db # noqa

# Set up CORS
from . import cors  # noqa
# Set up Flask Mail
# from app.conf import config_mail


from . import errors  # noqa

# Set up Flask Endpoints
from ..controller.v1 import api as api_v1  # noqa


@app.before_first_request
def setup():
    # Load dafault data on DB
    print('init data')
