/**
 * ═══════════════════════════════════════════════════════
 * 简易全局状态管理 — [ALL 共用]
 * 用 Vue reactive 替代 Pinia，避免额外依赖
 * ═══════════════════════════════════════════════════════
 */

import { reactive } from 'vue';

export const store = reactive({
  // 用户状态
  userInfo: uni.getStorageSync('user_info') || null,
  isLoggedIn: !!uni.getStorageSync('access_token'),

  // 推荐列表缓存
  recommendList: [],
  hotBooks: [],

  // 书架数据
  shelves: [],
  currentShelf: '默认书架',

  // ── Actions ──
  setUser(info) {
    this.userInfo = info;
    this.isLoggedIn = !!info;
    if (info) {
      uni.setStorageSync('user_info', info);
    }
  },

  clearUser() {
    this.userInfo = null;
    this.isLoggedIn = false;
    uni.removeStorageSync('user_info');
    uni.removeStorageSync('access_token');
  },
});
