<template>
  <view class="book-card" @click="tap">
    <image class="cover" :src="cover" mode="aspectFill"></image>
    <view class="info">
      <view class="between top-line">
        <text class="name">{{ book.title || '未命名图书' }}</text>
        <text v-if="book.is_new" class="new">新</text>
      </view>
      <text class="meta">{{ author }} · {{ book.category || '图书' }} · ⭐ {{ book.avg_rating || 0 }}</text>
      <view class="tags" v-if="tags.length">
        <text v-for="t in tags" :key="t" class="tag">{{ t }}</text>
      </view>
      <text class="desc">{{ book.reason || book.description || '暂无简介' }}</text>
    </view>
  </view>
</template>

<script>
import { toAbsoluteUrl } from '../api/request.js'
export default {
  name: 'BookCard',
  props: { book: { type: Object, default: function () { return {} } } },
  computed: {
    cover: function () { return toAbsoluteUrl(this.book.cover_thumb_url || this.book.cover_url || this.book.cover || '') },
    author: function () {
      if (this.book.author) return this.book.author
      if (Array.isArray(this.book.authors)) return this.book.authors.join('、') || '未知作者'
      return '未知作者'
    },
    tags: function () { return Array.isArray(this.book.tags) ? this.book.tags.slice(0, 3) : [] }
  },
  methods: { tap: function () { this.$emit('click', this.book) } }
}
</script>

<style scoped>
.book-card{display:flex;gap:20rpx;padding:22rpx;margin-bottom:20rpx;border-radius:30rpx;background:rgba(255,255,255,.96);box-shadow:0 16rpx 40rpx rgba(15,23,42,.08);border:1rpx solid rgba(226,232,240,.8)}.cover{width:132rpx;height:184rpx;border-radius:20rpx;background:linear-gradient(135deg,#1e293b,#7c3aed);flex-shrink:0}.info{flex:1;min-width:0}.top-line{align-items:flex-start}.name{display:block;flex:1;font-size:31rpx;font-weight:900;color:#111827;margin-bottom:10rpx;line-height:1.35;max-height:84rpx;overflow:hidden}.new{background:#f97316;color:#fff;border-radius:999rpx;padding:4rpx 10rpx;font-size:20rpx;font-weight:900}.meta{display:block;color:#667085;font-size:23rpx;margin-bottom:10rpx;line-height:1.35}.tags{display:flex;gap:8rpx;flex-wrap:wrap}.tag{font-size:20rpx;padding:6rpx 12rpx;border-radius:999rpx;background:#f2f4f7;color:#475467}.desc{display:block;margin-top:10rpx;color:#475467;font-size:23rpx;line-height:1.5;max-height:70rpx;overflow:hidden}
</style>
