/**
 * ═══════════════════════════════════════════════════════
 * 认证管理 — 负责人: A (模块一: 用户画像)
 * 登录状态、用户信息、权限判断
 * ═══════════════════════════════════════════════════════
 */

const Auth = {
    isLoggedIn() {
        return !!localStorage.getItem('access_token');
    },

    isAdmin() {
        const info = this.getUserInfo();
        return info && info.is_admin === true;
    },

    getUserInfo() {
        try {
            return JSON.parse(localStorage.getItem('user_info'));
        } catch {
            return null;
        }
    },

    setUserInfo(info) {
        localStorage.setItem('user_info', JSON.stringify(info));
    },

    async login(username, password) {
        const data = await api.user.login({ username, password });
        api.setToken(data.access_token);
        this.setUserInfo({
            user_id: data.user_id,
            username: data.username,
        });
        return data;
    },

    async register(username, email, password) {
        const data = await api.user.register({ username, email, password });
        api.setToken(data.access_token);
        this.setUserInfo({
            user_id: data.user_id,
            username: data.username,
        });
        return data;
    },

    logout() {
        api.clearToken();
        window.location.hash = '#/';
        window.location.reload();
    },

    /** 检查是否为管理员，否则跳转首页 */
    requireAdmin() {
        if (!this.isAdmin()) {
            Toast.show('需要管理员权限', 'error');
            window.location.hash = '#/';
            return false;
        }
        return true;
    },

    /** 如果已登录，跳转首页（用于登录页） */
    redirectIfLoggedIn() {
        if (this.isLoggedIn()) {
            window.location.hash = '#/';
        }
    },
};
