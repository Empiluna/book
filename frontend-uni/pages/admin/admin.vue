<template>
  <view class="page">
    <view class="hero">
      <text class="eyebrow">Admin Console</text>
      <text class="title">管理后台</text>
      <text class="desc">集中处理运营总览、图书、用户、评论、知识图谱和系统配置。</text>
    </view>
    <view class="grid">
      <view class="tile primary" @click="go('/admin/dashboard')">
        <text class="tile-title">数据总览</text>
        <text class="tile-desc">指标、热门图书、分类分布</text>
      </view>
      <view class="tile" @click="go('/admin/books')">
        <text class="tile-title">图书管理</text>
        <text class="tile-desc">新增、编辑、删除、索引重建</text>
      </view>
      <view class="tile" @click="go('/admin/users')">
        <text class="tile-title">用户管理</text>
        <text class="tile-desc">搜索、启用、禁用、导出</text>
      </view>
      <view class="tile" @click="go('/admin/comments')">
        <text class="tile-title">评论管理</text>
        <text class="tile-desc">筛选、置顶、删除</text>
      </view>
      <view class="tile" @click="go('/admin/graph')">
        <text class="tile-title">知识图谱</text>
        <text class="tile-desc">同步、关系、Cypher 控制台</text>
      </view>
      <view class="tile" @click="go('/admin/settings')">
        <text class="tile-title">系统设置</text>
        <text class="tile-desc">推荐权重、系统配置</text>
      </view>
    </view>
  </view>
</template>

<script setup>
function go(url) {
  uni.navigateTo({ url })
}
</script>

<style scoped>
.page{min-height:100vh;background:#f6f7fb;padding:28rpx}.hero{background:#fff;border-radius:28rpx;padding:34rpx;margin-bottom:22rpx;box-shadow:0 22rpx 60rpx rgba(15,23,42,.08)}.eyebrow{display:block;color:#4f46e5;font-size:22rpx;font-weight:900;text-transform:uppercase}.title{display:block;color:#111827;font-size:46rpx;font-weight:900;margin-top:8rpx}.desc{display:block;color:#667085;font-size:26rpx;line-height:1.7;margin-top:12rpx}.grid{display:grid;grid-template-columns:1fr 1fr;gap:18rpx}.tile{min-height:178rpx;border-radius:24rpx;background:#fff;padding:26rpx;box-shadow:0 16rpx 42rpx rgba(15,23,42,.07);border:1rpx solid #eef2f7}.tile.primary{background:linear-gradient(135deg,#4f46e5,#06b6d4);color:#fff}.tile-title{display:block;font-size:30rpx;font-weight:900;color:inherit}.tile-desc{display:block;font-size:22rpx;line-height:1.5;margin-top:12rpx;color:inherit;opacity:.76}
</style>
