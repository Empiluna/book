/**
 * ═══════════════════════════════════════════════════════
 * 搜索结果页
 * 路由: #/search?kw=关键词
 * ═══════════════════════════════════════════════════════
 */

async function searchPage(params) {
    const kw = decodeURIComponent(params.kw || '');
    if (!kw) {
        return `<div class="container">
            <h2>🔍 搜索图书</h2>
            <div style="margin:2rem 0;display:flex;gap:8px;">
                <input id="search-main" class="search-input-lg" placeholder="输入书名、作者或标签..."
                    onkeydown="if(event.key==='Enter')searchBooks()" style="flex:1;padding:0.8rem 1.2rem;font-size:1rem;border:1px solid #e2e8f0;border-radius:8px;" />
                <button class="btn btn-primary" onclick="searchBooks()">搜索</button>
            </div>
            <div class="empty-state"><p>输入关键词开始搜索</p></div>
        </div>
        <script>
            window.searchBooks = function() {
                var k = document.getElementById('search-main').value.trim();
                if (k) window.location.hash = '#/search?kw=' + encodeURIComponent(k);
            };
        </script>`;
    }

    // 搜索结果: 从热门推荐中筛选 + 搜索后端
    let results = [];
    try {
        // 尝试用推荐接口 + 图谱查询来搜书
        const [hotRes, graphRes] = await Promise.allSettled([
            api.recommend.hot(50).catch(() => []),
            api.recommend.home({ strategy: 'hybrid', top_n: 30 }).catch(() => ({ items: [] })),
        ]);

        const hotBooks = hotRes.value || [];
        const recItems = (graphRes.value?.items || []).map(i => i.book);

        // 合并去重并关键词匹配
        const seen = new Set();
        const all = [...hotBooks, ...recItems];
        for (const b of all) {
            if (!b || !b.title) continue;
            if (seen.has(b.id || b.title)) continue;
            const matchTitle = (b.title || '').toLowerCase().includes(kw.toLowerCase());
            const matchAuthor = (b.authors || []).some(a => (a || '').toLowerCase().includes(kw.toLowerCase()));
            const matchTag = (b.tags || []).some(t => (t || '').toLowerCase().includes(kw.toLowerCase()));
            if (matchTitle || matchAuthor || matchTag) {
                seen.add(b.id || b.title);
                results.push(b);
            }
        }
    } catch (e) {
        // fallback
    }

    const resultHtml = results.length > 0
        ? `<div class="book-grid">${results.map(b => renderBookCard({
            id: b.id || b.book_id,
            title: b.title || b.book_title,
            authors: b.authors || [],
            avg_rating: b.avg_rating || 0,
            tags: b.tags || [],
            cover_url: b.cover_url || '',
        })).join('')}</div>`
        : `<div class="empty-state"><p>未找到与 "${kw}" 相关的图书，请更换关键词</p></div>`;

    return `
    <div class="container">
        <h2>🔍 搜索: "${kw}"</h2>
        <div style="margin:1rem 0;display:flex;gap:8px;">
            <input id="search-main" class="search-input-lg" value="${kw}"
                onkeydown="if(event.key==='Enter')searchBooks()" style="flex:1;padding:0.8rem 1.2rem;font-size:1rem;border:1px solid #e2e8f0;border-radius:8px;" />
            <button class="btn btn-primary" onclick="searchBooks()">搜索</button>
        </div>
        <p style="color:#64748b;margin-bottom:1rem;">找到 ${results.length} 个结果</p>
        ${resultHtml}
    </div>
    <script>
        window.searchBooks = function() {
            var k = document.getElementById('search-main').value.trim();
            if (k) window.location.hash = '#/search?kw=' + encodeURIComponent(k);
        };
    </script>`;
}
