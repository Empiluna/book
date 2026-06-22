/**
 * ═══════════════════════════════════════════════════════
 * 图书卡片组件
 * 用于首页推荐流、搜索结果、书架展示
 * ═══════════════════════════════════════════════════════
 */

/**
 * 渲染单张图书卡片
 * @param {object} book - {id, title, authors, cover_url?, avg_rating, tags}
 * @returns {string} HTML
 */
function renderBookCard(book) {
    const title = book.title || '未命名';
    const authors = (book.authors || []).join(' · ');
    const tagsHtml = (book.tags || []).slice(0, 3).map(t =>
        `<span class="tag">${t}</span>`
    ).join('');
    const rating = book.avg_rating ? `⭐ ${book.avg_rating.toFixed(1)}` : '';
    const coverClass = `cover-${(book.id % 5) + 1}`;

    return `
    <div class="book-card" onclick="router.navigate('#/book/${book.id}')">
        <div class="book-cover ${coverClass}">
            ${book.cover_url
                ? `<img src="${book.cover_url}" alt="${title}" style="width:100%;height:100%;object-fit:cover;">`
                : `<span>${title}</span>`
            }
        </div>
        <div class="book-info">
            <div class="title">${title}</div>
            <div class="author">${authors || '未知作者'}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <div class="tags">${tagsHtml}</div>
                <span style="font-size:0.75rem;color:#f59e0b;">${rating}</span>
            </div>
        </div>
    </div>`;
}

/**
 * 渲染推荐列表项（首页流式布局）
 * @param {object} item - {book, score, reason, reason_type}
 * @param {number} index - 排名
 */
function renderRecommendItem(item, index) {
    const book = item.book || item;
    const title = book.title || '未命名';
    const authors = (book.authors || []).join(' · ');
    const reason = item.reason || '';

    return `
    <div class="recommend-item" onclick="router.navigate('#/book/${book.id}')" style="cursor:pointer;">
        <div class="rank">${index + 1}</div>
        <div style="flex:1;">
            <div style="font-weight:600;">${title}</div>
            <div style="font-size:0.85rem;color:#64748b;">${authors}</div>
            ${reason ? `<div class="reason">${reason}</div>` : ''}
        </div>
        ${item.score ? `<div style="font-size:0.8rem;color:#2563eb;">${(item.score * 100).toFixed(0)}% 匹配</div>` : ''}
    </div>`;
}

/**
 * 渲染图书网格
 * @param {Array} books
 */
function renderBookGrid(books) {
    if (!books || books.length === 0) {
        return `<div class="empty-state"><div class="icon">📭</div><p>暂无图书</p></div>`;
    }
    return `<div class="book-grid">${books.map(renderBookCard).join('')}</div>`;
}
