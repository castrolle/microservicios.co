# Import installed packages
from apispec import APISpec
from flask_apispec import FlaskApiSpec

# Import app code
from ...main import app
from ...conf import data


app.config.update({
    'APISPEC_SPEC':
    APISpec(
        title='$((appName))',
        version='v1',
        plugins=('apispec.ext.marshmallow',)
    ),
    'APISPEC_SWAGGER_URL': f'{data.V1_STR}/swagger',
    'APISPEC_SWAGGER_UI_URL': f'{data.V1_STR}/swagger-ui.html'
})
docs = FlaskApiSpec(app)

security_params = [{'bearer': []}]