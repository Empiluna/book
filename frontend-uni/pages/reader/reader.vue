<template>
  <view class="page reader-page">
    <view class="glass head">
      <text class="h1">电子书在线试读</text>
      <text class="meta">Android / 微信小程序通过 WebView 打开后端阅读器</text>
    </view>
    <web-view :src="readerUrl" class="webview" />
  </view>
</template>

<script>
import { SERVER_ORIGIN } from '../../api/request.js'

export default {
  data() {
    return {
      readerUrl: ''
    }
  },
  onLoad(options) {
    const id = (options && (options.id || options.book_id)) || 1
    const token = uni.getStorageSync('token') || ''
    const query = [
      'book_id=' + encodeURIComponent(id),
      'record=0',
      'from=uni',
      'v=android-mp-fixed-1'
    ]
    if (token) query.push('token=' + encodeURIComponent(token))
    this.readerUrl = SERVER_ORIGIN + '/static/reader.html?' + query.join('&')
  }
}
</script>

<style scoped>
.reader-page {
  height: 100vh;
  padding: 0;
  background: #f8fafc;
}
.head {
  margin: 20rpx;
  padding: 24rpx;
}
.h1 {
  display: block;
  font-size: 40rpx;
  font-weight: 900;
}
.meta {
  display: block;
  color: #667085;
  margin-top: 8rpx;
}
.webview {
  width: 100%;
  height: calc(100vh - 150rpx);
}
</style>
