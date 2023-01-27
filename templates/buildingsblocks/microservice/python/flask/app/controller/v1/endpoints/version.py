# installed packages
from flask_apispec import doc

# app code
from app.controller.v1.api_docs import docs
from app.conf.data import APP_VERSION,V1_STR,APP
from app.main import app
from app.utils import logger

@docs.register
@doc(
    description='Version',
    tags=['version'])
@app.route(    
    f'{V1_STR}/version',
    methods=['GET']
)
def version(
):
    custom_properties = { 'version': APP_VERSION , 'app':APP}
    
    logger.info(APP_VERSION,custom_properties)  
    return APP_VERSION