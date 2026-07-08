<template>
  <view class="container">
    <view class="card hero">
      <text class="title">多端连接诊断</text>
      <text class="muted">用于 Android、iOS、微信小程序调试接口地址和后端连通性。</text>
    </view>

    <view class="card">
      <text class="sub-title">当前运行环境</text>
      <view class="info-row"><text>平台</text><text>{{ platformLabel }}</text></view>
      <view class="info-row"><text>后端地址</text><text>{{ origin }}</text></view>
      <view class="info-row"><text>接口地址</text><text>{{ apiBase }}</text></view>
      <view class="info-row"><text>系统</text><text>{{ systemText }}</text></view>
      <button class="btn" @click="check">测试后端连接</button>
    </view>

    <view class="card" v-if="status">
      <text class="sub-title">检测结果</text>
      <text :class="ok ? 'ok' : 'bad'">{{ status }}</text>
      <text class="muted" v-if="tips">{{ tips }}</text>
    </view>

    <view class="card">
      <text class="sub-title">运行提示</text>
      <text class="muted">Android / iPhone 真机：手机和电脑要在同一个 Wi-Fi，后端必须用 --host 0.0.0.0 启动。</text>
      <text class="muted">微信小程序开发工具：本地调试可关闭合法域名校验；正式发布需要 HTTPS 域名。</text>
      <text class="muted">如果连接失败，修改 frontend-uni/api/request.js 里的 LAN_ORIGIN。</text>
    </view>
  </view>
</template>

<script>
import { ORIGIN, API_BASE, getPlatformLabel, systemInfo, healthCheck } from '../../api/request.js'

export default {
  data: function () {
    return {
      origin: ORIGIN,
      apiBase: API_BASE,
      platformLabel: getPlatformLabel(),
      system: systemInfo(),
      status: '',
      tips: '',
      ok: false
    }
  },
  computed: {
    systemText: function () {
      const s = this.system || {}
      return [s.platform, s.system, s.model].filter(Boolean).join(' · ') || '未知'
    }
  },
  onLoad: function () { this.check() },
  methods: {
    check: function () {
      const that = this
      that.status = '正在检测...'
      that.tips = ''
      that.ok = false
      healthCheck().then(function () {
        that.ok = true
        that.status = '后端连接正常'
        that.tips = '现在可以继续测试登录、搜索、图谱、书架和阅读器。'
      }).catch(function (e) {
        that.ok = false
        that.status = (e && e.message) || '后端连接失败'
        that.tips = '请确认后端已启动、手机和电脑同一网络、防火墙已放行 8000 端口，并检查 LAN_ORIGIN 是否为电脑真实 IPv4。'
      })
    }
  }
}
</script>

<style scoped>
.hero{background:linear-gradient(135deg,#fff,#eff6ff)}.info-row{display:flex;justify-content:space-between;gap:18rpx;padding:18rpx 0;border-bottom:1rpx solid #eef2f7}.info-row text:first-child{color:#667085;font-size:26rpx}.info-row text:last-child{flex:1;text-align:right;color:#111827;font-size:24rpx;font-weight:800;word-break:break-all}.ok{display:block;color:#047857;font-size:30rpx;font-weight:900;margin-bottom:12rpx}.bad{display:block;color:#b42318;font-size:30rpx;font-weight:900;margin-bottom:12rpx}.btn{margin-top:22rpx}
</style>
