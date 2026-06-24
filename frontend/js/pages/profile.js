/**
 * ═══════════════════════════════════════════════════════
 * 个人中心 — A + D + ALL
 *   A: 阅读统计、阅读历史
 *   D: 书架管理、阅读进度
 *   ALL: 真实数据集成
 * ═══════════════════════════════════════════════════════
 */

async function profilePage() {
    if (!Auth.isLoggedIn()) {
        router.navigate('#/login');
        return '<div class="container"><div class="empty-state"><p>请先登录</p></div></div>';
    }

    const userInfo = Auth.getUserInfo();

    const [stats, shelves, history, progress] = await Promise.allSettled([
        api.user.getStats().catch(() => ({})),
        api.ecosystem.getShelves().catch(() => []),
        api.user.getHistory(30).catch(() => []),
        api.user.getProgress().catch(() => []),
    ]);

    const statsData = stats.value || {};
    const shelfList = shelves.value || [];
    const historyList = history.value || [];
    const progressList = progress.value || [];

    // 统计卡片
    const statCards = [
        { num: statsData.books_completed || 0, label: '已读完' },
        { num: statsData.books_reading || 0, label: '在读' },
        { num: shelfList.length || 0, label: '书架数' },
        { num: historyList.length || 0, label: '阅读记录' },
    ];
    const statsHtml = `<div class="profile-stats">${statCards.map(s =>
        `<div class="stat-card card"><div class="num">${s.num}</div><div class="label">${s.label}</div></div>`
    ).join('')}</div>`;

    // 阅读历史表格
    const historyHtml = historyList.length > 0 ? `
    <section style="margin-top:2rem;">
        <h3>📜 最近阅读</h3>
        <div class="history-list">
            ${historyList.slice(0, 20).map(h => `
            <div class="history-item card" style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 1rem;margin-bottom:0.4rem;">
                <span>📕 ${h.book_title || '图书#' + h.book_id}</span>
                <span class="tag">${h.status === 'read' ? '已读' : h.status === 'reading' ? '在读' : '想读'}</span>
                <span style="color:#94a3b8;font-size:0.8rem;">${h.read_at ? new Date(h.read_at).toLocaleDateString() : ''}</span>
            </div>`).join('')}
        </div>
    </section>` : '';

    // 书架
    let shelfHtml = '';
    if (shelfList.length > 0) {
        const tabs = shelfList.map(s =>
            `<span class="shelf-tab${s.name === '默认书架' ? ' active' : ''}" onclick="loadShelfBooks('${s.name}')">${s.name} (${s.book_count})</span>`
        ).join('');
        shelfHtml = `
        <section style="margin-top:2rem;">
            <h3>📚 我的书架</h3>
            <div class="shelf-tabs">${tabs}</div>
            <div id="shelfBooks"><div class="empty-state"><p>点击书架查看图书</p></div></div>
        </section>`;
    }

    // 阅读进度
    const progressHtml = progressList.length > 0 ? `
    <section style="margin-top:2rem;">
        <h3>📖 阅读进度</h3>
        ${progressList.map(p => `
        <div class="card" style="margin-bottom:0.5rem;display:flex;justify-content:space-between;align-items:center;padding:0.6rem 1rem;gap:1rem;">
            <span style="flex:1;">📕 ${p.book_title || '图书#' + p.book_id}</span>
            <span style="font-size:0.85rem;color:#64748b;white-space:nowrap;">${(p.progress_percent || 0).toFixed(0)}%</span>
            <div style="width:120px;height:6px;background:#e2e8f0;border-radius:3px;flex-shrink:0;">
                <div style="width:${p.progress_percent || 0}%;height:100%;background:#2563eb;border-radius:3px;"></div>
            </div>
        </div>`).join('')}
    </section>` : '';

    return `
    <div class="container">
        <div class="profile-header">
            <h2>👤 ${userInfo?.username || '用户'}</h2>
            <p style="color:#64748b;">阅读爱好者</p>
        </div>
        ${statsHtml}
        ${historyHtml}
        ${shelfHtml}
        ${progressHtml}
    </div>
    <script>
        window.loadShelfBooks = async function(name) {
            var c = document.getElementById('shelfBooks');
            if (!c) return;
            c.innerHTML = '<div class="spinner"></div>';
            try {
                var books = await api.ecosystem.getShelfBooks(name);
                c.innerHTML = books.length > 0
                    ? '<div class="book-grid">' + books.map(function(b) { return renderBookCard({id: b.book_id, title: b.book_title || '图书#' + b.book_id, authors: b.authors || [], tags: b.tags || [], cover_url: b.cover_url || ''}); }).join('') + '</div>'
                    : '<div class="empty-state"><p>这个书架还是空的</p></div>';
                document.querySelectorAll('.shelf-tab').forEach(function(t) { t.classList.remove('active'); });
                if (event && event.target) event.target.classList.add('active');
            } catch (err) { c.innerHTML = '<div class="empty-state"><p>加载失败</p></div>'; }
        };
    </script>`;
}
