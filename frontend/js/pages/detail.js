/**
 * ═══════════════════════════════════════════════════════
 * 图书详情页
 * 路由: #/book/:id
 * 对接: 模块二(B)图谱可视化 + 模块三(C)相似推荐 + 模块四(D)评论/试读/购书
 * ═══════════════════════════════════════════════════════
 */

async function detailPage(params) {
    const bookId = parseInt(params.id);
    if (!bookId) return '<div class="container"><div class="empty-state"><p>图书不存在</p></div></div>';

    // 并行加载所有数据
    const [similarRes, comments, purchaseLinks, trialInfo] = await Promise.allSettled([
        api.recommend.similar(bookId, 6),
        api.ecosystem.getComments(bookId),
        api.ecosystem.getPurchaseLinks(bookId),
        api.ecosystem.getTrial(bookId).catch(() => null),
    ]);

    const similarBooks = similarRes.status === 'fulfilled' ? (similarRes.value.similar_books || []) : [];
    const commentList = comments.status === 'fulfilled' ? comments.value : [];
    const links = purchaseLinks.status === 'fulfilled' ? purchaseLinks.value.prices || [] : [];
    const trial = trialInfo.status === 'fulfilled' ? trialInfo.value : null;

    // 模拟图书详情（后续对接模块二的图书查询接口）
    const book = {
        id: bookId,
        title: '图书 #' + bookId,
        authors: ['加载中...'],
        tags: [],
        description: '图书详情将通过模块二的接口加载',
        avg_rating: 0,
        rating_count: 0,
    };

    const coverClass = `cover-${(bookId % 5) + 1}`;
    const tagsHtml = (book.tags || []).map(t => `<span class="tag">${t}</span>`).join('');

    // 购买链接
    const purchaseHtml = links.length > 0 ? links.map(l =>
        `<a href="${l.url}" target="_blank" class="btn btn-outline btn-sm">🛒 ${l.platform}</a>`
    ).join('') : '';

    // 试读按钮
    const trialBtn = trial
        ? `<button class="btn btn-outline btn-sm" onclick="alert('试读功能开发中')">📖 试读（${trial.allowed_pages}页）</button>`
        : '';

    return `
    <div class="container">
        <div class="book-detail">
            <!-- 封面 -->
            <div>
                <div class="book-detail-cover ${coverClass}">${book.title}</div>
            </div>

            <!-- 信息 -->
            <div>
                <h1>${book.title}</h1>
                <p style="color:#64748b;font-size:1rem;">${(book.authors || []).join(' · ')}</p>
                <div class="book-meta">${tagsHtml}</div>
                ${book.description ? `<p style="margin:1rem 0;">${book.description}</p>` : ''}
                <div style="font-size:0.9rem;color:#64748b;">
                    ⭐ ${book.avg_rating?.toFixed(1) || '暂无'} · ${book.rating_count || 0} 人评价
                </div>

                <!-- 操作按钮 -->
                <div class="book-actions">
                    ${trialBtn}
                    ${purchaseHtml}
                    ${Auth.isLoggedIn() ? `
                        <button class="btn btn-primary btn-sm" onclick="handleAddBookmark(${bookId})">➕ 加入书架</button>
                        <button class="btn btn-ghost btn-sm" onclick="handleRateBook(${bookId})">⭐ 评分</button>
                    ` : ''}
                </div>
            </div>
        </div>

        <!-- 相似图书推荐 — 模块三 -->
        ${similarBooks.length > 0 ? `
        <section style="margin-top:2rem;">
            <h3 style="margin-bottom:1rem;">📚 你可能也喜欢</h3>
            <div class="book-grid">
                ${similarBooks.map(b => renderBookCard({id: b.book_id, title: b.book_title, authors: [], avg_rating: b.score * 5, tags: []})).join('')}
            </div>
        </section>
        ` : ''}

        <!-- 评论区 — 模块四 -->
        <section style="margin-top:2rem;">
            <h3 style="margin-bottom:1rem;">💬 书评 (${commentList.length})</h3>
            ${renderCommentForm(bookId)}
            ${renderCommentList(commentList)}
        </section>
    </div>

    <script>
        // ── 操作 ──
        window.handleAddBookmark = async function(bookId) {
            try {
                await api.user.addBookmark({ book_id: bookId, shelf_name: '默认书架' });
                Toast.show('已加入书架');
            } catch (err) { Toast.show(err.message, 'error'); }
        };
        window.handleRateBook = async function(bookId) {
            const rating = prompt('请评分 (0.5 ~ 5.0):', '4.0');
            if (!rating) return;
            try {
                await api.user.rateBook({ book_id: bookId, rating: parseFloat(rating) });
                Toast.show('评分成功');
            } catch (err) { Toast.show(err.message, 'error'); }
        };
    </script>`;
}
