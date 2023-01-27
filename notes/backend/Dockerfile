FROM python:3.10-bullseye
ARG DEBIAN_FRONTEND=noninteractive
ENV PATH="/root/.local/bin:$PATH"
WORKDIR /app
COPY . .
RUN apt-get update \
    && apt-get install curl \
    && curl -sSL https://install.python-poetry.org | python3 - \
    && poetry config virtualenvs.in-project true \
    && poetry install \
    && poetry run project/manage.py migrate
CMD poetry run python project/manage.py runserver 0.0.0.0:8000
