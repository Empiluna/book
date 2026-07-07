from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user_optional, require_admin
from app.core.cache import cache
from app.core.database import get_db
from app.models import User
from app.schemas import GraphEntityCreate, GraphPathRequest, GraphRelationCreate
from app.services.graph_service import GraphService

router = APIRouter(prefix="/graph", tags=["模块二 · 知识图谱"])


@router.post("/paths")
def paths(data: GraphPathRequest, db: Session = Depends(get_db)):
    return GraphService(db).find_paths(data.book_id, data.max_hops, data.top_k, data.path_weights)


@router.get("/semantic-paths/{book_id}")
def semantic_paths(book_id: int, top_k: int = Query(10, ge=1, le=50), db: Session = Depends(get_db)):
    """返回领域、主题、适读人群、关键词、难度和续读路径等高级语义推理结果。"""
    return GraphService(db).semantic_paths(book_id, top_k)


@router.get("/profile-graph")
def profile_graph(
    mode: str = Query("profile", pattern="^(profile|recent|high_rated|manual)$"),
    book_id: int | None = Query(None),
    depth: int = Query(2, ge=1, le=2),
    limit: int = Query(24, ge=10, le=60),
    user: User | None = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    """用户侧图谱：默认以“我的阅读画像”为中心，也可切换最近阅读/高分图书/手动选择图书。"""
    user_id = user.id if user else 0
    cache_key = f"profile_graph:{user_id}:{mode}:{book_id or 0}:{depth}:{limit}"
    cached = cache.get(cache_key)
    if cached:
        return cached
    result = GraphService(db).profile_graph(user, mode=mode, book_id=book_id, depth=depth, limit=limit)
    cache.set(cache_key, result, ttl=60)
    return result


@router.get("/explain/{source_id}/{target_id}")
def explain_between(source_id: int, target_id: int, db: Session = Depends(get_db)):
    """解释两本书之间的图谱推理路径。"""
    return GraphService(db).explain_between(source_id, target_id)


@router.get("/subgraph/{book_id}")
def subgraph(book_id: int, depth: int = Query(1, ge=1, le=2), db: Session = Depends(get_db)):
    return GraphService(db).subgraph(book_id, depth)


@router.get("/stats")
def stats(db: Session = Depends(get_db)):
    return GraphService(db).stats()


@router.post("/admin/init")
def init(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    return GraphService(db).init_graph_constraints()


@router.post("/admin/sync")
def sync(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    return GraphService(db).sync_from_mysql()


@router.post("/admin/semantic/enrich")
def semantic_enrich(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    """重新构建基础图谱和高级语义图谱。"""
    return GraphService(db).sync_from_mysql()


@router.post("/admin/entities")
def create_entity(data: GraphEntityCreate, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    props = {**(data.properties or {})}
    if data.name:
        props.setdefault("name", data.name)
    return GraphService(db).create_entity(data.entity_type, data.entity_id, props)


@router.post("/admin/relations")
def create_relation(data: GraphRelationCreate, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    return GraphService(db).create_relation(data.source_type, data.source_id, data.relation_type, data.target_type, data.target_id, data.weight)


@router.post("/admin/cypher")
def cypher(payload: dict, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    return GraphService(db).query_cypher(payload.get("cypher", "RETURN 1"), payload.get("params") or {})
