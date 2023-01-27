from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from .api import controller
from .conf import config
app = FastAPI(
    docs_url="/v1.0/swagger-ui.html",
    redoc_url="/v1.0/redocs",
    openapi_url= "/v1.0/openapi.json"
    )

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Custom title",
        version="2.5.0",
        description="This is a very custom OpenAPI schema",
        routes=app.routes,
    )
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

app.include_router(
        controller.router,
        prefix=config.BASE_PATH,
        tags=["Api Controller"]
    )