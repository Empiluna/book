// ══════════════════════════════════════════════════════
// 基于知识图谱的个性化荐书系统 — Neo4j 初始化脚本
// 负责成员: B
// 执行: docker exec -it bookrec_neo4j cypher-shell -u neo4j -p password123 -f /var/lib/neo4j/import/init.cypher
// ══════════════════════════════════════════════════════

// ── 创建约束（索引） ──
CREATE CONSTRAINT book_id_unique IF NOT EXISTS FOR (b:Book) REQUIRE b.book_id IS UNIQUE;
CREATE CONSTRAINT author_id_unique IF NOT EXISTS FOR (a:Author) REQUIRE a.author_id IS UNIQUE;
CREATE CONSTRAINT tag_id_unique IF NOT EXISTS FOR (t:Tag) REQUIRE t.tag_id IS UNIQUE;
CREATE CONSTRAINT publisher_id_unique IF NOT EXISTS FOR (p:Publisher) REQUIRE p.publisher_id IS UNIQUE;
CREATE CONSTRAINT series_id_unique IF NOT EXISTS FOR (s:Series) REQUIRE s.series_id IS UNIQUE;

// ── 创建索引 ──
CREATE INDEX book_title_index IF NOT EXISTS FOR (b:Book) ON (b.title);
CREATE INDEX author_name_index IF NOT EXISTS FOR (a:Author) ON (a.name);
CREATE INDEX tag_name_index IF NOT EXISTS FOR (t:Tag) ON (t.name);

// ── 示例数据: 作者 ──
MERGE (a1:Author {author_id: 1}) SET a1.name = '刘慈欣', a1.bio = '中国科幻小说作家';
MERGE (a2:Author {author_id: 2}) SET a2.name = '周志华', a2.bio = '南京大学教授';
MERGE (a3:Author {author_id: 3}) SET a3.name = '吴军', a3.bio = '计算机科学家';
MERGE (a4:Author {author_id: 4}) SET a4.name = '金庸', a4.bio = '武侠小说作家';
MERGE (a5:Author {author_id: 5}) SET a5.name = '东野圭吾', a5.bio = '日本推理小说作家';

// ── 示例数据: 出版社 ──
MERGE (p1:Publisher {publisher_id: 1}) SET p1.name = '重庆出版社';
MERGE (p2:Publisher {publisher_id: 2}) SET p2.name = '清华大学出版社';
MERGE (p3:Publisher {publisher_id: 3}) SET p3.name = '人民邮电出版社';
MERGE (p4:Publisher {publisher_id: 4}) SET p4.name = '机械工业出版社';

// ── 示例数据: 标签 ──
MERGE (t1:Tag {tag_id: 1}) SET t1.name = '科幻', t1.category = '文学';
MERGE (t2:Tag {tag_id: 2}) SET t2.name = '人工智能', t1.category = '科技';
MERGE (t3:Tag {tag_id: 3}) SET t3.name = 'Python', t1.category = '编程';
MERGE (t4:Tag {tag_id: 4}) SET t4.name = '武侠', t1.category = '文学';
MERGE (t5:Tag {tag_id: 5}) SET t5.name = '推理', t1.category = '文学';
MERGE (t6:Tag {tag_id: 6}) SET t6.name = '机器学习', t1.category = '科技';
MERGE (t7:Tag {tag_id: 7}) SET t7.name = '历史', t1.category = '人文';

// ── 示例数据: 丛书系列 ──
MERGE (s1:Series {series_id: 1}) SET s1.name = '三体系列', s1.description = '刘慈欣科幻三部曲';
MERGE (s2:Series {series_id: 2}) SET s2.name = 'Head First系列', s1.description = 'O\'Reilly 入门系列丛书';
MERGE (s3:Series {series_id: 3}) SET s3.name = '射雕三部曲', s1.description = '金庸武侠经典三部曲';

// ── 示例数据: 图书 ──
MERGE (b1:Book {book_id: 101}) SET b1.title = '三体', b1.isbn = '9787536692930';
MERGE (b2:Book {book_id: 102}) SET b2.title = '三体II：黑暗森林', b1.isbn = '9787536693968';
MERGE (b3:Book {book_id: 103}) SET b3.title = '三体III：死神永生', b1.isbn = '9787536693982';
MERGE (b4:Book {book_id: 104}) SET b4.title = '流浪地球', b1.isbn = '9787536692947';
MERGE (b5:Book {book_id: 201}) SET b5.title = '机器学习', b1.isbn = '9787302423287';
MERGE (b6:Book {book_id: 202}) SET b6.title = '深度学习入门', b1.isbn = '9787115586911';
MERGE (b7:Book {book_id: 401}) SET b7.title = '射雕英雄传', b1.isbn = '9787020008735';

// ── 关系: 作者 → 图书 ──
MATCH (a:Author {author_id: 1}), (b:Book) WHERE b.book_id IN [101,102,103,104]
MERGE (a)-[:AUTHORED]->(b);
MATCH (a:Author {author_id: 2}), (b:Book {book_id: 201})
MERGE (a)-[:AUTHORED]->(b);
MATCH (a:Author {author_id: 4}), (b:Book {book_id: 401})
MERGE (a)-[:AUTHORED]->(b);

// ── 关系: 出版社 → 图书 ──
MATCH (p:Publisher {publisher_id: 1}), (b:Book) WHERE b.book_id IN [101,102,103,104]
MERGE (b)-[:PUBLISHED]->(p);
MATCH (p:Publisher {publisher_id: 2}), (b:Book {book_id: 201})
MERGE (b)-[:PUBLISHED]->(p);

// ── 关系: 标签 → 图书 ──
MATCH (t:Tag {tag_id: 1}), (b:Book) WHERE b.book_id IN [101,102,103,104]
MERGE (b)-[:TAGGED]->(t);
MATCH (t:Tag {tag_id: 2}), (b:Book {book_id: 201})
MERGE (b)-[:TAGGED]->(t);
MATCH (t:Tag {tag_id: 6}), (b:Book {book_id: 201})
MERGE (b)-[:TAGGED]->(t);
MATCH (t:Tag {tag_id: 4}), (b:Book {book_id: 401})
MERGE (b)-[:TAGGED]->(t);

// ── 关系: 系列 → 图书 ──
MATCH (s:Series {series_id: 1}), (b:Book) WHERE b.book_id IN [101,102,103]
MERGE (b)-[:SERIES_OF]->(s);
MATCH (s:Series {series_id: 3}), (b:Book {book_id: 401})
MERGE (b)-[:SERIES_OF]->(s);

// ── 关系: 相似图书 ──
MATCH (b1:Book {book_id: 101}), (b2:Book {book_id: 104})
MERGE (b1)-[:SIMILAR]->(b2);
MATCH (b1:Book {book_id: 201}), (b2:Book {book_id: 202})
MERGE (b1)-[:SIMILAR]->(b2);

// ── 验证 ──
MATCH (n) RETURN labels(n) AS 类型, count(n) AS 数量 ORDER BY 数量 DESC;
