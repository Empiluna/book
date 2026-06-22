<template>
  <!--
    login.vue — 登录/注册页
    负责人: A (模块一: 用户画像)
    路由: pages/login/login
  -->
  <view class="page">
    <view class="form-card">
      <text class="form-title">{{ isLogin ? '登录' : '注册' }}</text>

      <view v-if="!isLogin" class="input-group">
        <text class="label">邮箱</text>
        <input v-model="email" class="input" type="text" placeholder="your@email.com" />
      </view>

      <view class="input-group">
        <text class="label">用户名</text>
        <input v-model="username" class="input" type="text" placeholder="请输入用户名" />
      </view>

      <view class="input-group">
        <text class="label">密码</text>
        <input v-model="password" class="input" type="password" placeholder="请输入密码" />
      </view>

      <button class="btn-primary" style="width:100%;margin-top:24rpx;" @click="handleSubmit" :loading="submitting">
        {{ isLogin ? '登录' : '注册' }}
      </button>

      <view class="toggle-text">
        <text>{{ isLogin ? '还没有账号？' : '已有账号？' }}</text>
        <text class="link" @click="isLogin = !isLogin">{{ isLogin ? '去注册' : '去登录' }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import Auth from '../../utils/auth.js';
import { store } from '../../store/index.js';

export default {
  data() {
    return {
      isLogin: true,
      username: '',
      password: '',
      email: '',
      submitting: false,
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.username.trim() || !this.password) {
        uni.showToast({ title: '请填写用户名和密码', icon: 'none' });
        return;
      }
      if (!this.isLogin && !this.email.trim()) {
        uni.showToast({ title: '请填写邮箱', icon: 'none' });
        return;
      }

      this.submitting = true;
      try {
        if (this.isLogin) {
          const data = await Auth.login(this.username, this.password);
          store.setUser({ user_id: data.user_id, username: data.username, is_admin: data.is_admin || false });
        } else {
          const data = await Auth.register(this.username, this.email, this.password);
          store.setUser({ user_id: data.user_id, username: data.username, is_admin: data.is_admin || false });
        }
        uni.showToast({ title: this.isLogin ? '登录成功' : '注册成功', icon: 'success' });
        setTimeout(() => {
          uni.switchTab({ url: '/pages/index/index' });
        }, 800);
      } catch (err) {
        uni.showToast({ title: err.message, icon: 'none' });
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style scoped>
.page {
  display: flex; align-items: center; justify-content: center;
  min-height: 100vh; padding: 40rpx;
}
.form-card {
  width: 100%; max-width: 600rpx;
  background: #fff; border-radius: 24rpx;
  padding: 60rpx 40rpx; box-shadow: 0 4rpx 24rpx rgba(0,0,0,0.08);
}
.form-title { font-size: 40rpx; font-weight: 700; text-align: center; display: block; margin-bottom: 40rpx; }
.input-group { margin-bottom: 24rpx; }
.label { font-size: 26rpx; font-weight: 600; color: #334155; margin-bottom: 8rpx; display: block; }
.input {
  width: 100%; height: 80rpx;
  border: 2rpx solid #e2e8f0; border-radius: 12rpx;
  padding: 0 20rpx; font-size: 28rpx;
}
.input:focus { border-color: #2563eb; }
.toggle-text { text-align: center; margin-top: 24rpx; font-size: 26rpx; color: #94a3b8; }
.link { color: #2563eb; margin-left: 8rpx; }
</style>
