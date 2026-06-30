import os
import uvicorn

if __name__ == "__main__":
    os.environ.setdefault("SEED_ON_STARTUP", "true")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
