"""后端冒烟测试。先启动 uvicorn 后运行：python scripts/smoke_test.py"""

import requests

BASE = "http://localhost:8000"

print("health:", requests.get(f"{BASE}/health", timeout=5).json())
print("books:", requests.get(f"{BASE}/api/v1/graph/books", timeout=5).json()[:2])

payload = {"username": "demo_user", "email": "demo_user@example.com", "password": "123456"}
r = requests.post(f"{BASE}/api/v1/user/register", json=payload, timeout=5)
if r.status_code >= 400:
    r = requests.post(f"{BASE}/api/v1/user/login", json={"username": payload["username"], "password": payload["password"]}, timeout=5)
print("login/register:", r.status_code)
token = r.json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}
print("profile:", requests.get(f"{BASE}/api/v1/user/profile", headers=headers, timeout=5).json())
print("recommend:", requests.get(f"{BASE}/api/v1/recommend/home", headers=headers, timeout=5).json()["scene"])
print("chat:", requests.post(f"{BASE}/api/v1/chat/send", json={"message": "推荐几本人工智能入门书"}, headers=headers, timeout=10).json())
