<template>
  <view class="page">
    <view class="hero glass">
      <text class="h1">管理后台</text>
      <text class="desc">运营核心指标、热门排行、类别分布与服务状态总览。</text>
      <view class="actions"><button class="btn" @click="load">刷新数据</button><button class="ghost" @click="go('/admin/books')">图书管理</button><button class="ghost" @click="go('/admin/graph')">图谱管理</button></view>
    </view>
    <view class="grid">
      <view class="stat" v-for="c in cardList" :key="c.label"><text class="num">{{ c.value }}</text><text class="label">{{ c.label }}</text></view>
    </view>
    <view class="glass block">
      <text class="section">热门图书 TOP</text>
      <view class="row head"><text>书名</text><text>评分</text><text>热度</text></view>
      <view class="row" v-for="b in hotBooks" :key="b.id"><text>{{ b.title }}</text><text>{{ b.avg_rating }}</text><text>{{ b.hot_score }}</text></view>
    </view>
    <view class="glass block">
      <text class="section">类别分布</text>
      <view class="barrow" v-for="it in categories" :key="it.name"><text>{{ it.name }}</text><view class="bar"><view class="fill" :style="{width: it.percent + '%'}"></view></view><text>{{ it.count }}</text></view>
    </view>
  </view>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { request } from '../api/request'
const data = ref({ cards: {}, hot_books: [], category_distribution: {} })
const cardList = computed(() => [
  { label: '图书总数', value: data.value.cards?.books || 0 },
  { label: '注册用户', value: data.value.cards?.users || 0 },
  { label: '评论总数', value: data.value.cards?.comments || 0 },
  { label: '购书跳转', value: data.value.cards?.purchase_clicks || 0 }
])
const hotBooks = computed(() => data.value.hot_books || [])
const categories = computed(() => { const obj = data.value.category_distribution || {}; const max = Math.max(...Object.values(obj), 1); return Object.entries(obj).map(([name,count]) => ({ name, count, percent: Math.round(count/max*100) })) })
function go(path){ uni.navigateTo({ url: path }) }
async function load(){ try { data.value = await request('/admin/dashboard') } catch(e){ uni.showToast({ title:'加载失败', icon:'none' }) } }
onMounted(load)
</script>
<style scoped>
.page{padding:28rpx;background:#f6f7fb;min-height:100vh}.glass{background:rgba(255,255,255,.88);border:1rpx solid rgba(148,163,184,.25);box-shadow:0 22rpx 60rpx rgba(15,23,42,.08);border-radius:30rpx}.hero{padding:34rpx}.h1{display:block;font-size:46rpx;font-weight:900;color:#111827}.desc{display:block;color:#667085;line-height:1.8;margin-top:12rpx}.actions{display:flex;gap:16rpx;flex-wrap:wrap;margin-top:22rpx}.btn,.ghost{border-radius:20rpx;font-weight:800}.btn{background:#4f46e5;color:#fff}.ghost{background:#eef2ff;color:#3730a3}.grid{display:grid;grid-template-columns:1fr 1fr;gap:18rpx;margin:22rpx 0}.stat{background:linear-gradient(135deg,#4f46e5,#06b6d4);padding:30rpx;border-radius:28rpx;color:#fff}.num{display:block;font-size:44rpx;font-weight:900}.label{font-size:24rpx;opacity:.9}.block{padding:28rpx;margin-top:22rpx}.section{display:block;font-size:32rpx;font-weight:900;margin-bottom:18rpx}.row{display:grid;grid-template-columns:1.8fr .7fr .7fr;gap:12rpx;padding:18rpx 0;border-bottom:1rpx solid #edf2f7;color:#344054}.head{font-weight:900;color:#475467}.barrow{display:grid;grid-template-columns:120rpx 1fr 70rpx;gap:16rpx;align-items:center;margin:18rpx 0}.bar{height:18rpx;background:#e5e7eb;border-radius:999rpx;overflow:hidden}.fill{height:100%;background:linear-gradient(90deg,#7c3aed,#06b6d4)}
</style>
