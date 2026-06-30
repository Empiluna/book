# 图书资源来源与导入说明

本项目采用 part2 的图书资源来源思路：离线采集 / Open Library / JSON 种子文件 → MySQL → Neo4j → ElasticSearch。

## 1. 离线采集豆瓣图书元数据

```bash
python -m Spider.main --tags 科幻 编程 历史 文学 --pages 1 --limit 80 --output data/books.json
```

说明：爬虫仅用于开发阶段生成种子数据，系统运行时不实时依赖第三方网页。请控制访问频率并遵守目标网站规则。

## 2. Open Library 扩展

```bash
python scripts/import_books.py --openlibrary "machine learning" --input data/openlibrary_books.json
```

## 3. 导入已有 JSON

```bash
python scripts/import_books.py --input data/books.json
```

导入完成后会自动：
1. 写入 MySQL 图书、作者、出版社、系列、标签；
2. 同步 Neo4j / SQL fallback 图谱关系；
3. 重建 ElasticSearch 图书索引。

## 4. 仅导入内置演示数据

```bash
python scripts/import_books.py --seed
```
