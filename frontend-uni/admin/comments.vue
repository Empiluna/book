<template>
  <view class="page">
    <view class="glass block"><text class="h1">评论管理</text><text class="desc">查看全站评论、按图书或用户筛选、置顶精彩评论、删除违规评论。</text>
      <view class="toolbar"><input class="input" v-model="bookId" placeholder="图书ID"/><input class="input" v-model="username" placeholder="用户名"/><button class="btn" @click="load">筛选</button></view>
    </view>
    <view class="glass block"><view class="row head"><text>ID</text><text>内容</text><text>评分</text><text>操作</text></view>
      <view class="row" v-for="c in comments" :key="c.id"><text>{{c.id}}</text><view><text class="strong">{{c.content}}</text><text class="muted">{{c.username}} · {{c.book_title}} · 赞 {{c.likes_count}}</text></view><text>{{c.rating || '-'}}</text><view><button class="mini" @click="pin(c)">{{c.is_pinned?'取消置顶':'置顶'}}</button><button class="mini danger" @click="remove(c)">删除</button></view></view>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../api/request'
const comments=ref([]); const bookId=ref(''); const username=ref('')
async function load(){ const qs=[]; if(bookId.value) qs.push('book_id='+bookId.value); if(username.value) qs.push('username='+encodeURIComponent(username.value)); const res=await request('/ecosystem/admin/comments'+(qs.length?'?'+qs.join('&'):'')); comments.value=res.items||[] }
async function pin(c){ await request(`/ecosystem/admin/comments/${c.id}/pin`,{method:'POST'}); load() }
async function remove(c){ uni.showModal({title:'删除评论',content:c.content,success:async r=>{ if(r.confirm){ await request(`/ecosystem/admin/comments/${c.id}`,{method:'DELETE'}); load() } }}) }
onMounted(load)
</script>
<style scoped>.page{padding:28rpx;background:#f6f7fb;min-height:100vh}.glass{background:#fff;border-radius:30rpx;box-shadow:0 22rpx 60rpx rgba(15,23,42,.08)}.block{padding:30rpx;margin-bottom:22rpx}.h1{font-size:44rpx;font-weight:900}.desc,.muted{display:block;color:#667085;font-size:24rpx;margin-top:8rpx}.toolbar{display:flex;gap:12rpx;margin-top:18rpx}.input{flex:1;background:#f8fafc;border-radius:18rpx;padding:18rpx}.btn,.mini{font-weight:800;border-radius:18rpx}.btn{background:#4f46e5;color:white}.mini{font-size:24rpx;background:#f1f5f9;color:#334155;margin:4rpx}.danger{background:#fee2e2;color:#b91c1c}.row{display:grid;grid-template-columns:70rpx 1.8fr 80rpx 190rpx;gap:12rpx;align-items:center;padding:18rpx 0;border-bottom:1rpx solid #eef2f7}.head{font-weight:900;color:#475467}.strong{display:block;font-weight:900;max-height:80rpx;overflow:hidden}</style>
