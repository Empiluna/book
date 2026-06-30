<template>
  <view class="page">
    <view class="card">
      <view class="title">知人知书 · 管理控制台</view>
      <view class="muted">uni-app 多端管理入口已接入真实后端接口，支持用户、图书、评论、知识图谱和系统配置管理。</view>
      <view class="grid">
        <view class="tile" @click="go('/admin/dashboard')">数据总览</view>
        <view class="tile" @click="go('/admin/books')">图书管理</view>
        <view class="tile" @click="go('/admin/users')">用户管理</view>
        <view class="tile" @click="go('/admin/comments')">评论管理</view>
        <view class="tile" @click="go('/admin/graph')">知识图谱</view>
        <view class="tile" @click="go('/admin/settings')">系统设置</view>
      </view>
    </view>
  </view>
</template>
<script setup>
function go(url){ uni.navigateTo({ url }) }
</script>
<style scoped>
.page{min-height:100vh;background:linear-gradient(135deg,#eef2ff,#f8fafc);padding:32rpx}.card{background:#fff;border-radius:32rpx;padding:36rpx;box-shadow:0 30rpx 70rpx rgba(15,23,42,.1)}.title{font-size:44rpx;font-weight:900;color:#111827}.muted{margin:18rpx 0 26rpx;color:#667085;line-height:1.8}.grid{display:grid;grid-template-columns:1fr 1fr;gap:18rpx}.tile{padding:30rpx;border-radius:24rpx;background:linear-gradient(135deg,#4f46e5,#06b6d4);color:#fff;font-weight:900;text-align:center}
</style>
