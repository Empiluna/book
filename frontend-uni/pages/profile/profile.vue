<template>
  <view class="container profile-page">
    <view class="user-card card">
      <text class="avatar">{{ avatarText }}</text>
      <view class="user-info">
        <text class="title">{{ displayName }}</text>
        <text class="muted">{{ logged ? (user.is_admin ? '管理员' : '普通用户') : '未登录' }}</text>
      </view>
      <button class="btn small" @click="logged ? doLogout() : goLogin()">{{ logged ? '退出' : '登录' }}</button>
    </view>

    <view class="quick-grid">
      <view class="quick" @click="goChat"><text>🤖</text><text>AI 荐书</text></view>
      <view class="quick" @click="goOriginal"><text>✍️</text><text>小说工坊</text></view>
      <view class="quick" @click="goPlatform"><text>📡</text><text>连接诊断</text></view>
      <view class="quick" v-if="isAdminUser" @click="goAdmin"><text>🛠️</text><text>管理后台</text></view>
    </view>

    <view v-if="!logged" class="card guest">
      <text class="title">登录后生成个人画像</text>
      <text class="muted">系统会根据阅读历史、书架、评分、评论和搜索行为生成兴趣标签，并用于推荐解释。</text>
      <button class="btn" @click="goLogin">立即登录</button>
    </view>

    <view v-if="error" class="card"><text class="muted">{{ error }}</text></view>

    <view class="card" v-if="logged">
      <view class="between"><text class="title">阅读统计</text><button class="btn secondary small" @click="rebuildProfile">重建画像</button></view>
      <view class="stat-grid">
        <view class="stat-item"><text class="stat-num">{{ statValue('total_reading_minutes') }}</text><text class="muted">分钟</text></view>
        <view class="stat-item"><text class="stat-num">{{ statValue('completed_books') }}</text><text class="muted">已读</text></view>
        <view class="stat-item"><text class="stat-num">{{ statValue('reading_books') }}</text><text class="muted">在读</text></view>
        <view class="stat-item"><text class="stat-num">{{ statValue('shelf_count') }}</text><text class="muted">书架</text></view>
      </view>
    </view>

    <view class="card" v-if="logged">
      <text class="title">兴趣画像</text>
      <view class="bubble-box" v-if="tagBubbles.length">
        <text v-for="(t,idx) in tagBubbles" :key="t.name" :class="idx===0?'bubble primary':'bubble'" :style="bubbleStyle(t, idx)">{{ t.name }}</text>
      </view>
      <text v-else class="muted">继续阅读、搜索和评分后会生成兴趣气泡。</text>

      <view class="preference-block">
        <text class="sub-title">偏好作者</text>
        <view class="chips"><text v-for="a in authors" :key="a.name || a" class="chip">{{ a.name || a }}</text></view>
      </view>
      <view class="preference-block">
        <text class="sub-title">偏好分类</text>
        <view class="chips"><text v-for="c in categories" :key="c.name || c" class="chip active">{{ c.name || c }}</text></view>
      </view>
    </view>

    <view class="card" v-if="logged">
      <text class="title">继续阅读</text>
      <view v-for="item in history" :key="item.id || item.book_id" class="history" @click="goDetail(item.book)">
        <view class="history-main">
          <text class="history-title">{{ item.book && item.book.title }}</text>
          <text class="muted">第 {{ item.current_page || 1 }} 页 · {{ item.progress_percent || 0 }}% · {{ formatTime(item.read_at) }}</text>
        </view>
        <button class="btn small" @click.stop="continueRead(item)">继续</button>
      </view>
      <text v-if="history.length === 0" class="muted">暂无阅读历史。</text>
    </view>
  </view>
</template>

<script>
import { request, getToken, getUser, logout, isAdmin, formatDate, showError } from '../../api/request.js'
export default {
  data: function () { return { logged: false, user: null, stats: {}, profile: {}, history: [], error: '' } },
  computed: {
    displayName: function () { return this.user ? (this.user.nickname || this.user.username || '用户') : '游客' },
    avatarText: function () { return this.displayName ? this.displayName.charAt(0).toUpperCase() : 'U' },
    isAdminUser: function () { return isAdmin() },
    tags: function () { return (this.profile && (this.profile.tag_preferences || this.profile.tags || [])) || [] },
    authors: function () { return (this.profile && (this.profile.favorite_authors || this.profile.author_preferences || this.profile.authors || [])) || [] },
    categories: function () { return (this.profile && (this.profile.favorite_categories || this.profile.categories || [])) || [] },
    tagBubbles: function () {
      return this.tags.slice(0, 12).map(function (x) {
        if (typeof x === 'string') return { name: x, weight: 0.5 }
        return { name: x.name || x.label || String(x), weight: Number(x.weight || x.score || 0.5) }
      })
    }
  },
  onShow: function () { this.load() },
  onPullDownRefresh: function () { const that = this; this.load(function () { uni.stopPullDownRefresh() }) },
  methods: {
    load: function (done) {
      const that = this
      that.logged = !!getToken(); that.user = getUser(); that.error = ''
      if (!that.logged) { that.stats = {}; that.profile = {}; that.history = []; if (done) done(); return }
      Promise.all([request('/user/stats'), request('/user/profile'), request('/user/history')]).then(function (res) {
        that.stats = res[0] || {}
        that.profile = res[1] || {}
        that.history = (res[2] && res[2].items) || []
      }).catch(function (e) { that.error = e.message || '个人中心加载失败' }).then(function () { if (done) done() })
    },
    bubbleStyle: function (t, idx) {
      const weight = Math.max(0.18, Math.min(1.4, Number(t.weight || 0.5)))
      const size = Math.round(76 + weight * 76 + (idx === 0 ? 16 : 0))
      const font = Math.max(22, Math.min(42, Math.round(size * (idx === 0 ? 0.27 : 0.24))))
      return 'width:' + size + 'rpx;height:' + size + 'rpx;font-size:' + font + 'rpx;'
    },
    statValue: function (key) { return this.stats && this.stats[key] != null ? this.stats[key] : 0 },
    formatTime: function (v) { return formatDate(v) },
    goLogin: function () { uni.navigateTo({ url: '/pages/login/login' }) },
    goChat: function () { uni.navigateTo({ url: '/pages/chat/chat' }) },
    goOriginal: function () { uni.navigateTo({ url: '/pages/original/original' }) },
    goPlatform: function () { uni.navigateTo({ url: '/pages/platform/platform' }) },
    goAdmin: function () { uni.navigateTo({ url: '/pages/admin/admin' }) },
    doLogout: function () { logout(); this.load(); uni.showToast({ title: '已退出', icon: 'success' }) },
    rebuildProfile: function () { const that = this; request('/user/profile/rebuild', { method: 'POST' }).then(function () { uni.showToast({ title: '画像已重建', icon: 'success' }); that.load() }).catch(function (e) { showError(e, '重建失败') }) },
    goDetail: function (book) { if (book) uni.navigateTo({ url: '/pages/detail/detail?id=' + (book.id || book.book_id) }) },
    getContinuePage: function (item) {
      item = item || {}
      const candidates = [
        item.current_page,
        item.page,
        item.last_page,
        item.reading_page,
        item.progress && item.progress.current_page,
        item.reading_record && item.reading_record.current_page,
        item.book && item.book.current_page
      ]
      for (let i = 0; i < candidates.length; i++) {
        const page = parseInt(candidates[i], 10)
        if (page && page > 0) return page
      }
      return 1
    },
    continueRead: function (item) {
      item = item || {}
      const b = item.book || {}
      const id = b.id || b.book_id || item.book_id || item.id
      if (!id) { uni.showToast({ title: '未找到图书ID', icon: 'none' }); return }
      const page = this.getContinuePage(item)
      uni.navigateTo({ url: '/pages/reader/reader?id=' + encodeURIComponent(id) + '&page=' + encodeURIComponent(page) })
    }
  }
}
</script>

<style scoped>
.profile-page{padding-bottom:calc(32rpx + env(safe-area-inset-bottom))}.user-card{display:flex;align-items:center;gap:18rpx}.avatar{width:96rpx;height:96rpx;line-height:96rpx;text-align:center;border-radius:28rpx;background:linear-gradient(135deg,#7c3aed,#0ea5e9);color:#fff;font-size:38rpx;font-weight:900}.user-info{flex:1}.quick-grid{display:flex;flex-wrap:wrap;gap:12rpx;margin-bottom:22rpx}.quick{width:calc(25% - 9rpx);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8rpx;background:#fff;border-radius:22rpx;padding:18rpx 8rpx;box-shadow:0 10rpx 28rpx rgba(15,23,42,.07)}.quick text:first-child{font-size:34rpx}.quick text:last-child{font-size:20rpx;color:#334155;font-weight:900}.guest .btn{margin-top:22rpx}.bubble-box{min-height:260rpx;padding:24rpx;border-radius:28rpx;border:1rpx solid #e9d5ff;background:linear-gradient(135deg,#ffffff,#eff6ff);display:flex;align-items:center;align-content:center;justify-content:center;gap:16rpx;flex-wrap:wrap}.bubble{border-radius:9999rpx;background:linear-gradient(135deg,rgba(124,58,237,.18),rgba(14,165,233,.18));border:1rpx solid rgba(124,58,237,.16);box-shadow:0 12rpx 30rpx rgba(124,58,237,.12);display:flex;align-items:center;justify-content:center;text-align:center;color:#111827;font-weight:900;line-height:1.15;padding:0 10rpx;overflow:hidden}.bubble.primary{background:linear-gradient(135deg,rgba(124,58,237,.28),rgba(14,165,233,.22))}.preference-block{margin-top:22rpx}.history{display:flex;align-items:center;gap:14rpx;padding:18rpx 0;border-bottom:1rpx solid #eef2f7}.history-main{flex:1}.history-title{display:block;color:#111827;font-size:28rpx;font-weight:900;margin-bottom:6rpx}@media screen and (max-width:380px){.quick{width:calc(50% - 6rpx)}}
</style>
