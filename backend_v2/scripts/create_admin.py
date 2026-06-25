"""创建管理员账号：python scripts/create_admin.py admin admin@example.com 123456"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import app.models  # noqa: F401
from app.core.database import Base, SessionLocal, engine
from app.models.user import User
from app.core.security import hash_password


def main():
    username = sys.argv[1] if len(sys.argv) > 1 else "admin"
    email = sys.argv[2] if len(sys.argv) > 2 else "admin@example.com"
    password = sys.argv[3] if len(sys.argv) > 3 else "123456"
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.username == username).first()
        if user:
            user.email = email
            user.hashed_password = hash_password(password)
            user.is_active = True
            user.is_admin = True
            print(f"updated admin: {username} / {password}")
        else:
            user = User(username=username, email=email, hashed_password=hash_password(password), is_admin=True, is_active=True)
            db.add(user)
            print(f"created admin: {username} / {password}")
        db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    main()
