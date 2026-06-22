<template>
  <!--
    profile.vue — 个人中心
    负责人: A (用户画像/统计) + D (书架入口)
    路由: pages/profile/profile (Tab)
  -->
  <view class="page">
    <!-- 未登录 -->
    <view v-if="!store.isLoggedIn" class="profile-header">
      <text class="avatar">📖</text>
      <navigator url="/pages/login/login">
        <button class="btn-primary">登录 / 注册</button>
      </navigator>
    </view>

    <!-- 已登录 -->
    <block v-else>
      <view class="profile-header">
        <text class="avatar">👤</text>
        <text class="username">{{ store.userInfo?.username }}</text>
        <view class="actions">
          <button class="btn-outline btn-sm" @click="goShelf">📚 我的书架</button>
          <button v-if="store.userInfo?.is_admin" class="btn-outline btn-sm" @click="goAdmin">⚙️ 管理</button>
        </view>
      </view>

      <!-- 阅读统计 -->
      <view class="section-title">📊 阅读统计</view>
      <view v-if="stats" class="stats-grid">
        <view class="stat-card">
          <text class="num">{{ stats.books_completed || 0 }}</text>
          <text class="label">已读完</text>
        </view>
        <view class="stat-card">
          <text class="num">{{ stats.books_reading || 0 }}</text>
          <text class="label">在读</text>
        </view>
        <view class="stat-card">
          <text class="num">{{ stats.total_reading_time_minutes || 0 }}min</text>
          <text class="label">阅读时长</text>
        </view>
      </view>

      <!-- 功能入口 -->
      <view class="section-title">🔧 功能</view>
      <view class="menu-list">
        <view class="menu-item" @click="loadReadingHistory">📜 阅读历史</view>
        <view class="menu-item" @click="showAbout">ℹ️ 关于知书</view>
        <view class="menu-item logout" @click="handleLogout">🚪 退出登录</view>
      </view>
    </block>
  </view>
</template>

<script>
import { store } from '../../store/index.js';
import { api } from '../../api/index.js';
import Auth from '../../utils/auth.js';

export default {
  data() {
    return { store, stats: null };
  },
  onShow() {
    if (store.isLoggedIn) this.loadStats();
  },
  methods: {
    async loadStats() {
      try { this.stats = await api.user.getStats(); } catch { /* */ }
    },
    goShelf() { uni.switchTab({ url: '/pages/shelf/shelf' }); },
    goAdmin() { uni.navigateTo({ url: '/pages/admin/admin' }); },
    async loadReadingHistory() {
      try {
        const history = await api.user.getHistory(20);
        const text = history.map(h => `📕 图书#${h.book_id} (${h.status})`).join('\n') || '暂无记录';
        uni.showModal({ title: '最近阅读', content: text, showCancel: false });
      } catch (err) {
        uni.showToast({ title: err.message, icon: 'none' });
      }
    },
    showAbout() {
      uni.showModal({
        title: '关于知书',
        content: '基于知识图谱的个性化荐书系统 v1.0\n\n四大模块:\nA-用户画像 B-知识图谱\nC-个性化推荐 D-阅读生态',
        showCancel: false,
      });
    },
    handleLogout() {
      uni.showModal({
        title: '退出登录',
        content: '确定要退出吗？',
        success: (res) => {
          if (res.confirm) Auth.logout();
        },
      });
    },
  },
};
</script>

<style scoped>
.page { padding-bottom: 40rpx; }
.profile-header {
  text-align: center;
  padding: 60rpx 24rpx;
  background: #fff;
  border-bottom: 2rpx solid #f1f5f9;
}
.avatar { font-size: 80rpx; display: block; margin-bottom: 16rpx; }
.username { font-size: 36rpx; font-weight: 700; }
.actions { display: flex; justify-content: center; gap: 16rpx; margin-top: 24rpx; }
.section-title { font-size: 30rpx; font-weight: 600; padding: 32rpx 24rpx 16rpx; }
.stats-grid { display: flex; gap: 16rpx; padding: 0 24rpx; }
.stat-card {
  flex: 1; text-align: center;
  background: #fff; border-radius: 16rpx;
  padding: 32rpx 16rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.stat-card .num { font-size: 40rpx; font-weight: 700; color: #2563eb; display: block; }
.stat-card .label { font-size: 22rpx; color: #94a3b8; margin-top: 4rpx; }
.menu-list { padding: 0 24rpx; }
.menu-item {
  background: #fff;
  padding: 28rpx 24rpx;
  border-radius: 16rpx;
  margin-bottom: 12rpx;
  font-size: 28rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.menu-item:active { background: #f8fafc; }
.logout { color: #ef4444; text-align: center; margin-top: 24rpx; }
</style>
