<template>
  <view class="container login-page">
    <view class="card login-card">
      <text class="logo">KG</text>
      <text class="title center">用户登录</text>
      <input class="input" v-model="account" placeholder="用户名 / 邮箱" />
      <input class="input" v-model="password" password placeholder="密码" />
      <button class="btn" @click="login">登录</button>
      <button class="btn secondary" @click="registerAccount">注册当前账号</button>
      <button class="btn secondary" @click="demo">使用演示账号</button>
    </view>
  </view>
</template>
<script>
import { request, saveLogin, showError } from '../../api/request.js'
export default {
  data: function () { return { account: 'demo', password: 'demo123' } },
  methods: {
    login: function () {
      const that = this
      if (!that.account || !that.password) { uni.showToast({ title: '请输入账号和密码', icon: 'none' }); return }
      request('/user/login', { method: 'POST', data: { account: that.account, username_or_email: that.account, password: that.password, role: 'user' } }).then(function (res) {
        saveLogin(res)
        uni.showToast({ title: '登录成功', icon: 'success' })
        setTimeout(function () { uni.switchTab({ url: '/pages/profile/profile' }) }, 500)
      }).catch(function (e) { showError(e, '登录失败') })
    },
    registerAccount: function () {
      const that = this
      if (!that.account || !that.password) { uni.showToast({ title: '请先填写账号密码', icon: 'none' }); return }
      request('/user/register', { method: 'POST', data: { username: that.account, email: that.account + '@demo.com', nickname: that.account, password: that.password } }).then(function () { that.login() }).catch(function (e) { showError(e, '注册失败') })
    },
    demo: function () { this.account = 'demo'; this.password = 'demo123'; this.login() }
  }
}
</script>
<style scoped>
.login-page{display:flex;align-items:center;justify-content:center}.login-card{width:100%;padding:40rpx}.logo{display:block;width:92rpx;height:92rpx;line-height:92rpx;text-align:center;margin:0 auto 24rpx;border-radius:24rpx;color:#fff;font-size:38rpx;font-weight:900;background:linear-gradient(135deg,#7c3aed,#0ea5e9)}.center{text-align:center;display:block}.input{margin-bottom:20rpx}.btn{margin-top:12rpx}
</style>
