--install Python 3.9


-- config virtual enviroment
py -3.9 -m venv .venv
.venv\scripts\activate

-- install requirements
pip install -r requirements.txt


uvicorn app.main:app --reload

