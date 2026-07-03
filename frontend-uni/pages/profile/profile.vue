<template>
  <view class="container">
    <view class="card user-card">
      <text class="avatar">{{ avatarText }}</text>
      <view class="user-info">
        <text class="title">{{ displayName }}</text>
        <text class="muted">{{ logged ? (user.is_admin ? '管理员' : '普通用户') : '未登录' }}</text>
      </view>
      <button class="btn small" @click="logged ? doLogout() : goLogin()">{{ logged ? '退出' : '登录' }}</button>
    </view>

    <view class="quick card">
      <button class="btn secondary small" @click="goChat">AI 荐书</button>
      <button v-if="logged" class="btn secondary small" @click="rebuildProfile">重建画像</button>
      <button v-if="isAdminUser" class="btn small" @click="goAdmin">管理后台</button>
    </view>

    <view v-if="error" class="card"><text class="muted">{{ error }}</text></view>

    <view class="card" v-if="logged">
      <text class="title">阅读统计</text>
      <view class="stat-grid">
        <view class="stat-item"><text class="stat-num">{{ statValue('total_reading_minutes') }}</text><text class="muted">分钟</text></view>
        <view class="stat-item"><text class="stat-num">{{ statValue('completed_books') }}</text><text class="muted">已读</text></view>
        <view class="stat-item"><text class="stat-num">{{ statValue('ratings_count') }}</text><text class="muted">评分</text></view>
        <view class="stat-item"><text class="stat-num">{{ statValue('shelf_count') }}</text><text class="muted">书架</text></view>
      </view>
    </view>

    <view class="card" v-if="logged">
      <text class="title">兴趣画像</text>
      <text class="sub-title">偏好标签</text>
      <view class="chips"><text v-for="t in tags" :key="t.name || t" class="chip">{{ t.name || t }}</text></view>
      <text class="sub-title">偏好作者</text>
      <view class="chips"><text v-for="a in authors" :key="a.name || a" class="chip">{{ a.name || a }}</text></view>
    </view>

    <view class="card" v-if="logged">
      <text class="title">继续阅读</text>
      <view v-for="item in history" :key="item.id" class="history" @click="goDetail(item.book)">
        <text class="history-title">{{ item.book && item.book.title }}</text>
        <text class="muted">第 {{ item.current_page || 1 }} 页 · {{ item.progress_percent || 0 }}% · {{ item.read_at || '' }}</text>
        <button class="btn small" @click.stop="continueRead(item)">继续</button>
      </view>
      <text v-if="history.length === 0" class="muted">暂无阅读历史。</text>
    </view>
  </view>
</template>

<script>
import { request, getToken, getUser, logout, isAdmin, showError } from '../../api/request.js'
export default {
  data: function () { return { logged: false, user: null, stats: {}, profile: {}, history: [], error: '' } },
  computed: {
    displayName: function () { return this.user ? (this.user.nickname || this.user.username || '用户') : '游客' },
    avatarText: function () { return this.displayName ? this.displayName.charAt(0).toUpperCase() : 'U' },
    isAdminUser: function () { return isAdmin() },
    tags: function () { return (this.profile && (this.profile.tag_preferences || this.profile.tags || [])) || [] },
    authors: function () { return (this.profile && (this.profile.author_preferences || this.profile.authors || [])) || [] }
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
      }).catch(function (e) { that.error = e.message || '个人信息加载失败' }).then(function () { if (done) done() })
    },
    statValue: function (key) { return this.stats[key] || 0 },
    goLogin: function () { uni.navigateTo({ url: '/pages/login/login' }) },
    doLogout: function () { logout(); this.load(); uni.showToast({ title: '已退出', icon: 'none' }) },
    goDetail: function (book) { if (book) uni.navigateTo({ url: '/pages/detail/detail?id=' + (book.id || book.book_id) }) },
    continueRead: function (item) { const b = item.book || {}; uni.navigateTo({ url: '/pages/reader/reader?id=' + (b.id || b.book_id) + '&page=' + (item.current_page || 1) }) },
    goAdmin: function () { uni.navigateTo({ url: '/pages/admin/admin' }) },
    goChat: function () { uni.navigateTo({ url: '/pages/chat/chat' }) },
    rebuildProfile: function () { const that = this; request('/user/profile/rebuild', { method: 'POST' }).then(function () { uni.showToast({ title: '画像已更新' }); that.load() }).catch(function (e) { showError(e, '重建失败') }) }
  }
}
</script>

<style scoped>
.user-card{display:flex;align-items:center;gap:20rpx}.avatar{width:88rpx;height:88rpx;line-height:88rpx;text-align:center;border-radius:28rpx;background:#7c3aed;color:white;font-weight:900;font-size:36rpx}.user-info{flex:1}.quick{display:flex;gap:12rpx;flex-wrap:wrap}.quick .btn{flex:1}.history{padding:18rpx 0;border-bottom:1rpx solid #eef2f7}.history-title{display:block;color:#111827;font-size:28rpx;font-weight:900;margin-bottom:8rpx}.history .btn{margin-top:12rpx;width:150rpx}
</style>
