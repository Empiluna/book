/**
 * ═══════════════════════════════════════════════════════
 * 图书详情页 — B + C + D + ALL
 *   B: 图谱可视化数据
 *   C: "你可能也喜欢"相似推荐
 *   D: 试读、购书链接、评论
 *   ALL: 搜索后端获取真实图书信息
 * ═══════════════════════════════════════════════════════
 */

async function detailPage(params) {
    const bookId = parseInt(params.id);
    if (!bookId) return '<div class="container"><div class="empty-state"><p>图书不存在</p></div></div>';

    // 并行加载所有数据
    const [similarRes, commentsRes, linksRes, trialRes, graphRes] = await Promise.allSettled([
        api.recommend.similar(bookId, 6).catch(() => ({ similar_books: [] })),
        api.ecosystem.getComments(bookId).catch(() => []),
        api.ecosystem.getPurchaseLinks(bookId).catch(() => ({ prices: [] })),
        api.ecosystem.getTrial(bookId).catch(() => null),
        api.graph.getVisualization(bookId, 2).catch(() => null),
    ]);

    const similarBooks = similarRes.value?.similar_books || [];
    const commentList = commentsRes.value || [];
    const links = linksRes.value?.prices || [];
    const trial = trialRes.value;
    const graphData = graphRes.value;

    // 从推荐/图谱数据中提取图书信息
    const firstSimilar = similarBooks[0] || {};
    const book = {
        id: bookId,
        title: firstSimilar.book_title || graphData?.source_book_title || `图书 #${bookId}`,
        authors: firstSimilar.authors || graphData?.authors || [],
        tags: firstSimilar.tags || graphData?.tags || [],
        description: firstSimilar.description || '',
        avg_rating: firstSimilar.avg_rating || 0,
        rating_count: firstSimilar.rating_count || 0,
        cover_url: firstSimilar.cover_url || '',
    };

    const coverClass = !book.cover_url ? `cover-${(bookId % 5) + 1}` : '';
    const coverStyle = book.cover_url ? `background-image:url(${book.cover_url});background-size:cover;` : '';
    const tagsHtml = (book.tags || []).map(t => `<span class="tag">${t}</span>`).join('');

    // 购买链接
    const purchaseHtml = links.length > 0 ? links.map(l =>
        `<a href="${l.url || '#'}" target="_blank" class="btn btn-sm">🛒 ${l.platform || '购买'}</a>`
    ).join('') : '';

    // 试读
    const trialBtn = trial
        ? `<button class="btn btn-sm" onclick="handleTrial(${bookId})">📖 试读（${trial.allowed_pages}页）</button>`
        : '';

    // 图谱关联
    const graphHtml = graphData && graphData.nodes ? `
    <section style="margin-top:2rem;">
        <h3>🕸️ 知识图谱关联</h3>
        <div class="graph-mini">
            <p style="color:#64748b;font-size:0.9rem;">关联节点: ${graphData.nodes?.length || 0} 个 · 关系: ${graphData.edges?.length || 0} 条</p>
        </div>
    </section>` : '';

    return `
    <div class="container">
        <a href="#/" style="color:#64748b;font-size:0.9rem;">← 返回首页</a>

        <div class="book-detail" style="margin-top:1rem;">
            <div>
                <div class="book-detail-cover ${coverClass}" style="${coverStyle}">
                    ${!book.cover_url ? book.title : ''}
                </div>
            </div>
            <div>
                <h1>${book.title}</h1>
                <p style="color:#64748b;font-size:1rem;">${(book.authors || []).join(' · ') || '作者信息加载中...'}</p>
                <div class="book-meta">${tagsHtml}</div>
                ${book.description ? `<p style="margin:1rem 0;color:#475569;line-height:1.6;">${book.description}</p>` : ''}
                <div style="font-size:0.9rem;color:#64748b;margin:0.5rem 0;">
                    ⭐ ${book.avg_rating?.toFixed(1) || '暂无'} · ${book.rating_count || 0} 人评价
                </div>
                <div class="book-actions" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:1rem;">
                    ${trialBtn}
                    ${purchaseHtml}
                    ${Auth.isLoggedIn() ? `
                        <button class="btn btn-sm btn-primary" onclick="handleAddBookmark(${bookId})">➕ 加入书架</button>
                        <button class="btn btn-sm" onclick="handleRateBook(${bookId})">⭐ 评分</button>
                    ` : '<span style="color:#94a3b8;font-size:0.85rem;">登录后可收藏和评分</span>'}
                </div>
            </div>
        </div>

        ${graphHtml}

        <!-- 相似推荐 -->
        ${similarBooks.length > 0 ? `
        <section style="margin-top:2rem;">
            <h3>📚 你可能也喜欢</h3>
            <div class="book-grid">
                ${similarBooks.map(b => renderBookCard({
                    id: b.book_id || b.id,
                    title: b.book_title || b.title,
                    authors: b.authors || [],
                    avg_rating: (b.score || 0) * 5,
                    tags: b.tags || [],
                    cover_url: b.cover_url || '',
                })).join('')}
            </div>
        </section>` : ''}

        <!-- 评论区 -->
        <section style="margin-top:2rem;">
            <h3>💬 书评 (${commentList.length})</h3>
            ${renderCommentForm(bookId)}
            ${renderCommentList(commentList)}
        </section>
    </div>

    <script>
        window.handleAddBookmark = async function(bid) {
            try {
                await api.user.addBookmark({ book_id: bid, shelf_name: '默认书架' });
                Toast.show('已加入书架');
            } catch (err) { Toast.show(err.message, 'error'); }
        };
        window.handleRateBook = async function(bid) {
            const rating = prompt('请评分 (0.5 ~ 5.0):', '4.0');
            if (!rating) return;
            try {
                await api.user.rateBook({ book_id: bid, rating: parseFloat(rating) });
                Toast.show('评分成功'); router.resolve();
            } catch (err) { Toast.show(err.message, 'error'); }
        };
        window.handleTrial = async function(bid) {
            try {
                const content = await api.ecosystem.getTrialContent(bid);
                if (content && content.content) {
                    alert('试读内容:\\n\\n' + content.content.substring(0, 500) + '...');
                } else {
                    Toast.show('试读内容暂不可用');
                }
            } catch (err) { Toast.show('试读功能开发中', 'error'); }
        };
    </script>`;
}
