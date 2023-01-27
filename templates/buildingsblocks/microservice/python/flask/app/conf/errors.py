# installed packages
from flask import jsonify
import traceback

# app code
from ..main import app

@app.errorhandler(Exception) 
def handle_error(e):
    print(f"Exception {e}")
    traceback.print_exc()
    return jsonify({
        'error': "Error en el servidor",
        'error_detail': "Peticion incorrecta, reportar a administrador"
    }),500

@app.errorhandler(Exception) 
def handle_error(e):
    print(f"Exception {e}")
    traceback.print_exc()
    return jsonify({
        'error': "Error en el servidor",
        'error_detail': "Peticion incorrecta, reportar a administrador"
    }),500

# 400 Bad Request
@app.errorhandler(400)
def custom400(error):
    print(f"Exception {error}")
    traceback.print_exc()
    if type(error.description) == dict:
        return jsonify(error.description), 400
    return jsonify({
        'error': "Error en el servidor",
        'error_detail': error.description
    }),400


# 401 Unauthorized
@app.errorhandler(401)
def custom401(error):
    print(f"Exception {error}")
    traceback.print_exc()
    return jsonify({
        'error': "Error en el servidor",
        'error_detail': error.description
    }),401


# 403 Forbidden
@app.errorhandler(403)
def custom403(error):
    print(f"Exception {error}")
    traceback.print_exc()
    return jsonify({
        'error': "Error en el servidor",
        'error_detail': error.description
    }),403


# 404 Not Found
@app.errorhandler(404)
def custom404(error):
    print(f"Exception {error}")
    traceback.print_exc()
    return jsonify({
        'error': "Error en el servidor",
        'error_detail': error.description
    }),404


# 405 Method Not Allowed
@app.errorhandler(405)
def custom405(error):
    print(f"Exception {error}")
    traceback.print_exc()
    return jsonify({
        'error': "Error en el servidor",
        'error_detail': str(error)
    }),405


# 406 Not Acceptable
@app.errorhandler(406)
def custom406(error):
    print(f"Exception {error}")
    traceback.print_exc()
    return jsonify({
        'error': "Error en el servidor",
        'error_detail':error.description
    }),406


# 422 Unprocessable Entity, for flask-apispec, webargs
@app.errorhandler(422)
def custom422(error):
    print(f"Exception {error}")
    traceback.print_exc()

    if hasattr(error, 'exc'):
        return jsonify({
            'error': "Error en el servidor",
            'error_detail':f"Error en los campos, intente de nuevo."
        }), 422
    else:
        return jsonify({
            'error': "Error en el servidor",
            'error_detail':error.description
        }), 422


# 500 Internal Server Error
@app.errorhandler(500)
def custom500(error):
    print(f"Exception {error}")
    traceback.print_exc()
    return jsonify({
        'error': "Error en el servidor",
        'error_detail':error.description
    }),500
