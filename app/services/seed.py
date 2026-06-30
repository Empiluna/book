from __future__ import annotations

from sqlalchemy.orm import Session
from app.core.security import hash_password
from app.models import (
    Author,
    Book,
    BookComment,
    Bookmark,
    Bookshelf,
    GraphRelation,
    Publisher,
    PurchaseLink,
    ReadingHistory,
    ReadingProgress,
    Series,
    SystemConfig,
    Tag,
    User,
    UserRating,
)

BOOKS = [
    ("三体", "刘慈欣", "重庆出版社", "三体系列", "科幻", ["科幻", "宇宙", "经典", "中国文学"], 2008, True, 9.8, "宏大的宇宙文明叙事，展现人类文明与外星文明的碰撞。"),
    ("流浪地球", "刘慈欣", "中国华侨出版社", "刘慈欣作品集", "科幻", ["科幻", "宇宙", "短篇", "灾难"], 2000, False, 8.7, "太阳即将毁灭，人类推动地球离开太阳系寻找新家园。"),
    ("球状闪电", "刘慈欣", "四川科学技术出版社", "刘慈欣作品集", "科幻", ["科幻", "物理", "战争"], 2004, False, 8.2, "从一次球状闪电事故开始，讲述科学探索与战争的边界。"),
    ("深度学习入门", "斋藤康毅", "人民邮电出版社", "技术入门系列", "技术", ["人工智能", "深度学习", "Python", "入门"], 2018, True, 9.0, "用 Python 从零实现深度学习基础算法，适合 AI 初学者。"),
    ("机器学习", "周志华", "清华大学出版社", "AI经典教材", "技术", ["人工智能", "机器学习", "算法", "教材"], 2016, False, 9.5, "系统介绍机器学习的基本理论、模型与算法，是中文机器学习经典教材。"),
    ("Python编程：从入门到实践", "Eric Matthes", "人民邮电出版社", "技术入门系列", "技术", ["Python", "编程", "入门", "项目实践"], 2020, True, 9.1, "通过语法、项目和实践帮助读者掌握 Python 编程。"),
    ("算法图解", "Aditya Bhargava", "人民邮电出版社", "技术入门系列", "技术", ["算法", "图解", "入门", "计算机"], 2017, False, 8.9, "以图解方式讲解搜索、排序、递归、动态规划等核心算法。"),
    ("人类简史", "尤瓦尔·赫拉利", "中信出版社", "简史系列", "历史", ["历史", "人类", "文明", "社科"], 2014, False, 9.2, "从认知革命、农业革命到科技革命，重新审视人类文明进程。"),
    ("未来简史", "尤瓦尔·赫拉利", "中信出版社", "简史系列", "社科", ["未来", "科技", "文明", "社科"], 2017, True, 8.6, "探讨人工智能、生物科技和数据主义对人类未来的影响。"),
    ("活着", "余华", "作家出版社", "余华作品", "文学", ["文学", "现实主义", "生命", "经典"], 1993, False, 9.4, "一个普通人在时代苦难中的生命韧性。"),
    ("许三观卖血记", "余华", "作家出版社", "余华作品", "文学", ["文学", "现实主义", "家庭"], 1995, False, 8.8, "以卖血为线索书写小人物的家庭命运。"),
    ("乌合之众", "古斯塔夫·勒庞", "中央编译出版社", "社会心理经典", "社科", ["心理", "群体", "社会学", "经典"], 1895, False, 8.1, "分析群体心理的经典文本。"),
    ("影响力", "罗伯特·西奥迪尼", "北京联合出版公司", "商业心理系列", "心理", ["心理", "营销", "行为", "商业"], 2019, True, 8.7, "解释说服、从众、承诺一致等影响行为的机制。"),
    ("穷查理宝典", "查理·芒格", "中信出版社", "投资经典", "经济", ["投资", "商业", "思维", "经济"], 2016, False, 9.0, "汇集查理·芒格的多元思维模型与投资智慧。"),
    ("置身事内", "兰小欢", "上海人民出版社", "经济观察", "经济", ["经济", "中国", "政策", "通识"], 2021, True, 9.3, "解释中国政府与经济发展的运行逻辑。"),
    ("设计心理学", "唐纳德·诺曼", "中信出版社", "设计经典", "设计", ["设计", "心理", "用户体验", "产品"], 2015, False, 8.5, "从认知心理解释优秀产品设计的底层原则。"),
    ("原则", "瑞·达利欧", "中信出版社", "商业心理系列", "管理", ["管理", "投资", "决策", "商业"], 2018, False, 8.6, "桥水基金创始人总结的生活与工作原则。"),
    ("枪炮、病菌与钢铁", "贾雷德·戴蒙德", "中信出版社", "文明研究", "历史", ["历史", "文明", "地理", "社科"], 2016, False, 8.9, "解释不同文明发展差异的跨学科经典。"),
    ("娱乐至死", "尼尔·波兹曼", "广西师范大学出版社", "媒介批评", "社科", ["传播", "媒介", "社会学", "经典"], 2011, False, 8.7, "讨论电视媒介如何改变公共话语和文化结构。"),
    ("代码整洁之道", "Robert C. Martin", "人民邮电出版社", "软件工程经典", "技术", ["编程", "软件工程", "代码质量", "进阶"], 2010, False, 8.8, "介绍如何编写可读、可维护、可扩展的代码。"),
]


def get_or_create(db: Session, model, **kwargs):
    if "name" in kwargs and hasattr(model, "name"):
        inst = db.query(model).filter(model.name == kwargs["name"]).first()
    else:
        inst = db.query(model).filter_by(**kwargs).first()
    if inst:
        return inst
    inst = model(**kwargs)
    db.add(inst); db.flush()
    return inst


def seed_database(db: Session) -> None:
    if db.query(Book).count() > 0:
        return
    admin = User(username="admin", email="admin@example.com", hashed_password=hash_password("admin123"), nickname="管理员", is_admin=True)
    demo = User(username="demo", email="demo@example.com", hashed_password=hash_password("demo123"), nickname="演示用户")
    db.add_all([admin, demo]); db.flush()
    for u in [admin, demo]:
        for name in ["想读", "在读", "已读"]:
            db.add(Bookshelf(user_id=u.id, name=name, is_default=True))
    for idx, (title, author_name, publisher_name, series_name, category, tag_names, year, is_new, hot, desc) in enumerate(BOOKS, start=1):
        publisher = get_or_create(db, Publisher, name=publisher_name)
        series = get_or_create(db, Series, name=series_name)
        author = get_or_create(db, Author, name=author_name)
        tags = [get_or_create(db, Tag, name=t, category=category) for t in tag_names]
        book = Book(
            title=title,
            isbn=f"978-7-000-{idx:04d}",
            publisher=publisher,
            series=series,
            publication_year=year,
            category=category,
            difficulty="入门" if "入门" in tag_names else "进阶" if category in {"技术", "经济", "管理"} else "大众",
            description=desc,
            trial_text=(desc + "\n\n" + "这是试读内容。系统会根据登录状态限制可试读页数，阅读器支持翻页、缩放、目录导航、护眼模式和阅读进度自动保存。" * 22),
            ebook_pdf_url="/static/assets/sample-book.pdf" if idx % 2 == 1 else None,
            ebook_epub_url="/static/assets/sample-book.epub" if idx % 2 == 0 else None,
            page_count=220 + idx * 13,
            avg_rating=round(7.8 + (hot % 1.8), 1),
            rating_count=12 + idx * 3,
            view_count=100 + idx * 35,
            hot_score=hot * 10 + idx,
            is_new=is_new,
        )
        book.authors.append(author)
        for tag in tags:
            book.tags.append(tag)
        db.add(book); db.flush()
        for platform, base in [("京东", 39.8), ("当当", 36.5), ("淘宝", 35.0)]:
            db.add(PurchaseLink(book_id=book.id, platform=platform, url=f"https://example.com/{platform}/{book.id}", price=round(base + idx, 2)))
    # Demo behavior: enough for personalized recommendation and ItemCF matrix.
    demo_ratings = [(1, 5), (2, 4.5), (4, 4), (5, 4.5), (10, 4.5), (15, 4.0)]
    for book_id, rating in demo_ratings:
        db.add(UserRating(user_id=demo.id, book_id=book_id, rating=rating))
    # Additional synthetic users for collaborative filtering.
    for uid in range(1, 7):
        user = User(username=f"reader{uid}", email=f"reader{uid}@example.com", hashed_password=hash_password("demo123"), nickname=f"读者{uid}")
        db.add(user); db.flush()
        for name in ["想读", "在读", "已读"]:
            db.add(Bookshelf(user_id=user.id, name=name, is_default=True))
        liked = [1, 2, 3] if uid % 2 else [4, 5, 6, 7]
        liked += [10, 11] if uid % 3 == 0 else [8, 9]
        for bid in liked:
            db.add(UserRating(user_id=user.id, book_id=bid, rating=4.0 + (uid % 3) * 0.3))
    for book_id, shelf, status in [(1, "已读", "read"), (4, "在读", "reading"), (5, "想读", "want_to_read"), (8, "想读", "want_to_read"), (10, "已读", "read")]:
        db.add(Bookmark(user_id=demo.id, book_id=book_id, shelf_name=shelf, reading_status=status))
    for book_id, percent, page, minutes in [(4, 38, 86, 126), (1, 100, 302, 430), (10, 100, 191, 310), (5, 16, 42, 54)]:
        db.add(ReadingProgress(user_id=demo.id, book_id=book_id, progress_percent=percent, current_page=page, reading_minutes=minutes, last_device="Web"))
    for book_id, status in [(1, "read"), (4, "reading"), (5, "want_to_read"), (10, "read")]:
        db.add(ReadingHistory(user_id=demo.id, book_id=book_id, status=status))
    db.add(BookComment(user_id=demo.id, book_id=1, content="宏大的想象力和硬科幻设定都很强，推荐给喜欢宇宙题材的读者。", rating=5, likes_count=8, is_pinned=True))
    db.add(BookComment(user_id=demo.id, book_id=4, content="适合入门，代码解释比较清楚。", rating=4.5, likes_count=4))
    for key, value, desc in [("recommend_weight_kg", "0.4", "KG推荐权重"), ("recommend_weight_cf", "0.4", "CF推荐权重"), ("recommend_weight_hot", "0.1", "热门推荐权重"), ("recommend_weight_new", "0.1", "新书推荐权重")]:
        db.add(SystemConfig(key=key, value=value, description=desc))
    db.commit()
    # Fallback graph relations.
    from app.services.graph_service import GraphService
    GraphService(db).sync_from_mysql()
