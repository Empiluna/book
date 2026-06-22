-- ══════════════════════════════════════════════════════
-- 基于知识图谱的个性化荐书系统 — MySQL 初始化脚本
-- 对应 Docker Compose 自动执行
-- ══════════════════════════════════════════════════════

-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS book_recommender
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE book_recommender;

-- ═══════════════════════════════════
-- 用户表 (模块一 | A)
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(128) NOT NULL UNIQUE,
    hashed_password VARCHAR(256) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 作者表
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    bio TEXT,
    avatar_url VARCHAR(512),
    INDEX idx_author_name (name)
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 出版社表
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS publishers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 标签表
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE,
    category VARCHAR(32),
    INDEX idx_tag_name (name),
    INDEX idx_tag_category (category)
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 丛书系列表
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS series (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    description TEXT
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 图书主表 (模块二 | B)
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(256) NOT NULL,
    subtitle VARCHAR(256),
    isbn VARCHAR(20) UNIQUE,
    publisher_id INT,
    series_id INT,
    publication_year INT,
    description TEXT,
    cover_url VARCHAR(512),
    page_count INT,
    language VARCHAR(32) DEFAULT 'zh-CN',
    avg_rating FLOAT DEFAULT 0.0,
    rating_count INT DEFAULT 0,
    is_new BOOLEAN DEFAULT FALSE,
    hot_score FLOAT DEFAULT 0.0,
    purchase_url_jd VARCHAR(512),
    purchase_url_dd VARCHAR(512),
    purchase_url_tb VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (publisher_id) REFERENCES publishers(id),
    FOREIGN KEY (series_id) REFERENCES series(id),
    INDEX idx_title (title),
    INDEX idx_hot_score (hot_score),
    INDEX idx_is_new (is_new)
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 图书-作者关联表
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS book_author (
    book_id INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 图书-标签关联表
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS book_tag (
    book_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (book_id, tag_id),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 阅读历史 (模块一 | A)
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS reading_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    status VARCHAR(20) DEFAULT 'read',
    read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id),
    INDEX idx_history_user (user_id)
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 搜索日志 (模块一 | A)
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS search_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    keyword VARCHAR(256) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_search_user_time (user_id, created_at)
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 书架收藏 (模块四 | D)
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS bookmarks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    shelf_name VARCHAR(64) DEFAULT '默认书架',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id),
    INDEX idx_bookmark_user_shelf (user_id, shelf_name)
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 阅读进度 (模块一 | A)
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS reading_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    progress_percent FLOAT DEFAULT 0.0,
    current_page INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id),
    UNIQUE INDEX idx_progress_user_book (user_id, book_id)
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 用户评分 (模块一 | A)
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS user_ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    rating FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id),
    UNIQUE INDEX idx_rating_user_book (user_id, book_id)
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 书评 (模块四 | D)
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS book_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    content TEXT NOT NULL,
    likes_count INT DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id),
    INDEX idx_comments_book (book_id, is_pinned, likes_count)
) ENGINE=InnoDB;

-- ═══════════════════════════════════
-- 评论点赞 (模块四 | D)
-- ═══════════════════════════════════
CREATE TABLE IF NOT EXISTS comment_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (comment_id) REFERENCES book_comments(id) ON DELETE CASCADE,
    UNIQUE INDEX idx_like_user_comment (user_id, comment_id)
) ENGINE=InnoDB;
