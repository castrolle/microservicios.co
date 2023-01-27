# -*- coding: utf-8 -*-

import os
from datetime import timedelta


ACCESS_TOKEN_EXPIRE_MINUTES = timedelta(
    milliseconds = 450000
)
REFRESH_TOKEN_EXPIRE_MINUTES = timedelta(
    milliseconds= 900000
)

DEBUG = False
DEFAULT_DATETIME_FORMAT = "%Y-%m-%d %H:%M:%S.%f"
DEFAULT_DATETIME_NO_MINS = DEFAULT_DATETIME_FORMAT[:8]
DEFAULT_TIMEZONE = "America/Bogota"
ENCODING_UTF8 = 'utf-8'


TAG_ENVIRONMENT = os.environ.setdefault("TAG_ENVIRONMENT","")
FLASK_DEBUG = 1
LIMIT = 10
OFFSET = 1
V1_STR = "/v1.0"


APP = 'app-test-api'
APP_VERSION = os.environ.setdefault("APP_VERSION","develop")
AZURE_APPINSIGHTS = os.environ.setdefault("AZURE_APPINSIGHTS","1213132-1213132-1213132-1213132-1213132")
