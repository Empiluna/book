<template>
  <view class="page">
    <view class="panel block">
      <text class="h1">评论管理</text>
      <text class="desc">按图书或用户筛选评论，支持置顶和删除。</text>
      <view class="toolbar">
        <input class="input" v-model="bookId" placeholder="图书 ID" type="number" />
        <input class="input" v-model="username" placeholder="用户名" confirm-type="search" @confirm="load" />
        <button class="btn" @click="load">筛选</button>
      </view>
    </view>

    <view class="panel block">
      <view class="row head"><text>ID</text><text>内容</text><text>评分</text><text>操作</text></view>
      <view class="row" v-for="c in comments" :key="c.id">
        <text>{{ c.id }}</text>
        <view class="comment">
          <text class="strong">{{ c.content }}</text>
          <text class="muted">{{ c.username }} · {{ c.book_title || '未知图书' }} · 赞 {{ c.likes_count || 0 }}</text>
        </view>
        <text>{{ c.rating || '-' }}</text>
        <view class="ops">
          <button class="mini" @click="pin(c)">{{ c.is_pinned ? '取消' : '置顶' }}</button>
          <button class="mini danger" @click="remove(c)">删除</button>
        </view>
      </view>
      <view class="empty" v-if="!comments.length">暂无评论数据</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { request } from '../api/request'
import { requireAdminPage } from '../utils/admin'

const comments = ref([])
const bookId = ref('')
const username = ref('')

async function load() {
  try {
    const qs = []
    if (bookId.value) qs.push(`book_id=${encodeURIComponent(bookId.value)}`)
    if (username.value) qs.push(`username=${encodeURIComponent(username.value)}`)
    const res = await request('/ecosystem/admin/comments' + (qs.length ? `?${qs.join('&')}` : ''))
    comments.value = res.items || []
  } catch (e) {
    uni.showToast({ title: '加载评论失败', icon: 'none' })
  }
}

async function pin(c) {
  try {
    await request(`/ecosystem/admin/comments/${c.id}/pin`, { method: 'POST' })
    load()
  } catch (e) {
    uni.showToast({ title: '操作失败', icon: 'none' })
  }
}

function remove(c) {
  uni.showModal({
    title: '删除评论',
    content: c.content,
    success: async (r) => {
      if (!r.confirm) return
      try {
        await request(`/ecosystem/admin/comments/${c.id}`, { method: 'DELETE' })
        uni.showToast({ title: '已删除' })
        load()
      } catch (e) {
        uni.showToast({ title: '删除失败', icon: 'none' })
      }
    }
  })
}

onShow(() => { if (requireAdminPage()) load() })
</script>

<style scoped>
.page{padding:28rpx;background:#f6f7fb;min-height:100vh;box-sizing:border-box}
.panel{background:#fff;border-radius:22rpx;box-shadow:0 18rpx 44rpx rgba(15,23,42,.08)}
.block{padding:30rpx;margin-bottom:22rpx}
.h1{font-size:42rpx;font-weight:900;color:#111827}
.desc,.muted{display:block;color:#667085;font-size:24rpx;margin-top:8rpx}
.toolbar{display:flex;gap:12rpx;flex-wrap:wrap;margin-top:18rpx}
.input{flex:1;min-width:220rpx;background:#f8fafc;border-radius:16rpx;padding:18rpx}
.btn,.mini{font-weight:800;border-radius:16rpx}
.btn{background:#2563eb;color:white}
.mini{font-size:24rpx;background:#f1f5f9;color:#334155;margin:4rpx;padding:0 16rpx}
.danger{background:#fee2e2;color:#b91c1c}
.row{display:grid;grid-template-columns:70rpx 1.8fr 80rpx 190rpx;gap:12rpx;align-items:center;padding:18rpx 0;border-bottom:1rpx solid #eef2f7}
.head{font-weight:900;color:#475467}
.comment{min-width:0}
.strong{display:block;font-weight:900;max-height:82rpx;overflow:hidden}
.ops{display:flex;flex-wrap:wrap}
.empty{color:#98a2b3;text-align:center;padding:28rpx}
</style>
