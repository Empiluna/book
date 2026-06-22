/**
 * ═══════════════════════════════════════════════════════
 * 导航栏组件
 * 根据登录状态动态渲染：未登录显示登录按钮，已登录显示用户菜单
 * ═══════════════════════════════════════════════════════
 */

function renderNavbar() {
    const loggedIn = Auth.isLoggedIn();
    const userInfo = Auth.getUserInfo();
    const isAdmin = Auth.isAdmin();

    const navLinks = [
        { href: '#/', label: '🏠 首页' },
    ];

    if (loggedIn) {
        navLinks.push({ href: '#/profile', label: '📚 我的书架' });
    }
    if (isAdmin) {
        navLinks.push({ href: '#/admin', label: '⚙️ 管理' });
    }

    const linksHtml = navLinks.map(l => {
        const isActive = (window.location.hash || '#/') === l.href;
        return `<a href="${l.href}" class="${isActive ? 'active' : ''}">${l.label}</a>`;
    }).join('');

    const userHtml = loggedIn
        ? `<span class="username">👤 ${userInfo?.username || ''}</span>
           <button class="btn btn-outline btn-sm" onclick="Auth.logout()">退出</button>`
        : `<a href="#/login"><button class="btn btn-primary btn-sm">登录</button></a>`;

    return `
    <nav class="navbar">
        <a href="#/" class="navbar-brand">📖 知书</a>
        <ul class="navbar-nav">${linksHtml}</ul>
        <div class="navbar-user">${userHtml}</div>
    </nav>`;
}

/** 刷新导航栏（登录/登出后调用） */
function refreshNavbar() {
    const existing = document.querySelector('.navbar');
    if (existing) {
        existing.outerHTML = renderNavbar();
    }
}
