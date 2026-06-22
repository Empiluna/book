/**
 * ═══════════════════════════════════════════════════════
 * 首页 — 负责人: C (模块三: 个性化推荐)
 * 路由: #/
 * 功能: 个性化推荐流 + 热门榜单
 * ═══════════════════════════════════════════════════════
 */

async function homePage() {
    const loggedIn = Auth.isLoggedIn();
    const userInfo = Auth.getUserInfo();

    // 并行加载推荐和热门
    let recommendItems = [];
    let hotBooks = [];

    try {
        if (loggedIn) {
            const data = await api.recommend.home({ strategy: 'hybrid', top_n: 20 });
            recommendItems = data.items || [];
        }
    } catch (err) {
        console.warn('推荐加载失败，降级为热门:', err.message);
    }

    try {
        const hotData = await api.recommend.hot(12);
        hotBooks = hotData.hot_books || [];
    } catch {
        console.warn('热门加载失败');
    }

    // 渲染
    const recommendHtml = recommendItems.length > 0
        ? recommendItems.map((item, i) => renderRecommendItem(item, i)).join('')
        : `<div class="empty-state">
            <div class="icon">📚</div>
            <p>${loggedIn ? '还没有个性化推荐，多读几本书吧！' : '登录后获取专属推荐'}</p>
            ${!loggedIn ? '<a href="#/login" class="btn btn-primary mt-2">去登录</a>' : ''}
           </div>`;

    const hotHtml = hotBooks.length > 0
        ? renderBookGrid(hotBooks)
        : '';

    return `
    <div class="container">
        <!-- 欢迎区 -->
        <div class="profile-header">
            <h2>${loggedIn ? `👋 你好，${userInfo?.username}` : '📖 知书 — 发现你的下一本好书'}</h2>
            <p style="color:#64748b;margin-top:0.5rem;">
                ${loggedIn
                    ? '基于你的阅读偏好和知识图谱推理，为你精选以下推荐'
                    : '基于知识图谱和协同过滤的智能荐书系统。登录后解锁个性化推荐。'}
            </p>
        </div>

        <!-- 个性化推荐区 (仅登录用户) -->
        ${loggedIn ? `
        <section style="margin-bottom:2rem;">
            <h3 style="margin-bottom:1rem;">🎯 为你推荐</h3>
            <div class="recommend-list">${recommendHtml}</div>
        </section>
        ` : ''}

        <!-- 热门推荐区 -->
        ${hotHtml ? `
        <section>
            <h3 style="margin-bottom:1rem;">🔥 热门图书</h3>
            ${hotHtml}
        </section>
        ` : ''}
    </div>`;
}
