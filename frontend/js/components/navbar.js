/**
 * ═══════════════════════════════════════════════════════
 * 导航栏组件 — 含搜索栏 + 智能助手入口
 * ═══════════════════════════════════════════════════════
 */

function renderNavbar() {
    const loggedIn = Auth.isLoggedIn();
    const userInfo = Auth.getUserInfo();
    const isAdmin = Auth.isAdmin();

    const navLinks = [
        { href: '#/', label: '发现' },
    ];
    if (loggedIn) {
        navLinks.push({ href: '#/profile', label: '我的书架' });
    }
    if (isAdmin) {
        navLinks.push({ href: '#/admin', label: '管理' });
    }

    const linksHtml = navLinks.map(l => {
        const isActive = (window.location.hash || '#/') === l.href;
        return `<a href="${l.href}" class="nav-link${isActive ? ' active' : ''}">${l.label}</a>`;
    }).join('');

    const userHtml = loggedIn
        ? `<span class="nav-user">👤 ${userInfo?.username || ''}</span>
           <button class="btn btn-sm" onclick="Auth.logout()">退出</button>`
        : `<a href="#/login"><button class="btn btn-sm btn-primary">登录</button></a>`;

    return `
    <nav class="navbar">
        <a href="#/" class="navbar-brand">📖 知书</a>
        <div class="nav-search">
            <input id="nav-search-input" class="nav-search-input" placeholder="搜索书名、作者..."
                onkeydown="if(event.key==='Enter')handleNavSearch()" />
            <button class="nav-search-btn" onclick="handleNavSearch()">🔍</button>
        </div>
        <div class="navbar-links">${linksHtml}</div>
        <div class="navbar-actions">${userHtml}</div>
    </nav>`;
}

function handleNavSearch() {
    const kw = document.getElementById('nav-search-input').value.trim();
    if (kw) window.location.hash = `#/search?kw=${encodeURIComponent(kw)}`;
}

function refreshNavbar() {
    const existing = document.querySelector('.navbar');
    if (existing) {
        existing.outerHTML = renderNavbar();
    }
}
