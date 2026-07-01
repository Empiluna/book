import os

os.environ.setdefault("DATABASE_URL", "sqlite:///./book_system.db")

from fastapi.testclient import TestClient
from app.main import app


def test_health():
    with TestClient(app) as client:
        r = client.get('/health')
        assert r.status_code == 200
        assert r.json()['status'] == 'ok'


def test_recommend_home():
    with TestClient(app) as client:
        r = client.get('/api/v1/recommend/home')
        assert r.status_code == 200
        assert 'items' in r.json()
        assert len(r.json()['items']) > 0
