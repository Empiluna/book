<template>
  <!--
    book-card.vue — 图书卡片组件 [ALL 共用]
    用于: 首页推荐网格、书架列表、相似图书
  -->
  <view class="book-card" @click="goDetail">
    <view :class="['book-cover', coverClass]">
      <image v-if="book.cover_url" :src="book.cover_url" mode="aspectFill" class="cover-img" />
      <text v-else class="cover-title">{{ book.title }}</text>
    </view>
    <view class="book-info">
      <view class="title">{{ book.title }}</view>
      <view class="author">{{ authorText }}</view>
      <view class="book-footer">
        <view class="tags-row">
          <text v-for="tag in (book.tags || []).slice(0, 2)" :key="tag" class="tag">{{ tag }}</text>
        </view>
        <text v-if="book.avg_rating" class="rating">⭐ {{ book.avg_rating.toFixed(1) }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: { type: Object, default: () => ({}) },
  },
  computed: {
    authorText() {
      return (this.book.authors || []).join(' · ') || '未知作者';
    },
    coverClass() {
      return `cover-${((this.book.id || 0) % 5) + 1}`;
    },
  },
  methods: {
    goDetail() {
      uni.navigateTo({ url: `/pages/detail/detail?id=${this.book.id}` });
    },
  },
};
</script>

<style scoped>
.book-card {
  width: 100%;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);
  transition: transform 0.15s;
}
.book-card:active { transform: scale(0.97); }
.book-cover {
  width: 100%;
  height: 260rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover-img { width: 100%; height: 100%; }
.cover-title {
  color: #fff;
  font-size: 26rpx;
  text-align: center;
  padding: 20rpx;
  font-weight: 600;
}
.cover-1 { background: linear-gradient(135deg, #667eea, #764ba2); }
.cover-2 { background: linear-gradient(135deg, #f093fb, #f5576c); }
.cover-3 { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.cover-4 { background: linear-gradient(135deg, #43e97b, #38f9d7); }
.cover-5 { background: linear-gradient(135deg, #fa709a, #fee140); }
.book-info { padding: 16rpx; }
.title {
  font-weight: 600;
  font-size: 28rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.author { font-size: 22rpx; color: #94a3b8; margin-top: 4rpx; }
.book-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8rpx;
}
.tags-row { display: flex; flex-wrap: wrap; }
.tag {
  font-size: 18rpx;
  padding: 2rpx 12rpx;
  border-radius: 20rpx;
  background: #dbeafe;
  color: #2563eb;
  margin-right: 6rpx;
}
.rating { font-size: 20rpx; color: #f59e0b; white-space: nowrap; }
</style>
