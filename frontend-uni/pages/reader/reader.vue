<template>
  <view class="page reader-page">
    <view class="reader-head">
      <view class="reader-title-box">
        <text class="h1">电子书在线试读</text>
        <text class="meta">{{ platformLabel }} · 通过 WebView 打开后端阅读器</text>
      </view>
      <button class="btn small secondary copy" @click="copyUrl">复制地址</button>
    </view>

    <view v-if="tip" class="tip">
      <text>{{ tip }}</text>
    </view>

    <web-view v-if="readerUrl" :src="readerUrl" class="webview" />
  </view>
</template>

<script>
import { SERVER_ORIGIN, getToken, getPlatformLabel, getPlatformName } from '../../api/request.js'

export default {
  data() {
    return {
      readerUrl: '',
      platformLabel: getPlatformLabel(),
      tip: ''
    }
  },
  onLoad(options) {
    const id = (options && (options.id || options.book_id)) || 1
    const token = getToken()
    const platform = getPlatformName()
    const query = [
      'book_id=' + encodeURIComponent(id),
      'record=0',
      'from=uni',
      'platform=' + encodeURIComponent(platform),
      'v=mobile-reader-one-page-1'
    ]
    if (token) query.push('token=' + encodeURIComponent(token))
    this.readerUrl = SERVER_ORIGIN + '/static/reader.html?' + query.join('&')

    if (platform === 'mp-weixin') {
      this.tip = '微信小程序正式发布时，reader 页面需要配置 HTTPS 业务域名；本地开发阶段可在开发者工具关闭合法域名校验。'
    } else if (platform === 'ios') {
      this.tip = 'iOS 调试局域网 HTTP 时，如打不开，请优先使用 HTTPS 域名或检查 manifest 的网络安全配置。'
    }
  },
  methods: {
    copyUrl: function () {
      const that = this
      uni.setClipboardData({
        data: that.readerUrl,
        success: function () { uni.showToast({ title: '已复制', icon: 'success' }) }
      })
    }
  }
}
</script>

<style scoped>
.reader-page{height:100vh;padding:0;background:#f8fafc}.reader-head{display:flex;align-items:center;justify-content:space-between;gap:16rpx;margin:18rpx;padding:22rpx;border-radius:24rpx;background:#fff;box-shadow:0 12rpx 30rpx rgba(15,23,42,.08)}.reader-title-box{flex:1;min-width:0}.h1{display:block;font-size:36rpx;font-weight:900;color:#111827}.meta{display:block;color:#667085;margin-top:8rpx;font-size:22rpx}.copy{width:148rpx;padding:0;font-size:22rpx}.tip{margin:0 18rpx 14rpx;padding:16rpx 20rpx;border-radius:18rpx;background:#fff7ed;color:#9a3412;font-size:23rpx;line-height:1.55}.webview{width:100%;height:calc(100vh - 154rpx)}
</style>
