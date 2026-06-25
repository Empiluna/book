"""兼容直接 python main.py 的入口。推荐使用 uvicorn app.main:app --reload。"""

import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
