"""
═══════════════════════════════════════════════════════
【模块二 · 知识图谱】API 端点
  负责人: B
  /api/v1/graph/...
═══════════════════════════════════════════════════════
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from app.core.database import get_neo4j_session, get_db
from app.api.deps import get_admin_user
from app.models.user import User
from app.schemas.book import (
    GraphQueryRequest, GraphQueryResponse, GraphCandidate,
    GraphEntityCreate, GraphRelationCreate, BookDetail, GraphPath,
)
from app.services.graph_service import GraphService
from sqlalchemy.orm import Session

router = APIRouter()


# ═══════════════════════════════════════════════════════
# 图谱查询 (3.2.2) — 模块三的核心依赖
# ═══════════════════════════════════════════════════════

@router.post("/paths", response_model=GraphQueryResponse, summary="【接口契约】图谱路径查询")
def query_paths(
    req: GraphQueryRequest,
    session=Depends(get_neo4j_session),
    db: Session = Depends(get_db),
):
    """
    【模块二 → 模块三 核心接口】
    从指定图书出发，通过图谱多跳路径发现候选图书。
    模块三的推荐引擎通过此接口获取知识图谱推理结果。

    路径类型：
    - 同作者: Book → Author → Book
    - 同标签: Book → Tag → Book
    - 同系列: Book → Series → Book
    - 同出版社: Book → Publisher → Book
    - 多跳: Book → Author → Book → Tag → Book
    """
    path_weights = {
        "AUTHORED": req.author_weight,
        "TAGGED": req.tag_weight,
        "PUBLISHED": req.publisher_weight,
        "SERIES_OF": req.series_weight,
    }
    result = GraphService.find_paths(
        session,
        book_id=req.book_id,
        max_hops=req.max_hops,
        top_k=req.top_k,
        path_weights=path_weights,
    )

    # 转换为 Pydantic 模型
    candidates = []
    for c in result.get("candidates", []):
        paths = []
        for p in c.get("paths", []):
            paths.append(GraphPath(
                nodes=[],
                relation_chain=[p.get("path_type", "")],
                total_weight=p.get("weight", 0.5),
            ))
        candidates.append(GraphCandidate(
            book_id=c["book_id"],
            book_title=c["book_title"],
            paths=paths,
            final_score=c.get("final_score", 0.0),
        ))

    return GraphQueryResponse(
        source_book_id=result["source_book_id"],
        source_book_title=result.get("source_book_title", ""),
        candidates=candidates,
    )


# ═══════════════════════════════════════════════════════
# 图谱管理 - 管理员
# ═══════════════════════════════════════════════════════

@router.post("/entity", summary="创建图谱实体（管理员）")
def create_entity(
    req: GraphEntityCreate,
    admin: User = Depends(get_admin_user),
    session=Depends(get_neo4j_session),
):
    """管理员导入图书/作者/标签等实体到 Neo4j"""
    GraphService.create_book_entity(
        session,
        book_id=req.properties.get("id", 0),
        title=req.entity_name,
        **req.properties,
    )
    return {"status": "ok"}


@router.post("/relation", summary="创建图谱关系（管理员）")
def create_relation(
    req: GraphRelationCreate,
    admin: User = Depends(get_admin_user),
    session=Depends(get_neo4j_session),
):
    """管理员创建两个实体间的关系"""
    GraphService.create_relation(
        session,
        source_type=req.source_type,
        source_id=req.source_id,
        relation=req.relation,
        target_type=req.target_type,
        target_id=req.target_id,
    )
    return {"status": "ok"}


@router.get("/visualize/{book_id}", summary="获取子图可视化数据")
def get_visualization(
    book_id: int,
    depth: int = Query(2, ge=1, le=4),
    session=Depends(get_neo4j_session),
):
    """
    获取以某图书为中心的子图数据
    用于前端图谱可视化（D3.js / ECharts）
    """
    return GraphService.get_subgraph(session, book_id, depth)


@router.get("/stats", summary="图谱统计")
def get_graph_stats(session=Depends(get_neo4j_session)):
    """获取图谱整体统计数据"""
    return GraphService.get_stats(session)


@router.post("/init", summary="初始化图谱约束（管理员）")
def init_graph(
    admin: User = Depends(get_admin_user),
    session=Depends(get_neo4j_session),
):
    """首次启动时初始化 Neo4j 约束和索引"""
    GraphService.init_graph_constraints(session)
    return {"status": "ok", "message": "图谱约束已创建"}
