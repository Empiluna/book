# app/main.py

from fastapi import FastAPI
from app.api.v1.router import api_router

app = FastAPI(
    title="基于知识图谱的个性化荐书系统",
    description="软件工程实训项目后端接口",
    version="2.0.0",
)

@app.get("/")
def root():
    return {"message": "基于知识图谱的个性化荐书系统后端启动成功"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(api_router, prefix="/api/v1")
