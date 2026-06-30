<template>
  <view class="page">
    <view class="panel block">
      <text class="h1">用户管理</text>
      <text class="desc">搜索用户、启用或禁用账号，并导出 CSV。</text>
      <view class="toolbar">
        <input class="input" v-model="q" placeholder="用户名或邮箱" confirm-type="search" @confirm="load" />
        <button class="btn" @click="load">搜索</button>
        <button class="ghost" @click="exportCsv">导出 CSV</button>
      </view>
    </view>

    <view class="panel block">
      <view class="row head"><text>ID</text><text>用户</text><text>状态</text><text>操作</text></view>
      <view class="row" v-for="u in users" :key="u.id">
        <text>{{ u.id }}</text>
        <view class="user">
          <text class="strong">{{ u.username }}</text>
          <text class="muted">{{ u.email }}</text>
        </view>
        <text :class="u.is_active ? 'ok' : 'bad'">{{ u.is_active ? '启用' : '禁用' }}</text>
        <button class="mini" @click="toggle(u)">{{ u.is_active ? '禁用' : '启用' }}</button>
      </view>
      <view class="empty" v-if="!users.length">暂无用户数据</view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../api/request'

const q = ref('')
const users = ref([])

async function load() {
  try {
    const res = await request('/admin/users' + (q.value ? `?q=${encodeURIComponent(q.value)}` : ''))
    users.value = res.items || []
  } catch (e) {
    uni.showToast({ title: '加载用户失败', icon: 'none' })
  }
}

async function toggle(u) {
  try {
    await request(`/admin/users/${u.id}/status`, { method: 'PUT', data: { is_active: !u.is_active } })
    uni.showToast({ title: '已更新' })
    load()
  } catch (e) {
    uni.showToast({ title: '更新失败', icon: 'none' })
  }
}

async function exportCsv() {
  try {
    const res = await request('/admin/users/export-csv')
    uni.setClipboardData({ data: res.content || '' })
    uni.showToast({ title: 'CSV 已复制' })
  } catch (e) {
    uni.showToast({ title: '导出失败', icon: 'none' })
  }
}

onMounted(load)
</script>

<style scoped>
.page{padding:28rpx;background:#f6f7fb;min-height:100vh;box-sizing:border-box}
.panel{background:#fff;border-radius:22rpx;box-shadow:0 18rpx 44rpx rgba(15,23,42,.08)}
.block{padding:30rpx;margin-bottom:22rpx}
.h1{font-size:42rpx;font-weight:900;color:#111827}
.desc,.muted{display:block;color:#667085;font-size:24rpx;margin-top:8rpx}
.toolbar{display:flex;gap:12rpx;flex-wrap:wrap;margin-top:22rpx}
.input{flex:1;min-width:280rpx;background:#f8fafc;border-radius:16rpx;padding:18rpx}
.btn,.ghost,.mini{font-weight:800;border-radius:16rpx}
.btn{background:#2563eb;color:white}
.ghost{background:#eef2ff;color:#1d4ed8}
.mini{font-size:24rpx;background:#f1f5f9;color:#334155}
.row{display:grid;grid-template-columns:80rpx 1.8fr 110rpx 120rpx;gap:12rpx;align-items:center;padding:18rpx 0;border-bottom:1rpx solid #eef2f7}
.head{font-weight:900;color:#475467}
.strong{display:block;font-weight:900;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.user{min-width:0}
.ok{color:#16a34a;font-weight:900}
.bad{color:#dc2626;font-weight:900}
.empty{color:#98a2b3;text-align:center;padding:28rpx}
</style>
