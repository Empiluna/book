<template>
  <view class="chat-page">
    <scroll-view scroll-y class="messages" :scroll-top="scrollTop">
      <view class="welcome card" v-if="messages.length === 0">
        <text class="title">AI 荐书助手</text>
        <text class="muted">可以问：推荐几本科幻小说、怎么管理书架、知识图谱推荐路径怎么算。</text>
        <view class="chips"><text class="chip" @click="quick('推荐几本人工智能入门书')">人工智能入门</text><text class="chip" @click="quick('推荐几本科幻小说')">科幻小说</text><text class="chip" @click="quick('怎么管理书架？')">书架帮助</text></view>
      </view>
      <view v-for="(m,idx) in messages" :key="idx" :class="m.role==='user'?'msg user':'msg bot'">
        <text class="msg-text">{{ m.content }}</text>
      </view>
      <BookCard v-for="b in books" :key="b.id" :book="b" @click="goDetail"></BookCard>
    </scroll-view>
    <view class="input-bar">
      <input class="input" v-model="text" placeholder="输入问题" confirm-type="send" @confirm="send" />
      <button class="btn send" @click="send">发送</button>
    </view>
  </view>
</template>
<script>
import BookCard from '../../components/BookCard.vue'
import { request, normalizeBooks, showError } from '../../api/request.js'
export default {
  components: { BookCard: BookCard },
  data: function () { return { text: '', messages: [], books: [], sending: false, scrollTop: 0 } },
  methods: {
    quick: function (t) { this.text = t; this.send() },
    send: function () {
      const that = this
      const msg = that.text.trim()
      if (!msg || that.sending) return
      that.text = ''; that.sending = true; that.books = []
      that.messages.push({ role: 'user', content: msg })
      request('/chat/send', { method: 'POST', data: { message: msg } }).then(function (res) {
        that.messages.push({ role: 'assistant', content: res.answer || '暂时没有回答。' })
        that.books = normalizeBooks(res.books || [])
        setTimeout(function () { that.scrollTop += 9999 }, 100)
      }).catch(function (e) { showError(e, '发送失败') }).then(function () { that.sending = false })
    },
    goDetail: function (book) { uni.navigateTo({ url: '/pages/detail/detail?id=' + (book.id || book.book_id) }) }
  }
}
</script>
<style scoped>
.chat-page{height:100vh;background:#f8fafc;display:flex;flex-direction:column}.messages{flex:1;padding:24rpx}.msg{max-width:86%;padding:20rpx 24rpx;border-radius:24rpx;margin-bottom:18rpx}.msg.user{margin-left:auto;background:#7c3aed;color:#fff}.msg.bot{background:#fff;color:#111827;box-shadow:0 10rpx 26rpx rgba(15,23,42,.07)}.msg-text{font-size:28rpx;line-height:1.65}.input-bar{display:flex;gap:12rpx;background:#fff;padding:18rpx 20rpx;padding-bottom:calc(18rpx + env(safe-area-inset-bottom));box-shadow:0 -8rpx 28rpx rgba(15,23,42,.08)}.input-bar .input{flex:1}.send{width:140rpx;font-size:26rpx;padding:0}
</style>
