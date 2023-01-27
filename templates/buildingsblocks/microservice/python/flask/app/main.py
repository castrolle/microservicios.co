# -*- coding: utf-8 -*-

# Import installed packages
from flask import Flask

# Import app code
app = Flask(__name__, template_folder='./static')

# Setup app
from .conf import app_setup  # noqa

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
