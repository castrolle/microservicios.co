
FROM python:3.6.8-slim

ENV FLASK_APP app.main

RUN pip install --upgrade pip

COPY . /app
COPY requirements.txt ./requirements.txt
RUN pip install -r requirements.txt
EXPOSE 80

WORKDIR /app

RUN echo "flask run --host=0.0.0.0 --port=80" > run.sh
ENTRYPOINT ["sh", "run.sh"]

