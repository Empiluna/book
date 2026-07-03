<template>
  <view class="container">
    <view class="hero card">
      <text class="eyebrow">Knowledge Graph · Hybrid Recommendation</text>
      <text class="big">知人知书</text>
      <text class="muted">移动端已接入推荐、搜索、图谱、书架、评论、试读和 AI 荐书助手。</text>
      <view class="hero-actions">
        <button class="btn" @click="load">刷新推荐</button>
        <button class="btn secondary" @click="goChat">AI 荐书</button>
      </view>
    </view>

    <view v-if="error" class="card status">
      <text class="sub-title">连接提示</text>
      <text class="muted">{{ error }}</text>
      <text class="muted">当前后端地址：{{ origin }}</text>
    </view>

    <view class="card" v-if="stats">
      <text class="title">系统概览</text>
      <view class="stat-grid">
        <view class="stat-item"><text class="stat-num">{{ stats.books || 0 }}</text><text class="muted">图书</text></view>
        <view class="stat-item"><text class="stat-num">{{ stats.authors || 0 }}</text><text class="muted">作者</text></view>
        <view class="stat-item"><text class="stat-num">{{ stats.tags || 0 }}</text><text class="muted">标签</text></view>
        <view class="stat-item"><text class="stat-num">{{ stats.relations || 0 }}</text><text class="muted">关系</text></view>
      </view>
    </view>

    <view class="section-head">
      <text class="section-title">为你推荐</text>
      <text class="more" @click="goSearch">更多</text>
    </view>
    <view v-if="loading" class="card"><text class="muted">正在加载推荐...</text></view>
    <BookCard v-for="item in recommend" :key="'r'+item.id" :book="item" @click="goDetail"></BookCard>

    <view class="section-head"><text class="section-title">热门图书</text></view>
    <scroll-view scroll-x class="h-scroll">
      <view class="mini" v-for="item in hot" :key="'h'+item.id" @click="goDetail(item)">
        <image class="mini-cover" :src="item.cover_url" mode="aspectFill"></image>
        <text class="mini-title">{{ item.title }}</text>
        <text class="mini-meta">⭐ {{ item.avg_rating || 0 }}</text>
      </view>
    </scroll-view>

    <view class="section-head"><text class="section-title">新书上架</text></view>
    <BookCard v-for="item in newest" :key="'n'+item.id" :book="item" @click="goDetail"></BookCard>
  </view>
</template>

<script>
import BookCard from '../../components/BookCard.vue'
import { request, normalizeBooks, ORIGIN } from '../../api/request.js'
export default {
  components: { BookCard: BookCard },
  data: function () { return { origin: ORIGIN, loading: false, error: '', stats: null, recommend: [], hot: [], newest: [] } },
  onLoad: function () { this.load() },
  onPullDownRefresh: function () { const that = this; this.load(function () { uni.stopPullDownRefresh() }) },
  methods: {
    load: function (done) {
      const that = this
      that.loading = true
      that.error = ''
      Promise.all([
        request('/recommend/home?limit=10'),
        request('/recommend/hot?limit=8'),
        request('/recommend/new?limit=6'),
        request('/graph/stats')
      ]).then(function (res) {
        that.recommend = normalizeBooks((res[0] && res[0].items) || [])
        that.hot = normalizeBooks((res[1] && res[1].items) || [])
        that.newest = normalizeBooks((res[2] && res[2].items) || [])
        that.stats = res[3] || null
      }).catch(function (e) {
        that.error = e.message || '首页数据加载失败，请确认后端已启动。'
      }).then(function () { that.loading = false; if (done) done() })
    },
    goDetail: function (book) { uni.navigateTo({ url: '/pages/detail/detail?id=' + (book.id || book.book_id) }) },
    goSearch: function () { uni.switchTab({ url: '/pages/search/search' }) },
    goChat: function () { uni.navigateTo({ url: '/pages/chat/chat' }) }
  }
}
</script>

<style scoped>
.hero{padding:34rpx}.eyebrow{display:block;color:#7c3aed;font-size:22rpx;font-weight:900;margin-bottom:10rpx}.big{display:block;font-size:58rpx;font-weight:900;color:#111827;margin-bottom:12rpx}.hero-actions{display:flex;gap:16rpx;margin-top:24rpx}.hero-actions .btn{flex:1}.status{background:#fff7ed}.section-head{display:flex;align-items:center;justify-content:space-between;margin:8rpx 4rpx 18rpx}.section-title{font-size:36rpx;font-weight:900;color:#111827}.more{font-size:26rpx;color:#7c3aed;font-weight:800}.h-scroll{white-space:nowrap;margin-bottom:24rpx}.mini{display:inline-flex;vertical-align:top;flex-direction:column;width:190rpx;margin-right:18rpx;background:#fff;border-radius:24rpx;padding:16rpx;box-shadow:0 14rpx 36rpx rgba(15,23,42,.08)}.mini-cover{width:158rpx;height:218rpx;border-radius:18rpx;background:#e5e7eb}.mini-title{display:block;font-size:25rpx;font-weight:900;color:#111827;line-height:1.35;margin-top:12rpx;white-space:normal;height:68rpx;overflow:hidden}.mini-meta{font-size:22rpx;color:#667085;margin-top:6rpx}
</style>
