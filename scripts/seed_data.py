"""
种子数据脚本 — 填充 MySQL 示例数据
运行: python scripts/seed_data.py
"""
import sys
sys.path.insert(0, ".")

from app.core.database import SessionLocal, engine, Base
from app.models import *

# 确保表已创建
Base.metadata.create_all(bind=engine)


def seed():
    db = SessionLocal()
    try:
        # ── 作者 ──
        if db.query(Author).count() == 0:
            authors = [
                Author(id=1, name="刘慈欣", bio="中国科幻小说代表作家"),
                Author(id=2, name="周志华", bio="南京大学教授，《机器学习》作者"),
                Author(id=3, name="吴军", bio="计算机科学家，硅谷投资人"),
                Author(id=4, name="金庸", bio="武侠小说泰斗"),
                Author(id=5, name="东野圭吾", bio="日本推理小说作家"),
            ]
            db.add_all(authors)
            print("✓ 作者数据已插入")

        # ── 出版社 ──
        if db.query(Publisher).count() == 0:
            publishers = [
                Publisher(id=1, name="重庆出版社"),
                Publisher(id=2, name="清华大学出版社"),
                Publisher(id=3, name="人民邮电出版社"),
                Publisher(id=4, name="机械工业出版社"),
            ]
            db.add_all(publishers)
            print("✓ 出版社数据已插入")

        # ── 标签 ──
        if db.query(Tag).count() == 0:
            tags = [
                Tag(id=1, name="科幻", category="文学"),
                Tag(id=2, name="人工智能", category="科技"),
                Tag(id=3, name="Python", category="编程"),
                Tag(id=4, name="武侠", category="文学"),
                Tag(id=5, name="推理", category="文学"),
                Tag(id=6, name="机器学习", category="科技"),
                Tag(id=7, name="历史", category="人文"),
            ]
            db.add_all(tags)
            print("✓ 标签数据已插入")

        # ── 系列 ──
        if db.query(Series).count() == 0:
            series = [
                Series(id=1, name="三体系列", description="刘慈欣科幻三部曲"),
                Series(id=2, name="Head First系列", description="O'Reilly入门系列"),
                Series(id=3, name="射雕三部曲", description="金庸武侠经典三部曲"),
            ]
            db.add_all(series)
            print("✓ 丛书系列数据已插入")

        # ── 图书 ──
        if db.query(Book).count() == 0:
            books = [
                Book(id=101, title="三体", isbn="9787536692930",
                     publisher_id=1, series_id=1, publication_year=2008,
                     description="中国科幻文学的里程碑之作", page_count=302, hot_score=95.0),
                Book(id=102, title="三体II：黑暗森林", isbn="9787536693968",
                     publisher_id=1, series_id=1, publication_year=2008,
                     description="三体系列第二部", page_count=400, hot_score=92.0),
                Book(id=103, title="三体III：死神永生", isbn="9787536693982",
                     publisher_id=1, series_id=1, publication_year=2010,
                     description="三体系列第三部", page_count=513, hot_score=90.0),
                Book(id=104, title="流浪地球", isbn="9787536692947",
                     publisher_id=1, publication_year=2008,
                     description="刘慈欣短篇科幻小说集", page_count=280, hot_score=88.0),
                Book(id=201, title="机器学习", isbn="9787302423287",
                     publisher_id=2, publication_year=2016,
                     description="机器学习领域经典教材", page_count=425, hot_score=85.0),
            ]
            db.add_all(books)
            db.commit()
            # 关联作者
            db.execute(book_author.insert(), [
                {"book_id": 101, "author_id": 1},
                {"book_id": 102, "author_id": 1},
                {"book_id": 103, "author_id": 1},
                {"book_id": 104, "author_id": 1},
                {"book_id": 201, "author_id": 2},
            ])
            # 关联标签
            db.execute(book_tag.insert(), [
                {"book_id": 101, "tag_id": 1},
                {"book_id": 102, "tag_id": 1},
                {"book_id": 103, "tag_id": 1},
                {"book_id": 104, "tag_id": 1},
                {"book_id": 201, "tag_id": 2},
                {"book_id": 201, "tag_id": 6},
            ])
            print("✓ 图书数据已插入")

        db.commit()
        print("\n✅ 种子数据初始化完成！")

    except Exception as e:
        db.rollback()
        print(f"❌ 错误: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
