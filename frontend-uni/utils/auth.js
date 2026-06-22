/**
 * ═══════════════════════════════════════════════════════
 * 认证管理 — 负责人: A (模块一)
 * 登录状态、Token 存取、权限判断
 * ═══════════════════════════════════════════════════════
 */

const Auth = {
  isLoggedIn() {
    return !!uni.getStorageSync('access_token');
  },

  isAdmin() {
    const info = this.getUserInfo();
    return info && info.is_admin === true;
  },

  getUserInfo() {
    try {
      return uni.getStorageSync('user_info') || null;
    } catch {
      return null;
    }
  },

  setUserInfo(info) {
    uni.setStorageSync('user_info', info);
  },

  /** 调用后端登录接口 */
  async login(username, password) {
    const { post } = await import('./request.js');
    const data = await post('/user/login', { username, password });
    uni.setStorageSync('access_token', data.access_token);
    this.setUserInfo({
      user_id: data.user_id,
      username: data.username,
      is_admin: data.is_admin || false,
    });
    return data;
  },

  /** 调用后端注册接口 */
  async register(username, email, password) {
    const { post } = await import('./request.js');
    const data = await post('/user/register', { username, email, password });
    uni.setStorageSync('access_token', data.access_token);
    this.setUserInfo({
      user_id: data.user_id,
      username: data.username,
      is_admin: data.is_admin || false,
    });
    return data;
  },

  logout() {
    uni.removeStorageSync('access_token');
    uni.removeStorageSync('user_info');
    uni.reLaunch({ url: '/pages/index/index' });
  },

  requireAdmin() {
    if (!this.isAdmin()) {
      uni.showToast({ title: '需要管理员权限', icon: 'none' });
      uni.switchTab({ url: '/pages/index/index' });
      return false;
    }
    return true;
  },

  /** 如未登录则跳转登录页，返回 true 表示已登录 */
  requireLogin() {
    if (!this.isLoggedIn()) {
      uni.navigateTo({ url: '/pages/login/login' });
      return false;
    }
    return true;
  },
};

export default Auth;
