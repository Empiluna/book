<template>
  <!--
    index.vue — 首页推荐流
    负责人: C (模块三: 个性化推荐)
    路由: pages/index/index (Tab)
  -->
  <view class="page">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <input class="search-input" placeholder="🔍 搜索你感兴趣的图书..." @confirm="onSearch" />
    </view>

    <!-- 个性化推荐 (已登录) -->
    <block v-if="store.isLoggedIn">
      <view class="section-title">🎯 为你推荐</view>
      <view v-if="loading" class="loading">加载中...</view>
      <view v-else-if="recommendList.length === 0" class="empty">
        <text>还没有个性化推荐</text>
        <text class="sub">多读几本书，系统会更懂你</text>
      </view>
      <view v-else class="recommend-list">
        <view
          v-for="(item, idx) in recommendList"
          :key="item.book.id"
          class="recommend-item"
          @click="goDetail(item.book.id)"
        >
          <text class="rank">{{ idx + 1 }}</text>
          <view class="item-content">
            <text class="item-title">{{ item.book.title }}</text>
            <text class="item-author">{{ (item.book.authors || []).join(' · ') }}</text>
            <text v-if="item.reason" class="reason">💡 {{ item.reason }}</text>
          </view>
          <text v-if="item.score" class="score">{{ (item.score * 100).toFixed(0) }}%</text>
        </view>
      </view>
    </block>

    <!-- 未登录引导 -->
    <view v-else class="login-banner">
      <text class="banner-title">📖 登录后获取专属推荐</text>
      <navigator url="/pages/login/login">
        <button class="btn-primary">登录 / 注册</button>
      </navigator>
    </view>

    <!-- 热门推荐 -->
    <view class="section-title">🔥 热门图书</view>
    <view class="book-grid">
      <book-card v-for="book in hotBooks" :key="book.id" :book="book" />
    </view>
    <view v-if="hotBooks.length === 0 && !loading" class="empty">
      <text>暂无数据，请先启动后端并导入图书</text>
    </view>
  </view>

  <!-- 智能问答助手悬浮按钮 -->
  <chat-widget mode="user" />
</template>

<script>
import { store } from '../../store/index.js';
import { api } from '../../api/index.js';

export default {
  data() {
    return {
      store,
      recommendList: [],
      hotBooks: [],
      loading: true,
    };
  },
  onShow() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      await Promise.allSettled([this.loadRecommend(), this.loadHot()]);
      this.loading = false;
    },
    async loadRecommend() {
      if (!store.isLoggedIn) return;
      try {
        const data = await api.recommend.home({ strategy: 'hybrid', top_n: 20 });
        this.recommendList = data.items || [];
      } catch { /* ignore */ }
    },
    async loadHot() {
      try {
        const data = await api.recommend.hot(20);
        // 热门接口待后端完善，先尝试获取
        this.hotBooks = (data.hot_books || []).map(b => ({
          id: b.id || 0,
          title: b.title || '未知',
          authors: b.authors || [],
          tags: b.tags || [],
          avg_rating: b.avg_rating || 0,
        }));
      } catch { /* ignore */ }
    },
    onSearch(e) {
      const kw = e.detail.value.trim();
      if (kw) uni.showToast({ title: `搜索: ${kw} (待对接ES)`, icon: 'none' });
    },
    goDetail(id) {
      uni.navigateTo({ url: `/pages/detail/detail?id=${id}` });
    },
  },
};
</script>

<style scoped>
.page { padding-bottom: 40rpx; }
.search-bar { padding: 24rpx; }
.search-input {
  width: 100%;
  height: 72rpx;
  background: #fff;
  border-radius: 36rpx;
  padding: 0 32rpx;
  font-size: 28rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);
}
.section-title { font-size: 32rpx; font-weight: 700; padding: 24rpx 24rpx 12rpx; }
.recommend-list { padding: 0 24rpx; }
.recommend-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.rank { font-size: 40rpx; font-weight: 700; color: #f59e0b; width: 60rpx; text-align: center; }
.item-content { flex: 1; margin-left: 16rpx; }
.item-title { font-size: 28rpx; font-weight: 600; }
.item-author { font-size: 24rpx; color: #94a3b8; display: block; margin-top: 4rpx; }
.reason { font-size: 22rpx; color: #64748b; margin-top: 8rpx; }
.score { font-size: 24rpx; color: #2563eb; font-weight: 600; }
.book-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  padding: 0 24rpx;
}
.login-banner { text-align: center; padding: 60rpx 24rpx; }
.banner-title { font-size: 30rpx; display: block; margin-bottom: 24rpx; }
.loading { text-align: center; padding: 60rpx; color: #94a3b8; }
.empty { text-align: center; padding: 60rpx; color: #94a3b8; }
.empty .sub { display: block; font-size: 24rpx; margin-top: 8rpx; }
</style>
