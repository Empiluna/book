<template>
  <view class="container home-page">
    <view class="hero-card">
      <text class="eyebrow">Knowledge Graph · Reading Ecosystem</text>
      <text class="big">知人知书</text>
      <text class="muted hero-desc">推荐、搜索、图谱、书架、评论、试读、AI 荐书与 AI 小说工坊都已接入移动端。</text>
      <view class="hero-actions">
        <button class="btn" @click="load">刷新推荐</button>
        <button class="btn secondary" @click="goOriginal">小说工坊</button>
        <button class="btn secondary" @click="goPlatform">连接诊断</button>
      </view>
    </view>

    <view v-if="error" class="card status">
      <text class="sub-title">连接提示</text>
      <text class="muted">{{ error }}</text>
      <text class="muted">当前后端地址：{{ origin }}</text>
    </view>

    <view class="quick-grid">
      <view class="quick-item" @click="goSearch"><text>🔍</text><text>搜索发现</text></view>
      <view class="quick-item" @click="goGraph"><text>🕸️</text><text>知识图谱</text></view>
      <view class="quick-item" @click="goShelf"><text>📚</text><text>我的书架</text></view>
      <view class="quick-item" @click="goChat"><text>🤖</text><text>AI 荐书</text></view>
    </view>

    <view class="card" v-if="stats">
      <view class="between"><text class="title">系统概览</text><text class="badge">实时</text></view>
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
    <scroll-view scroll-x class="h-scroll" show-scrollbar="false">
      <view class="mini" v-for="item in hot" :key="'h'+item.id" @click="goDetail(item)">
        <image class="mini-cover" :src="item.cover_url" mode="aspectFill"></image>
        <text class="mini-title">{{ item.title }}</text>
        <text class="mini-meta">⭐ {{ item.avg_rating || 0 }}</text>
      </view>
    </scroll-view>

    <view class="section-head"><text class="section-title">新书上架</text></view>
    <BookCard v-for="item in newest" :key="'n'+item.id" :book="item" @click="goDetail"></BookCard>

    <view class="card ai-entry" @click="goOriginal">
      <view>
        <text class="title">AI小说工坊</text>
        <text class="muted">生成小说、编辑正文、保存到书架。</text>
      </view>
      <text class="arrow">进入 ></text>
    </view>
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
    goGraph: function () { uni.switchTab({ url: '/pages/graph/graph' }) },
    goShelf: function () { uni.switchTab({ url: '/pages/shelf/shelf' }) },
    goChat: function () { uni.navigateTo({ url: '/pages/chat/chat' }) },
    goPlatform: function () { uni.navigateTo({ url: '/pages/platform/platform' }) },
    goOriginal: function () { uni.navigateTo({ url: '/pages/original/original' }) }
  }
}
</script>

<style scoped>
.home-page{padding-bottom:calc(32rpx + env(safe-area-inset-bottom))}.hero-card{padding:34rpx;margin-bottom:22rpx;border-radius:36rpx;background:linear-gradient(135deg,#fff,#eef6ff 48%,#f3e8ff);box-shadow:0 20rpx 54rpx rgba(15,23,42,.09)}.eyebrow{display:block;color:#7c3aed;font-size:22rpx;font-weight:900;margin-bottom:10rpx}.big{display:block;font-size:58rpx;font-weight:900;color:#111827;margin-bottom:12rpx;letter-spacing:-2rpx}.hero-desc{max-width:620rpx}.hero-actions{display:flex;gap:14rpx;margin-top:26rpx}.hero-actions .btn{flex:1;font-size:24rpx;padding:0 8rpx}.quick-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14rpx;margin-bottom:22rpx}.quick-item{min-width:0;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8rpx;padding:20rpx 4rpx;border-radius:24rpx;background:#fff;box-shadow:0 12rpx 32rpx rgba(15,23,42,.07)}.quick-item text:first-child{font-size:34rpx}.quick-item text:last-child{font-size:21rpx;font-weight:900;color:#344054;white-space:nowrap}.badge{padding:8rpx 14rpx;border-radius:999rpx;background:#ede9fe;color:#6d28d9;font-size:22rpx;font-weight:900}.section-head{display:flex;align-items:center;justify-content:space-between;margin:28rpx 4rpx 16rpx}.section-title{font-size:34rpx;font-weight:900;color:#111827}.more{color:#7c3aed;font-weight:900}.h-scroll{white-space:nowrap;margin-bottom:10rpx}.mini{display:inline-flex;vertical-align:top;width:180rpx;margin-right:16rpx;padding:14rpx;border-radius:24rpx;background:#fff;box-shadow:0 12rpx 32rpx rgba(15,23,42,.07);flex-direction:column}.mini-cover{width:150rpx;height:210rpx;border-radius:18rpx;background:#e5e7eb}.mini-title{display:block;font-size:24rpx;font-weight:900;color:#111827;margin-top:10rpx;line-height:1.25;white-space:normal;height:60rpx;overflow:hidden}.mini-meta{display:block;color:#667085;font-size:22rpx;margin-top:4rpx}.ai-entry{display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,#ede9fe,#e0f2fe)}.arrow{color:#7c3aed;font-size:26rpx;font-weight:900}@media screen and (max-width:380px){.quick-grid{gap:10rpx}.quick-item{padding:18rpx 2rpx;border-radius:20rpx}.quick-item text:first-child{font-size:31rpx}.quick-item text:last-child{font-size:19rpx}.hero-actions{display:block}.hero-actions .btn{margin-bottom:12rpx}}
</style>
