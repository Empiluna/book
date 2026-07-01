<template>
  <view class="page">
    <view class="panel hero">
      <text class="h1">管理后台</text>
      <text class="desc">运营指标、热门排行、分类分布和缓存状态。</text>
      <view class="actions">
        <button class="btn" @click="load">刷新</button>
        <button class="ghost" @click="go('/admin/books')">图书</button>
        <button class="ghost" @click="go('/admin/graph')">图谱</button>
      </view>
    </view>

    <view class="grid">
      <view class="stat" v-for="c in cardList" :key="c.label">
        <text class="num">{{ c.value }}</text>
        <text class="label">{{ c.label }}</text>
      </view>
    </view>

    <view class="panel block">
      <text class="section">热门图书 TOP 10</text>
      <view class="row head"><text>书名</text><text>评分</text><text>热度</text></view>
      <view class="row" v-for="b in hotBooks" :key="b.id">
        <text class="ellipsis">{{ b.title }}</text><text>{{ b.avg_rating }}</text><text>{{ b.hot_score }}</text>
      </view>
      <view class="empty" v-if="!hotBooks.length">暂无热门图书</view>
    </view>

    <view class="panel block">
      <text class="section">类别分布</text>
      <view class="barrow" v-for="it in categories" :key="it.name">
        <text class="ellipsis">{{ it.name }}</text>
        <view class="bar"><view class="fill" :style="{ width: it.percent + '%' }"></view></view>
        <text>{{ it.count }}</text>
      </view>
      <view class="empty" v-if="!categories.length">暂无分类数据</view>
    </view>

    <view class="panel block">
      <text class="section">缓存状态</text>
      <text class="json">{{ cacheText }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { request } from '../api/request'
import { requireAdminPage } from '../utils/admin'

const data = ref({ cards: {}, hot_books: [], category_distribution: {}, cache: {} })

const cardList = computed(() => [
  { label: '图书总数', value: data.value.cards?.books || 0 },
  { label: '注册用户', value: data.value.cards?.users || 0 },
  { label: '评论总数', value: data.value.cards?.comments || 0 },
  { label: '购书跳转', value: data.value.cards?.purchase_clicks || 0 }
])
const hotBooks = computed(() => data.value.hot_books || [])
const categories = computed(() => {
  const obj = data.value.category_distribution || {}
  const max = Math.max(...Object.values(obj), 1)
  return Object.entries(obj).map(([name, count]) => ({ name, count, percent: Math.round((count / max) * 100) }))
})
const cacheText = computed(() => JSON.stringify(data.value.cache || {}, null, 2))

function go(path) {
  uni.navigateTo({ url: path })
}

async function load() {
  try {
    data.value = await request('/admin/dashboard')
  } catch (e) {
    uni.showToast({ title: '加载失败，请确认管理员登录', icon: 'none' })
  }
}

onShow(() => { if (requireAdminPage()) load() })
</script>

<style scoped>
.page{padding:28rpx;background:#f6f7fb;min-height:100vh;box-sizing:border-box}
.panel{background:#fff;border-radius:22rpx;box-shadow:0 18rpx 44rpx rgba(15,23,42,.08)}
.hero,.block{padding:30rpx;margin-bottom:22rpx}
.h1{display:block;font-size:42rpx;font-weight:900;color:#111827}
.desc{display:block;color:#667085;line-height:1.7;margin-top:12rpx}
.actions{display:flex;gap:16rpx;flex-wrap:wrap;margin-top:22rpx}
.btn,.ghost{border-radius:16rpx;font-weight:800}
.btn{background:#2563eb;color:#fff}
.ghost{background:#eef2ff;color:#1d4ed8}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:18rpx;margin:22rpx 0}
.stat{background:#2563eb;padding:28rpx;border-radius:20rpx;color:#fff}
.num{display:block;font-size:42rpx;font-weight:900}
.label{font-size:24rpx;opacity:.92}
.section{display:block;font-size:30rpx;font-weight:900;margin-bottom:18rpx}
.row{display:grid;grid-template-columns:1.8fr .7fr .7fr;gap:12rpx;padding:18rpx 0;border-bottom:1rpx solid #edf2f7;color:#344054}
.head{font-weight:900;color:#475467}
.barrow{display:grid;grid-template-columns:140rpx 1fr 70rpx;gap:16rpx;align-items:center;margin:18rpx 0}
.bar{height:18rpx;background:#e5e7eb;border-radius:999rpx;overflow:hidden}
.fill{height:100%;background:#2563eb}
.ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.empty{color:#98a2b3;padding:24rpx 0;text-align:center}
.json{display:block;white-space:pre-wrap;font-size:22rpx;color:#475467;background:#f8fafc;border-radius:16rpx;padding:18rpx}
</style>
