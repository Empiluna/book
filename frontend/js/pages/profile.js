/**
 * ═══════════════════════════════════════════════════════
 * 个人中心 — 负责人: A + D
 *   A (模块一): 阅读统计、阅读历史
 *   D (模块四): 书架管理、阅读进度
 * 路由: #/profile
 * ═══════════════════════════════════════════════════════
 */

async function profilePage() {
    if (!Auth.isLoggedIn()) {
        router.navigate('#/login');
        return '<div class="container"><div class="empty-state"><p>请先登录</p></div></div>';
    }

    const userInfo = Auth.getUserInfo();

    // 并行加载
    const [stats, shelves, history, progress] = await Promise.allSettled([
        api.user.getStats().catch(() => ({ books_completed: 0, books_reading: 0 })),
        api.ecosystem.getShelves().catch(() => []),
        api.user.getHistory(20).catch(() => []),
        api.user.getProgress().catch(() => []),
    ]);

    const statsData = stats.status === 'fulfilled' ? stats.value : {};
    const shelfList = shelves.status === 'fulfilled' ? shelves.value : [];
    const historyList = history.status === 'fulfilled' ? history.value : [];
    const progressList = progress.status === 'fulfilled' ? progress.value : [];

    // 统计卡片
    const statsHtml = `
    <div class="profile-stats">
        <div class="stat-card card">
            <div class="num">${statsData.books_completed || 0}</div>
            <div class="label">已读完</div>
        </div>
        <div class="stat-card card">
            <div class="num">${statsData.books_reading || 0}</div>
            <div class="label">在读</div>
        </div>
        <div class="stat-card card">
            <div class="num">${shelfList.length || 0}</div>
            <div class="label">书架数</div>
        </div>
        <div class="stat-card card">
            <div class="num">${historyList.length || 0}</div>
            <div class="label">阅读记录</div>
        </div>
    </div>`;

    // 书架
    let shelfHtml = '';
    let currentShelf = '默认书架';
    if (shelfList.length > 0) {
        const tabs = shelfList.map(s =>
            `<span class="shelf-tab ${s.name === currentShelf ? 'active' : ''}" onclick="loadShelfBooks('${s.name}')">${s.name} (${s.book_count})</span>`
        ).join('');
        shelfHtml = `
        <h3 style="margin-bottom:1rem;">📚 我的书架</h3>
        <div class="shelf-tabs">${tabs}</div>
        <div id="shelfBooks"><div class="empty-state"><p>点击书架查看图书</p></div></div>
        `;
    }

    // 阅读进度
    const progressHtml = progressList.length > 0 ? `
    <h3 style="margin-bottom:1rem;">📖 阅读进度</h3>
    ${progressList.map(p => `
        <div class="card" style="margin-bottom:0.5rem;display:flex;justify-content:space-between;align-items:center;">
            <span>📕 图书#${p.book_id}</span>
            <span style="font-size:0.85rem;color:#64748b;">进度 ${p.progress_percent?.toFixed(0) || 0}%</span>
            <div style="width:120px;height:6px;background:#e2e8f0;border-radius:3px;">
                <div style="width:${p.progress_percent || 0}%;height:100%;background:#2563eb;border-radius:3px;"></div>
            </div>
        </div>
    `).join('')}` : '';

    return `
    <div class="container">
        <!-- 用户信息 -->
        <div class="profile-header">
            <h2>👤 ${userInfo?.username}</h2>
            <p style="color:#64748b;">阅读爱好者</p>
        </div>

        ${statsHtml}
        <div style="margin-top:2rem;">${shelfHtml}</div>
        <div style="margin-top:2rem;">${progressHtml}</div>
    </div>

    <script>
        window.loadShelfBooks = async function(shelfName) {
            const container = document.getElementById('shelfBooks');
            if (!container) return;
            container.innerHTML = '<div class="spinner"></div>';
            try {
                const books = await api.ecosystem.getShelfBooks(shelfName);
                container.innerHTML = books.length > 0
                    ? '<div class="book-grid">' + books.map(b => renderBookCard({id: b.book_id, title: '图书#' + b.book_id, authors: [], tags: []})).join('') + '</div>'
                    : '<div class="empty-state"><p>这个书架还是空的</p></div>';
                // 更新 tab active
                document.querySelectorAll('.shelf-tab').forEach(t => t.classList.remove('active'));
                event.target.classList.add('active');
            } catch (err) {
                container.innerHTML = '<div class="empty-state"><p>加载失败</p></div>';
            }
        };
    </script>`;
}
