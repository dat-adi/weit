# Weit Backend

This is the backend for the weit frontend application.
The backend is based on [FastAPI](https://fastapi.tiangolo.com/) and sqlite3.
It also utilizes the [uv](https://github.com/astral-sh/uv) package manager.

To populate the database, run the command,
```bash
make db
```

To set up the environment, run:
```bash
uv sync
```

To activate the environment and spin up the backend, run:
```bash
source .venv/bin/activate
fastapi dev main.py
```
