/**
 * ═══════════════════════════════════════════════════════
 * 首页 — C (推荐) + ALL
 *   C: 个性化推荐流 + 猜你喜欢 + 热门榜单
 *   ALL: 搜索入口
 * ═══════════════════════════════════════════════════════
 */

async function homePage() {
    const loggedIn = Auth.isLoggedIn();
    const userInfo = Auth.getUserInfo();

    let recommendItems = [];
    let hotBooks = [];

    try {
        if (loggedIn) {
            const data = await api.recommend.home({ strategy: 'hybrid', top_n: 20 });
            recommendItems = data.items || [];
        }
    } catch (err) {
        console.warn('推荐加载失败:', err.message);
    }

    try {
        const hotData = await api.recommend.hot(12);
        hotBooks = hotData.hot_books || [];
    } catch {
        console.warn('热门加载失败');
    }

    const recommendHtml = recommendItems.length > 0
        ? recommendItems.map((item, i) => renderRecommendItem(item, i)).join('')
        : `<div class="empty-state">
            <div class="icon">📚</div>
            <p>${loggedIn ? '还没有个性化推荐，多读几本书吧！' : '登录后获取专属推荐'}</p>
            ${!loggedIn ? '<a href="#/login"><button class="btn btn-primary">去登录</button></a>' : ''}
           </div>`;

    const hotHtml = hotBooks.length > 0 ? renderBookGrid(hotBooks) : '';

    return `
    <div class="container">
        <div class="profile-header">
            <h2>${loggedIn ? `👋 你好，${userInfo?.username}` : '📖 知书 — 发现你的下一本好书'}</h2>
            <p style="color:#64748b;margin-top:0.5rem;">
                ${loggedIn ? '基于你的阅读偏好和知识图谱推理，为你精选以下推荐' : '基于知识图谱和协同过滤的智能荐书系统'}
            </p>
            <!-- 搜索栏 -->
            <div style="margin-top:1rem;display:flex;gap:8px;max-width:500px;">
                <input id="home-search" class="search-input-lg" placeholder="搜索书名、作者或标签..."
                    onkeydown="if(event.key==='Enter')doHomeSearch()" />
                <button class="btn btn-primary" onclick="doHomeSearch()">🔍 搜索</button>
            </div>
        </div>

        ${loggedIn ? `
        <section style="margin-bottom:2rem;">
            <h3>🎯 为你推荐</h3>
            <div class="recommend-list">${recommendHtml}</div>
        </section>` : ''}

        ${hotHtml ? `
        <section>
            <h3>🔥 热门图书</h3>
            ${hotHtml}
        </section>` : ''}
    </div>
    <script>
        window.doHomeSearch = function() {
            var k = document.getElementById('home-search').value.trim();
            if (k) window.location.hash = '#/search?kw=' + encodeURIComponent(k);
        };
    </script>`;
}
