<template>
  <view class="page">
    <view class="glass card">
      <text class="h1">{{ user?.nickname || '未登录' }}</text>
      <text class="meta" v-if="user">{{ user.username }} · {{ user.is_admin ? '管理员' : '普通用户' }}</text>
      <view class="actions">
        <button v-if="!user" class="btn" @click="goLogin">登录</button>
        <button v-if="isAdmin" class="btn" @click="goAdmin">管理后台</button>
      </view>
    </view>
    <view class="glass stats" v-if="stats">
      <view><text>{{ stats.total_reading_minutes }}</text><span>阅读分钟</span></view>
      <view><text>{{ stats.completed_books }}</text><span>已完成</span></view>
      <view><text>{{ stats.ratings_count }}</text><span>评分</span></view>
      <view><text>{{ stats.shelf_count }}</text><span>书架</span></view>
    </view>
    <view class="glass tags">
      <text class="title">兴趣标签</text>
      <text v-for="t in profile.tag_preferences" :key="t.name" class="tag">{{ t.name }}</text>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { request } from '../../api/request'
import { isAdminUser } from '../../utils/admin'

const user = ref(null)
const stats = ref(null)
const profile = ref({ tag_preferences: [] })
const isAdmin = computed(() => isAdminUser(user.value))

async function load() {
  user.value = uni.getStorageSync('user') || null
  if (!user.value) {
    stats.value = null
    profile.value = { tag_preferences: [] }
    return
  }
  try {
    stats.value = await request('/user/stats')
    profile.value = await request('/user/profile')
  } catch (e) {}
}

function goLogin() {
  uni.navigateTo({ url: '/pages/login/login' })
}

function goAdmin() {
  uni.navigateTo({ url: '/pages/admin/admin' })
}

onShow(load)
</script>

<style scoped>
.card,.stats,.tags{padding:26rpx;margin:18rpx}.h1{display:block;font-size:42rpx;font-weight:900}.meta{display:block;color:#667085;margin-top:8rpx}.actions{display:flex;gap:12rpx;flex-wrap:wrap;margin-top:18rpx}.stats{display:grid;grid-template-columns:repeat(4,1fr);text-align:center}.stats text{display:block;font-size:38rpx;font-weight:900;color:#7c3aed}.stats span{color:#667085;font-size:22rpx}.title{display:block;font-weight:900;margin-bottom:16rpx}.tag{display:inline-block;padding:10rpx 16rpx;background:#f2f4f7;border-radius:999rpx;margin:8rpx}
</style>
