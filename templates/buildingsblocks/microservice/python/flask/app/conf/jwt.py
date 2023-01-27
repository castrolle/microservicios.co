
# installed packages
from datetime import datetime

# flask jwt
from flask import jsonify
from flask_jwt_extended import JWTManager

# app code
from ..main import app
from app.conf.db.session import db_session
from app.models.token_block_list import TokenBlocklist

# providers
from app.providers import user

# Setup the Flask-JWT-Extended extension
jwt = JWTManager(app)

@jwt.user_lookup_loader
def get_current_user(identity,jwt_payload):
    return jwt_payload['sub']

# Callback function to check if a JWT exists in the database blocklist
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    token = db_session.query(TokenBlocklist.id).filter(
        TokenBlocklist.jti==jti
    ).scalar()
    return token is not None

@jwt.revoked_token_loader
def revoked_token_response(jwt_header, jwt_payload):
    return jsonify({
        'error': "Error en la autenticacion.",
        'error_detail':"Lo sentimos, la sesion se ha cerrado."
    }),401

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({
        'error': "Error en la autenticacion.",
        'error_detail':"El token de autenticación ha expirado."
    }),401

@jwt.unauthorized_loader
def unauthorized_loader_callback(msg):
    return jsonify({
        'error': "Error en la autenticacion.",
        'error_detail':"Token de autenticación no encontrado."
    }),401


@jwt.invalid_token_loader
def invalid_token_loader_callback(msg):
    return jsonify({
        'error': "Error en la autenticacion.",
        'error_detail':"Token inválido."
    }),401