<template>
  <view class="container">
    <view v-if="loading" class="card"><text class="muted">正在加载详情...</text></view>
    <view v-else-if="error" class="card"><text class="muted">{{ error }}</text></view>
    <view v-else>
      <view class="card top">
        <image class="cover" :src="book.cover_url" mode="aspectFill"></image>
        <view class="info">
          <text class="book-title">{{ book.title }}</text>
          <text class="muted">{{ book.author || '未知作者' }}</text>
          <text class="muted">{{ book.publisher || '未知出版社' }} · {{ book.page_count || '-' }} 页</text>
          <text class="rating">⭐ {{ book.avg_rating || 0 }} · {{ book.rating_count || 0 }} 人评分</text>
          <view class="chips"><text v-for="t in book.tags" :key="t" class="chip">{{ t }}</text></view>
        </view>
      </view>

      <view class="actions">
        <button class="btn" @click="openReader">在线试读</button>
        <button class="btn secondary" @click="addShelf('想读')">想读</button>
        <button class="btn secondary" @click="addShelf('在读')">在读</button>
      </view>

      <view class="card">
        <text class="title">内容简介</text>
        <text class="desc">{{ book.description || '暂无简介' }}</text>
      </view>

      <view class="card" v-if="purchase.length || channels.length">
        <text class="title">购书入口</text>
        <view class="purchase" v-for="p in purchase" :key="'p'+p.id" @click="openPurchase(p)">
          <text class="purchase-name">{{ p.platform }}</text>
          <text class="muted">{{ p.price ? '￥' + p.price : '查看' }}</text>
        </view>
        <view class="purchase" v-for="c in channels" :key="c.platform" @click="openChannel(c)">
          <text class="purchase-name">{{ c.platform }}</text>
          <text class="muted">搜索购书</text>
        </view>
      </view>

      <view class="card">
        <text class="title">我的评分 / 评论</text>
        <view class="chips"><text v-for="n in [1,2,3,4,5]" :key="n" :class="rating===n?'chip active':'chip'" @click="rating=n">{{ n }} 星</text></view>
        <textarea class="textarea" v-model="commentText" placeholder="写下你的书评"></textarea>
        <button class="btn" @click="submitComment">发布评论</button>
      </view>

      <view class="card">
        <text class="title">书友评论 {{ summary.total || 0 }}</text>
        <view v-for="c in comments" :key="c.id" class="comment">
          <view class="between"><text class="comment-user">{{ c.nickname || c.username || '读者' }}</text><text class="muted">⭐ {{ c.rating || '-' }}</text></view>
          <text class="comment-text">{{ c.content }}</text>
          <view class="between"><text class="muted">{{ c.created_at }}</text><text class="like" @click="like(c)">赞 {{ c.likes_count || 0 }}</text></view>
        </view>
        <text v-if="!comments.length" class="muted">暂无评论，来写第一条吧。</text>
      </view>

      <view class="card">
        <text class="title">相似推荐</text>
        <BookCard v-for="item in similar" :key="item.id" :book="item" @click="goDetail"></BookCard>
      </view>
    </view>
  </view>
</template>

<script>
import BookCard from '../../components/BookCard.vue'
import { request, normalizeBook, normalizeBooks, requireLogin, showError } from '../../api/request.js'
export default {
  components: { BookCard: BookCard },
  data: function () { return { id: '', loading: false, error: '', book: { tags: [] }, similar: [], comments: [], summary: {}, purchase: [], channels: [], rating: 5, commentText: '' } },
  onLoad: function (query) { this.id = query.id || query.book_id || ''; this.load() },
  methods: {
    load: function () {
      const that = this
      if (!that.id) { that.error = '缺少图书ID'; return }
      that.loading = true; that.error = ''
      Promise.all([
        request('/books/' + that.id),
        request('/recommend/similar/' + that.id + '?limit=8'),
        request('/ecosystem/comments/' + that.id),
        request('/ecosystem/purchase-links/' + that.id)
      ]).then(function (res) {
        that.book = normalizeBook(res[0])
        that.similar = normalizeBooks((res[1] && res[1].items) || [])
        that.comments = (res[2] && res[2].items) || []
        that.summary = (res[2] && res[2].summary) || {}
        that.purchase = (res[3] && res[3].links) || []
        that.channels = (res[3] && res[3].channels) || that.book.purchase_channels || []
      }).catch(function (e) { that.error = e.message || '详情加载失败' }).then(function () { that.loading = false })
    },
    openReader: function () { uni.navigateTo({ url: '/pages/reader/reader?id=' + this.id }) },
    addShelf: function (name) {
      if (!requireLogin()) return
      const status = name === '在读' ? 'reading' : (name === '已读' ? 'read' : 'want_to_read')
      request('/ecosystem/shelves/book/' + this.id, { method: 'POST', data: { shelf_name: name, reading_status: status } }).then(function () { uni.showToast({ title: '已加入' + name, icon: 'success' }) }).catch(function (e) { showError(e, '加入失败') })
    },
    submitComment: function () {
      const that = this
      if (!requireLogin()) return
      if (!that.commentText) { uni.showToast({ title: '请先输入评论', icon: 'none' }); return }
      request('/ecosystem/comments/' + that.id, { method: 'POST', data: { content: that.commentText, rating: that.rating } }).then(function () {
        that.commentText = ''
        uni.showToast({ title: '已发布', icon: 'success' })
        that.load()
      }).catch(function (e) { showError(e, '发布失败') })
    },
    like: function (c) {
      if (!requireLogin()) return
      const that = this
      request('/ecosystem/comments/' + c.id + '/like', { method: 'POST' }).then(function () { that.load() }).catch(function (e) { showError(e, '点赞失败') })
    },
    openPurchase: function (p) {
      request('/ecosystem/purchase-click/' + this.id + '?channel=' + encodeURIComponent(p.platform), { method: 'POST' }).catch(function () {})
      this.openUrl(p.url)
    },
    openChannel: function (c) { this.openUrl(c.url) },
    openUrl: function (url) {
      if (!url) return
      // #ifdef H5
      window.location.href = url
      // #endif
      // #ifndef H5
      uni.showModal({ title: '购书链接', content: url, showCancel: false })
      // #endif
    },
    goDetail: function (book) { uni.navigateTo({ url: '/pages/detail/detail?id=' + (book.id || book.book_id) }) }
  }
}
</script>

<style scoped>
.top{display:flex;gap:22rpx;align-items:flex-start;background:linear-gradient(135deg,#fff,#eff6ff)}.cover{width:190rpx;height:270rpx;border-radius:24rpx;background:#e5e7eb;box-shadow:0 14rpx 34rpx rgba(15,23,42,.12);flex-shrink:0}.info{flex:1;min-width:0}.book-title{display:block;color:#111827;font-size:38rpx;font-weight:900;line-height:1.25;margin-bottom:12rpx}.rating{display:block;color:#f59e0b;font-size:25rpx;font-weight:900;margin:12rpx 0}.actions{display:flex;gap:12rpx;margin-bottom:22rpx}.actions .btn{flex:1;font-size:24rpx;padding:0 10rpx}.desc{display:block;color:#475467;font-size:26rpx;line-height:1.75}.purchase{display:flex;align-items:center;justify-content:space-between;padding:18rpx 0;border-bottom:1rpx solid #eef2f7}.purchase-name{font-size:28rpx;font-weight:900;color:#111827}.textarea{margin:16rpx 0}.comment{padding:20rpx 0;border-bottom:1rpx solid #eef2f7}.comment-user{font-size:26rpx;font-weight:900;color:#111827}.comment-text{display:block;color:#475467;font-size:25rpx;line-height:1.65;margin:10rpx 0}.like{color:#7c3aed;font-size:24rpx;font-weight:900}@media screen and (max-width:380px){.top{display:block}.cover{width:220rpx;height:310rpx;margin-bottom:18rpx}.actions{display:block}.actions .btn{margin-bottom:12rpx}}
</style>
