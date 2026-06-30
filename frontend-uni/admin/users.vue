<template>
  <view class="page">
    <view class="glass block"><text class="h1">用户管理</text><text class="desc">查看用户列表、搜索用户、禁用/启用账号、导出CSV。</text>
      <view class="toolbar"><input class="input" v-model="q" placeholder="用户名/邮箱搜索"/><button class="btn" @click="load">搜索</button><button class="ghost" @click="exportCsv">导出CSV</button></view>
    </view>
    <view class="glass block"><view class="row head"><text>ID</text><text>用户</text><text>状态</text><text>操作</text></view>
      <view class="row" v-for="u in users" :key="u.id"><text>{{u.id}}</text><view><text class="strong">{{u.username}}</text><text class="muted">{{u.email}}</text></view><text :class="u.is_active?'ok':'bad'">{{u.is_active?'启用':'禁用'}}</text><button class="mini" @click="toggle(u)">{{u.is_active?'禁用':'启用'}}</button></view>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../api/request'
const q=ref(''); const users=ref([])
async function load(){ const res=await request('/admin/users'+(q.value?`?q=${encodeURIComponent(q.value)}`:'')); users.value=res.items||[] }
async function toggle(u){ await request(`/admin/users/${u.id}/status`,{method:'PUT',data:{is_active:!u.is_active}}); uni.showToast({title:'已更新'}); load() }
async function exportCsv(){ const res=await request('/admin/users/export-csv'); uni.setClipboardData({data:res.content}); uni.showToast({title:'CSV已复制'}) }
onMounted(load)
</script>
<style scoped>
.page{padding:28rpx;background:#f6f7fb;min-height:100vh}.glass{background:#fff;border-radius:30rpx;box-shadow:0 22rpx 60rpx rgba(15,23,42,.08)}.block{padding:30rpx;margin-bottom:22rpx}.h1{font-size:44rpx;font-weight:900}.desc,.muted{display:block;color:#667085;font-size:24rpx;margin-top:8rpx}.toolbar{display:flex;gap:12rpx;margin-top:22rpx}.input{flex:1;background:#f8fafc;border-radius:18rpx;padding:18rpx}.btn,.ghost,.mini{font-weight:800;border-radius:18rpx}.btn{background:#4f46e5;color:white}.ghost{background:#eef2ff;color:#3730a3}.mini{font-size:24rpx;background:#f1f5f9;color:#334155}.row{display:grid;grid-template-columns:80rpx 1.8fr 110rpx 120rpx;gap:12rpx;align-items:center;padding:18rpx 0;border-bottom:1rpx solid #eef2f7}.head{font-weight:900;color:#475467}.strong{display:block;font-weight:900}.ok{color:#16a34a;font-weight:900}.bad{color:#dc2626;font-weight:900}
</style>
