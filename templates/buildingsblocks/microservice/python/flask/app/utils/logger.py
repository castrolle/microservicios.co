# Import app code
from app.main import app  # noqa
from app.conf.data import AZURE_APPINSIGHTS

# Standard libraries
import time
import os
import json

#Azure
from applicationinsights import TelemetryClient, channel

#Configuración modo asincróno
sender = channel.AsynchronousSender()
queue = channel.AsynchronousQueue(sender)
cha = channel.TelemetryChannel(None, queue)
tc = TelemetryClient(AZURE_APPINSIGHTS,cha)

def debug(val,custom_properties):     
    tc.track_trace(val,custom_properties,'DEBUG')
    tc.flush()

def info(val,custom_properties):     
    tc.track_trace(val,custom_properties,'INFO')
    tc.flush()

def warning(val,custom_properties):     
    tc.track_trace(val,custom_properties,'WARNING')
    tc.flush()

def error(val,custom_properties):     
    tc.track_trace(val,custom_properties,'ERROR')
    tc.flush()

def critical(val,custom_properties):     
    tc.track_trace(val,custom_properties,'CRITICAL')
    tc.flush()