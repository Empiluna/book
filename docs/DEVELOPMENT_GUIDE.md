# 开发指南

## 环境搭建

### 1. 前置要求

- Python 3.11+
- Docker Desktop (Windows/Mac) 或 Docker Engine (Linux)
- Git

### 2. 克隆项目

```bash
git clone <repo-url>
cd PythonProject6
```

### 3. 创建虚拟环境

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Mac/Linux
source .venv/bin/activate
```

### 4. 安装依赖

```bash
pip install -r requirements.txt
```

### 5. 启动基础设施

```bash
docker-compose up -d
```

验证所有服务:
```bash
docker ps  # 应看到 mysql, neo4j, redis, elasticsearch 四个容器
```

### 6. 初始化数据库

```bash
# MySQL 表 → 应用启动时自动创建 (Base.metadata.create_all)
# 填充种子数据
python scripts/seed_data.py

# Neo4j 约束和示例数据
docker exec -it bookrec_neo4j cypher-shell -u neo4j -p password123 \
  -f /var/lib/neo4j/import/init.cypher
```

### 7. 启动应用

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

## 开发工作流

### 分支策略

```
main          ← 稳定版本
  ├─ dev      ← 日常开发 (所有人往这里合)
  │   ├─ module-1-user      ← A
  │   ├─ module-2-graph     ← B
  │   ├─ module-3-recommend ← C
  │   └─ module-4-ecosystem ← D
```

### 日常开发流程

```bash
# 1. 切到自己的分支
git checkout module-1-user

# 2. 开发功能
# 编辑 app/services/user_service.py ...

# 3. 测试 (在 tests/ 下写测试)
pytest tests/test_user.py -v

# 4. 提交
git add .
git commit -m "feat(user): 实现标签偏好计算"
git push origin module-1-user

# 5. 发起 Pull Request → 合并到 dev
```

### Commit 规范

```
feat(module): 新功能描述
fix(module): 修复描述
docs(module): 文档更新
refactor(module): 重构描述

模块标识: user / graph / recommend / ecosystem / core
```

示例:
```
feat(user): 实现基于历史记录的标签偏好权重计算
fix(recommend): 修复 ItemCF 相似度矩阵空值异常
docs(api): 更新模块间接口契约
```

---

## 代码规范

### 文件头注释

每个业务文件需要在顶部标注模块归属:

```python
"""
【模块一 · 用户画像】
  负责成员: A
  功能: 阅读行为采集
"""
```

### 接口文档

所有 API 端点必须有 `summary` 和关键注释:

```python
@router.post("/paths", summary="【接口契约】图谱路径查询")
def query_paths(...):
    """
    从给定图书出发，通过多跳路径发现候选图书。
    调用方: 模块三的推荐引擎
    """
```

### 类型注解

所有函数必须有类型注解:

```python
def build_user_profile(db: Session, user_id: int) -> dict[str, any]:
    ...
```

---

## 测试

### 运行测试

```bash
# 全部测试
pytest

# 单个模块
pytest tests/test_user_service.py -v

# 带覆盖率
pytest --cov=app tests/
```

### 测试文件结构

```
tests/
├── conftest.py                  # fixtures (test_db, test_client...)
├── mock_data.py                 # Mock 数据 (给C开发用)
├── test_user_service.py
├── test_graph_service.py
├── test_recommend_service.py
└── test_ecosystem_service.py
```

### 模块三 Mock 开发示例

```python
# tests/mock_data.py
# C 在 A 和 B 的接口未完成时，使用此数据进行开发

MOCK_PROFILE = {
    "user_id": 1,
    "tag_weights": {"科幻": 0.85, "人工智能": 0.42},
    "favorite_author_ids": [1, 5],
    "high_rated_book_ids": [101, 201],
}

MOCK_GRAPH_RESULT = {
    "source_book_id": 101,
    "source_book_title": "三体",
    "candidates": [
        {
            "book_id": 104,
            "book_title": "流浪地球",
            "paths": [
                {"path_type": "author", "via": "刘慈欣", "hop_count": 1, "weight": 1.0}
            ],
            "final_score": 0.9,
        }
    ],
}
```

---

## 常用命令速查

```bash
# Docker
docker-compose up -d              # 启动所有服务
docker-compose down               # 停止所有服务
docker-compose ps                 # 查看服务状态
docker exec -it bookrec_mysql mysql -ubookrec -pbookrec123 book_recommender

# Neo4j Browser
# 浏览器访问 http://localhost:7474
# 用户名: neo4j  密码: password123

# Python
uvicorn app.main:app --reload     # 启动开发服务器
python scripts/seed_data.py       # 填充种子数据

# Git
git log --oneline -10             # 查看最近提交
git diff                          # 查看未暂存的更改
```

---

## 常见问题

### Q: MySQL 连接失败

```bash
# 检查 MySQL 是否启动
docker ps | grep mysql
# 等待 MySQL 就绪 (首次启动需要 30s 左右)
docker logs bookrec_mysql
```

### Q: Neo4j 连接超时

```bash
# 检查 Neo4j 日志
docker logs bookrec_neo4j
# 确认 Bolt 端口
curl http://localhost:7474
```

### Q: 模块导入报错 `ModuleNotFoundError: No module named 'app'`

确保在项目根目录下运行:
```bash
cd C:\Users\Emp\PycharmProjects\PythonProject6
python -c "import app; print('OK')"
```

### Q: JWT 认证失败

确认请求 Header 格式:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```
注意 `Bearer` 后面有一个空格。
