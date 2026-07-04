基于python实现对豆瓣读书的爬虫
爬取网站：https://book.douban.com/
更改爬取标签需要在 `config.py` 中进行更改,运行main.py实现爬虫功能
爬取内容：
books：book = {
        "title": ,
        "score": ,
        "votes": ,
        "publisher": ,
        "publish_year": ,
        "pages":,
        "price": ,
        "isbn": ,
        "summary": ,
        "authors": [],
        "tags": [],
        "series": ,
        "image_path": ,
    }
authors:{
        "name": ,
        "gender": ,
        "birth_date":,
        "imdb_id": ,
        "death_date": ,
        "birth_place": ,
        "brief_intro": ,
        "url": ,
    },
爬取的数据保存在data/books.json, data/Author.json 
图片保存在images文件中
