<template>
  <view class="page">
    <view class="header">
      <view class="back" @click="uni.navigateBack()">‹</view>
      <view>
        <view class="title">阅读进度矩阵</view>
        <view class="sub">集中查看每本书的页码、百分比和继续阅读状态</view>
      </view>
    </view>
    <view class="summary">
      <view><text>{{ list.length }}</text><text>本在读记录</text></view>
      <view><text>{{ avgProgress }}%</text><text>平均进度</text></view>
      <view><text>{{ almostDone }}</text><text>接近读完</text></view>
    </view>
    <view class="list">
      <view v-for="item in list" :key="item.id || item.book_id" class="row">
        <view class="cover">{{ (item.book_title || item.title || '书').slice(0,1) }}</view>
        <view class="main">
          <view class="row-head">
            <text>{{ item.book_title || item.title || `图书 #${item.book_id}` }}</text>
            <text>{{ item.progress_percent || 0 }}%</text>
          </view>
          <view class="bar"><view :style="`width:${item.progress_percent || 0}%`"></view></view>
          <view class="meta">当前第 {{ item.current_page || 0 }} 页 · 更新时间 {{ formatTime(item.updated_at) }}</view>
        </view>
      </view>
      <view v-if="!list.length" class="empty">暂无阅读进度，可先在图书详情页点击试读并保存进度。</view>
    </view>
  </view>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import module1Api from '../../api/module1.js'
const list = ref([])
const avgProgress = computed(() => list.value.length ? Math.round(list.value.reduce((s,i)=>s + Number(i.progress_percent || 0), 0) / list.value.length) : 0)
const almostDone = computed(() => list.value.filter(i => Number(i.progress_percent || 0) >= 80).length)
async function load() {
  try {
    const res = await module1Api.progress()
    list.value = Array.isArray(res) ? res : (res.items || [])
  } catch(e) { list.value = [] }
}
function formatTime(t) { return t ? String(t).slice(0, 10) : '—' }
onMounted(load)
</script>

<style scoped>
.page { min-height:100vh; padding:38rpx 26rpx 60rpx; background:linear-gradient(180deg,#eef4ff,#fff); }
.header { display:flex; align-items:center; gap:20rpx; }
.back { width:68rpx;height:68rpx;border-radius:24rpx;background:#fff;display:flex;align-items:center;justify-content:center;font-size:56rpx;color:#141b34;box-shadow:0 16rpx 45rpx rgba(20,30,60,.10); }
.title { color:#141b34; font-size:38rpx; font-weight:900; }.sub{margin-top:6rpx;color:#7a859d;font-size:22rpx;}
.summary { margin-top:30rpx; display:grid; grid-template-columns:repeat(3,1fr); gap:18rpx; }
.summary view { min-height:140rpx; border-radius:32rpx; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(145deg,#fff, #f3f6ff); box-shadow:0 20rpx 62rpx rgba(31,47,90,.10); }
.summary text:first-child { color:#536dfe; font-size:40rpx; font-weight:900; }.summary text:last-child{margin-top:8rpx;color:#7a859d;font-size:21rpx;}
.list { margin-top:28rpx; display:flex; flex-direction:column; gap:20rpx; }
.row { display:flex; gap:18rpx; padding:22rpx; border-radius:34rpx; background:rgba(255,255,255,.9); box-shadow:0 20rpx 60rpx rgba(31,47,90,.09); border:1rpx solid rgba(255,255,255,.92); }
.cover { width:90rpx; height:124rpx; border-radius:22rpx; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:900; background:linear-gradient(135deg,#141b34,#536dfe); }
.main { flex:1; }.row-head{display:flex;justify-content:space-between;gap:20rpx;color:#141b34;font-size:27rpx;font-weight:900;}
.bar { margin-top:18rpx; height:14rpx; border-radius:999rpx; background:#e5ebff; overflow:hidden; }.bar view{height:100%;border-radius:999rpx;background:linear-gradient(90deg,#536dfe,#64e6ff);}
.meta { margin-top:12rpx; color:#7a859d; font-size:22rpx; }.empty{color:#8490aa;font-size:24rpx;padding:40rpx 12rpx;}
</style>
