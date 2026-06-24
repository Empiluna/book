<template>
  <!--
    detail.vue — 图书详情页
    负责人: B (图谱) + C (相似推荐) + D (评论/试读/购书)
    路由: pages/detail/detail?id=xxx
  -->
  <view class="page">
    <view v-if="loading" class="loading">加载中...</view>

    <block v-else>
      <!-- 封面区 -->
      <view :class="['cover', coverClass]">
        <text class="cover-title">{{ book.title }}</text>
      </view>

      <!-- 基本信息 -->
      <view class="info-card">
        <text class="book-title">{{ book.title }}</text>
        <text class="book-author">{{ (book.authors || []).join(' · ') || '未知作者' }}</text>
        <view class="tags-row">
          <text v-for="t in (book.tags || [])" :key="t" class="tag">{{ t }}</text>
        </view>
        <text v-if="book.description" class="desc">{{ book.description }}</text>
        <text class="rating">⭐ {{ (book.avg_rating || 0).toFixed(1) }} · {{ book.rating_count || 0 }} 人评价</text>

        <!-- 操作按钮 -->
        <view class="btn-row">
          <button v-if="trialInfo" class="btn-outline btn-sm" @click="openTrial">📖 试读({{ trialInfo.allowed_pages }}页)</button>
          <button v-for="l in purchaseLinks" :key="l.platform" class="btn-outline btn-sm" @click="openLink(l.url)">🛒 {{ l.platform }}</button>
          <button v-if="store.isLoggedIn" class="btn-primary btn-sm" @click="addToShelf">➕ 加入书架</button>
          <button v-if="store.isLoggedIn" class="btn-outline btn-sm" @click="rateBook">⭐ 评分</button>
        </view>
      </view>

      <!-- 相似推荐 (模块三 C) -->
      <view v-if="similarBooks.length > 0" class="section">
        <text class="section-title">📚 你可能也喜欢</text>
        <scroll-view scroll-x class="similar-scroll">
          <view v-for="b in similarBooks" :key="b.book_id" class="similar-item" @click="goDetail(b.book_id)">
            <view :class="['mini-cover', 'cover-' + ((b.book_id % 5) + 1)]">
              <text>{{ b.book_title }}</text>
            </view>
            <text class="similar-title">{{ b.book_title }}</text>
          </view>
        </scroll-view>
      </view>

      <!-- 评论区 (模块四 D) -->
      <view class="section">
        <text class="section-title">💬 书评</text>
        <comment-list :book-id="bookId" :initial-comments="comments" />
      </view>
    </block>
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
      bookId: 0,
      book: { title: '', authors: [], tags: [], description: '', avg_rating: 0, rating_count: 0 },
      similarBooks: [],
      comments: [],
      trialInfo: null,
      purchaseLinks: [],
      loading: true,
    };
  },
  computed: {
    coverClass() { return `cover-${((this.bookId || 0) % 5) + 1}`; },
  },
  onLoad(options) {
    this.bookId = parseInt(options.id) || 0;
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const [simRes, comRes, trialRes, linkRes] = await Promise.allSettled([
        api.recommend.similar(this.bookId, 6),
        api.ecosystem.getComments(this.bookId),
        api.ecosystem.getTrial(this.bookId).catch(() => null),
        api.ecosystem.getPurchaseLinks(this.bookId),
      ]);
      if (simRes.status === 'fulfilled') this.similarBooks = simRes.value.similar_books || [];
      if (comRes.status === 'fulfilled') this.comments = comRes.value || [];
      if (trialRes.status === 'fulfilled' && trialRes.value) this.trialInfo = trialRes.value;
      if (linkRes.status === 'fulfilled') this.purchaseLinks = linkRes.value.prices || [];
      this.loading = false;
    },
    async addToShelf() {
      try {
        await api.user.addBookmark({ book_id: this.bookId, shelf_name: '默认书架' });
        uni.showToast({ title: '已加入书架', icon: 'success' });
      } catch (err) { uni.showToast({ title: err.message, icon: 'none' }); }
    },
    rateBook() {
      uni.showModal({
        title: '评分',
        content: '请选择评分 (0.5 ~ 5.0)',
        editable: true,
        placeholderText: '4.0',
        success: async (res) => {
          if (res.confirm && res.content) {
            try {
              await api.user.rateBook({ book_id: this.bookId, rating: parseFloat(res.content) });
              uni.showToast({ title: '评分成功', icon: 'success' });
            } catch (err) { uni.showToast({ title: err.message, icon: 'none' }); }
          }
        },
      });
    },
    openTrial() {
      uni.showToast({ title: '试读功能开发中', icon: 'none' });
    },
    openLink(url) {
      // #ifdef H5
      window.open(url, '_blank');
      // #endif
      // #ifdef APP-PLUS
      plus.runtime.openURL(url);
      // #endif
    },
    goDetail(id) {
      uni.navigateTo({ url: `/pages/detail/detail?id=${id}` });
    },
  },
};
</script>

<style scoped>
.page { padding-bottom: 40rpx; }
.loading { text-align: center; padding: 100rpx; }
.cover {
  width: 100%; height: 400rpx;
  display: flex; align-items: center; justify-content: center;
}
.cover-title { color: #fff; font-size: 40rpx; font-weight: 700; text-align: center; padding: 40rpx; }
.cover-1 { background: linear-gradient(135deg, #667eea, #764ba2); }
.cover-2 { background: linear-gradient(135deg, #f093fb, #f5576c); }
.cover-3 { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.cover-4 { background: linear-gradient(135deg, #43e97b, #38f9d7); }
.cover-5 { background: linear-gradient(135deg, #fa709a, #fee140); }
.info-card {
  background: #fff; margin: -40rpx 24rpx 24rpx;
  border-radius: 24rpx; padding: 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.08);
  position: relative; z-index: 1;
}
.book-title { font-size: 36rpx; font-weight: 700; display: block; }
.book-author { font-size: 26rpx; color: #94a3b8; margin-top: 8rpx; display: block; }
.tags-row { display: flex; flex-wrap: wrap; gap: 8rpx; margin-top: 16rpx; }
.tag {
  font-size: 20rpx; padding: 4rpx 16rpx; border-radius: 20rpx;
  background: #dbeafe; color: #2563eb;
}
.desc { font-size: 26rpx; color: #475569; line-height: 1.6; margin-top: 16rpx; display: block; }
.rating { font-size: 24rpx; color: #f59e0b; margin-top: 12rpx; display: block; }
.btn-row { display: flex; flex-wrap: wrap; gap: 12rpx; margin-top: 24rpx; }
.section { margin-top: 0; }
.section-title { font-size: 30rpx; font-weight: 600; padding: 0 24rpx 16rpx; display: block; }
.similar-scroll { white-space: nowrap; padding: 0 24rpx; }
.similar-item { display: inline-block; width: 160rpx; margin-right: 16rpx; text-align: center; }
.mini-cover {
  width: 160rpx; height: 200rpx; border-radius: 12rpx;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 22rpx; padding: 12rpx;
}
.similar-title { font-size: 24rpx; display: block; margin-top: 8rpx; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
