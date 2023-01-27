--Instalar Python 3.6 + Flask



-- configurar virtual enviroment
py -3.6 -m venv .venv
.venv\scripts\activate


--Instalar Flask
pip install flask==1.1.4

-- Instalar complemento de python para vs code
-- Seleccionar interprete del virtual envirment

-- Actualizar pip
python -m pip install --upgrade pip

-- instalar requerimientos
pip install -r requirements.txt

set FLASK_APP=app.main
set FLASK_ENV=development
flask run

