<template>
  <!--
    shelf.vue — 我的书架
    负责人: D (模块四: 书架部分) + A (阅读统计)
    路由: pages/shelf/shelf (Tab)
  -->
  <view class="page">
    <!-- 未登录 -->
    <view v-if="!store.isLoggedIn" class="login-banner">
      <text class="banner-title">📚 登录后查看你的书架</text>
      <navigator url="/pages/login/login">
        <button class="btn-primary">去登录</button>
      </navigator>
    </view>

    <block v-else>
      <!-- 统计 -->
      <view class="stats-row">
        <view class="stat-item">
          <text class="stat-num">{{ stats.books_completed || 0 }}</text>
          <text class="stat-label">已读</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">{{ stats.books_reading || 0 }}</text>
          <text class="stat-label">在读</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">{{ shelves.length }}</text>
          <text class="stat-label">书架</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">{{ totalBooks }}</text>
          <text class="stat-label">藏书</text>
        </view>
      </view>

      <!-- 书架 Tab -->
      <scroll-view scroll-x class="shelf-tabs">
        <text
          v-for="s in shelves"
          :key="s.name"
          :class="['shelf-tab', currentShelf === s.name ? 'active' : '']"
          @click="switchShelf(s.name)"
        >{{ s.name }} ({{ s.book_count }})</text>
      </scroll-view>

      <!-- 图书列表 -->
      <view v-if="loading" class="loading">加载中...</view>
      <view v-else-if="shelfBooks.length === 0" class="empty">
        <text>这个书架还是空的</text>
        <text class="sub">去发现页面找找喜欢的书吧</text>
      </view>
      <view v-else class="book-grid">
        <book-card v-for="book in shelfBooks" :key="book.book_id || book.id" :book="book" />
      </view>
    </block>
  </view>
</template>

<script>
import { store } from '../../store/index.js';
import { api } from '../../api/index.js';

export default {
  data() {
    return {
      store,
      stats: {},
      shelves: [],
      shelfBooks: [],
      currentShelf: '默认书架',
      loading: true,
    };
  },
  computed: {
    totalBooks() {
      return this.shelves.reduce((sum, s) => sum + (s.book_count || 0), 0);
    },
  },
  onShow() {
    if (store.isLoggedIn) this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const [statsRes, shelvesRes] = await Promise.allSettled([
        api.user.getStats(),
        api.ecosystem.getShelves(),
      ]);
      if (statsRes.status === 'fulfilled') this.stats = statsRes.value;
      if (shelvesRes.status === 'fulfilled') this.shelves = shelvesRes.value;
      if (this.shelves.length === 0) {
        this.shelves = [{ name: '默认书架', book_count: 0 }];
      }
      await this.switchShelf(this.currentShelf);
      this.loading = false;
    },
    async switchShelf(name) {
      this.currentShelf = name;
      try {
        const books = await api.ecosystem.getShelfBooks(name);
        this.shelfBooks = (books || []).map(b => ({
          id: b.book_id,
          title: b.book_title || `图书#${b.book_id}`,
          authors: b.authors || [],
          tags: [],
          avg_rating: 0,
        }));
      } catch {
        this.shelfBooks = [];
      }
    },
  },
};
</script>

<style scoped>
.page { padding-bottom: 40rpx; }
.stats-row { display: flex; padding: 24rpx; gap: 16rpx; }
.stat-item {
  flex: 1; text-align: center;
  background: #fff; border-radius: 16rpx;
  padding: 24rpx 0; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.stat-num { font-size: 44rpx; font-weight: 700; color: #2563eb; display: block; }
.stat-label { font-size: 22rpx; color: #94a3b8; margin-top: 4rpx; }
.shelf-tabs { white-space: nowrap; padding: 0 24rpx 16rpx; }
.shelf-tab {
  display: inline-block;
  padding: 12rpx 28rpx;
  margin-right: 12rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
  background: #fff;
  color: #64748b;
  border: 2rpx solid #e2e8f0;
}
.shelf-tab.active { background: #2563eb; color: #fff; border-color: #2563eb; }
.book-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  padding: 0 24rpx;
}
.login-banner { text-align: center; padding: 100rpx 24rpx; }
.banner-title { font-size: 30rpx; display: block; margin-bottom: 24rpx; }
.loading { text-align: center; padding: 60rpx; color: #94a3b8; }
.empty { text-align: center; padding: 60rpx; color: #94a3b8; }
.empty .sub { display: block; font-size: 24rpx; margin-top: 8rpx; }
</style>
