<template>
  <view class="radar-card">
    <view class="radar-header">
      <view>
        <view class="title">阅读画像雷达</view>
        <view class="desc">偏好、活跃、完成度、互动、探索五维评分</view>
      </view>
      <view class="score-pill">{{ overallScore }} / 100</view>
    </view>
    <view class="radar-box">
      <view class="grid grid-1"></view>
      <view class="grid grid-2"></view>
      <view class="grid grid-3"></view>
      <view class="grid grid-4"></view>
      <view class="axis a1"></view>
      <view class="axis a2"></view>
      <view class="axis a3"></view>
      <view class="axis a4"></view>
      <view class="axis a5"></view>
      <view
        v-for="(p, index) in points"
        :key="index"
        class="radar-point"
        :style="`left:${p.x}%;top:${p.y}%`"
      ></view>
      <view class="center-core"></view>
      <view class="label l1">偏好</view>
      <view class="label l2">活跃</view>
      <view class="label l3">完成</view>
      <view class="label l4">互动</view>
      <view class="label l5">探索</view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ metrics: { type: Object, default: () => ({}) } })
const vals = computed(() => [
  props.metrics.preference || 68,
  props.metrics.active || 72,
  props.metrics.completion || 54,
  props.metrics.interaction || 60,
  props.metrics.exploration || 76
].map(v => Math.max(0, Math.min(100, Number(v)))))
const overallScore = computed(() => Math.round(vals.value.reduce((a,b)=>a+b,0) / vals.value.length))
const points = computed(() => {
  const angles = [-90, -18, 54, 126, 198]
  return vals.value.map((v, i) => {
    const r = v * 0.36
    const rad = angles[i] * Math.PI / 180
    return { x: 50 + Math.cos(rad) * r, y: 50 + Math.sin(rad) * r }
  })
})
</script>

<style scoped>
.radar-card {
  padding: 30rpx;
  border-radius: 36rpx;
  background: linear-gradient(145deg, rgba(21, 30, 54, .96), rgba(50, 63, 116, .92));
  color: #fff;
  box-shadow: 0 30rpx 90rpx rgba(19, 25, 55, .28);
  overflow:hidden;
}
.radar-header { display:flex; justify-content:space-between; align-items:flex-start; gap: 18rpx; }
.title { font-size:32rpx; font-weight:900; }
.desc { margin-top:8rpx; color: rgba(255,255,255,.62); font-size:22rpx; }
.score-pill { padding: 12rpx 18rpx; border-radius:999rpx; color:#18203a; background:linear-gradient(135deg,#a7f3ff,#fff1a6); font-weight:900; }
.radar-box { position:relative; margin: 42rpx auto 10rpx; width: 470rpx; height: 470rpx; }
.grid { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%) rotate(18deg); border:1rpx solid rgba(255,255,255,.16); clip-path: polygon(50% 0, 98% 35%, 80% 92%, 20% 92%, 2% 35%); }
.grid-1 { width: 400rpx; height:400rpx; }
.grid-2 { width: 300rpx; height:300rpx; }
.grid-3 { width: 200rpx; height:200rpx; }
.grid-4 { width: 100rpx; height:100rpx; }
.axis { position:absolute; left:50%; top:50%; width:1rpx; height:200rpx; transform-origin: top; background: linear-gradient(rgba(255,255,255,.25), transparent); }
.a1{ transform:rotate(0deg); }.a2{ transform:rotate(72deg); }.a3{ transform:rotate(144deg); }.a4{ transform:rotate(216deg); }.a5{ transform:rotate(288deg); }
.radar-point { position:absolute; width:28rpx; height:28rpx; margin-left:-14rpx; margin-top:-14rpx; border-radius:50%; background:#7df3ff; box-shadow:0 0 32rpx #7df3ff; }
.center-core { position:absolute; left:50%; top:50%; width:50rpx; height:50rpx; margin:-25rpx; border-radius:50%; background:linear-gradient(135deg,#8b5cf6,#64e6ff); box-shadow:0 0 60rpx rgba(100,230,255,.8); }
.label { position:absolute; font-size:22rpx; color:rgba(255,255,255,.72); }
.l1{left:214rpx;top:0}.l2{right:12rpx;top:150rpx}.l3{right:80rpx;bottom:16rpx}.l4{left:70rpx;bottom:16rpx}.l5{left:10rpx;top:150rpx}
</style>
