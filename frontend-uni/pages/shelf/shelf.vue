<template>
  <view class="container shelf-page">
    <view class="card hero">
      <view class="between"><text class="title">我的书架</text><button v-if="!logged" class="btn small" @click="goLogin">登录</button></view>
      <text class="muted">管理想读、在读、已读图书，继续上次阅读。</text>
    </view>

    <view v-if="error" class="card"><text class="muted">{{ error }}</text></view>

    <view v-if="!logged" class="card guest">
      <text class="title">登录后解锁完整书架</text>
      <text class="muted">登录后可以同步阅读进度、收藏图书、继续阅读和生成兴趣画像。</text>
      <view class="guest-stats">
        <view><text class="stat-num">想读</text><text class="muted">收藏计划</text></view>
        <view><text class="stat-num">在读</text><text class="muted">续读进度</text></view>
        <view><text class="stat-num">已读</text><text class="muted">沉淀画像</text></view>
      </view>
      <button class="btn" @click="goLogin">登录后查看书架</button>
    </view>

    <view v-if="logged" class="tabs">
      <text v-for="s in shelves" :key="s.name" :class="active===s.name?'chip active':'chip'" @click="active=s.name">{{ s.name }} {{ s.count }}</text>
    </view>

    <view v-if="logged && !activeBooks.length" class="card empty">
      <text class="muted">当前书架暂无图书，可以去发现页添加。</text>
      <button class="btn small" @click="goSearch">去发现</button>
    </view>

    <view v-for="item in activeBooks" :key="item.book.id" class="shelf-book card">
      <BookCard :book="item.book" @click="goDetail"></BookCard>
      <view class="book-actions">
        <button class="btn small" @click="continueRead(item)">继续阅读</button>
        <button class="btn secondary small" @click="move(item, '在读')">在读</button>
        <button class="btn secondary small" @click="move(item, '已读')">已读</button>
        <button class="btn danger small" @click="remove(item)">移除</button>
      </view>
    </view>
  </view>
</template>
<script>
import BookCard from '../../components/BookCard.vue'
import { request, getToken, showError } from '../../api/request.js'
export default {
  components: { BookCard: BookCard },
  data: function () { return { logged: false, error: '', shelves: [], active: '想读' } },
  computed: { activeBooks: function () { const s = this.shelves.find(function (x) { return x.name === this.active }.bind(this)); return s ? (s.books || []) : [] } },
  onShow: function () { this.load() },
  onPullDownRefresh: function () { const that = this; this.load(function () { uni.stopPullDownRefresh() }) },
  methods: {
    load: function (done) {
      const that = this
      that.logged = !!getToken(); that.error = ''
      if (!that.logged) { that.shelves = []; if (done) done(); return }
      request('/ecosystem/shelves').then(function (res) {
        that.shelves = (res && res.shelves) || []
        if (!that.shelves.find(function (s) { return s.name === that.active }) && that.shelves.length) that.active = that.shelves[0].name
      }).catch(function (e) { that.error = e.message || '书架加载失败' }).then(function () { if (done) done() })
    },
    goLogin: function () { uni.navigateTo({ url: '/pages/login/login' }) },
    goSearch: function () { uni.switchTab({ url: '/pages/search/search' }) },
    goDetail: function (book) { uni.navigateTo({ url: '/pages/detail/detail?id=' + (book.id || book.book_id) }) },
    continueRead: function (item) { const b = item.book || {}; uni.navigateTo({ url: '/pages/reader/reader?id=' + (b.id || b.book_id) }) },
    move: function (item, target) {
      const that = this; const b = item.book || {}; const status = target === '已读' ? 'read' : 'reading'
      request('/ecosystem/shelves/book/' + (b.id || b.book_id), { method: 'POST', data: { shelf_name: target, reading_status: status } }).then(function () { uni.showToast({ title: '已加入' + target }); that.load() }).catch(function (e) { showError(e, '操作失败') })
    },
    remove: function (item) {
      const that = this; const b = item.book || {}; const id = b.id || b.book_id
      request('/ecosystem/shelves/book/' + id + '?shelf_name=' + encodeURIComponent(that.active), { method: 'DELETE' }).then(function () { uni.showToast({ title: '已移除' }); that.load() }).catch(function (e) { showError(e, '移除失败') })
    }
  }
}
</script>
<style scoped>
.hero{background:linear-gradient(135deg,#fff,#eff6ff)}.tabs{display:flex;gap:12rpx;flex-wrap:wrap;margin-bottom:20rpx}.shelf-book{padding:10rpx 0 22rpx}.book-actions{display:flex;gap:10rpx;padding:0 20rpx;flex-wrap:wrap}.book-actions .btn{flex:1;padding:0 8rpx;font-size:22rpx}.guest-stats{display:flex;gap:12rpx;margin:22rpx 0}.guest-stats view{flex:1;background:#fff;border-radius:20rpx;padding:18rpx 8rpx;text-align:center;border:1rpx solid #eef2f7}.guest .btn{margin-top:8rpx}
</style>
