<template>
  <view class="metric-card" :class="tone">
    <view class="metric-glow"></view>
    <view class="metric-top">
      <view class="metric-icon">{{ icon }}</view>
      <view class="metric-trend" v-if="trend">{{ trend }}</view>
    </view>
    <view class="metric-value">{{ value }}</view>
    <view class="metric-label">{{ label }}</view>
    <view class="metric-foot" v-if="subLabel">{{ subLabel }}</view>
  </view>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '✦' },
  value: { type: [String, Number], default: 0 },
  label: { type: String, default: '' },
  subLabel: { type: String, default: '' },
  trend: { type: String, default: '' },
  tone: { type: String, default: 'blue' }
})
</script>

<style scoped>
.metric-card {
  position: relative;
  overflow: hidden;
  min-height: 164rpx;
  padding: 28rpx;
  border-radius: 32rpx;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 28rpx 70rpx rgba(18, 32, 74, 0.12);
  border: 1rpx solid rgba(255,255,255,0.76);
  backdrop-filter: blur(22rpx);
}
.metric-card::before {
  content: '';
  position: absolute;
  inset: -2rpx;
  background: linear-gradient(135deg, rgba(88,117,255,.32), rgba(111,230,255,.08), rgba(255,255,255,0));
  opacity: .72;
  z-index: 0;
}
.metric-glow {
  position:absolute;
  width: 140rpx;
  height: 140rpx;
  right: -40rpx;
  top: -40rpx;
  border-radius: 999rpx;
  filter: blur(10rpx);
  background: rgba(92,127,255,.22);
}
.metric-top, .metric-value, .metric-label, .metric-foot { position: relative; z-index: 1; }
.metric-top { display: flex; align-items: center; justify-content: space-between; }
.metric-icon {
  width: 58rpx;
  height: 58rpx;
  border-radius: 20rpx;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  font-size: 28rpx;
  background: linear-gradient(135deg, #5e7cff, #64e6ff);
  box-shadow: 0 14rpx 28rpx rgba(78, 111, 247, .28);
}
.metric-trend {
  padding: 8rpx 14rpx;
  border-radius: 999rpx;
  color: #315bff;
  font-size: 22rpx;
  background: rgba(73, 111, 255, .10);
}
.metric-value {
  margin-top: 22rpx;
  color: #141b34;
  font-size: 46rpx;
  font-weight: 900;
  letter-spacing: -1rpx;
}
.metric-label { margin-top: 8rpx; color: #52607a; font-size: 24rpx; }
.metric-foot { margin-top: 14rpx; color: #8791aa; font-size: 22rpx; }
.purple .metric-icon { background: linear-gradient(135deg, #7a5cff, #ff7ad9); }
.green .metric-icon { background: linear-gradient(135deg, #12b981, #94f7c5); }
.gold .metric-icon { background: linear-gradient(135deg, #f59e0b, #ffd36a); }
.dark .metric-icon { background: linear-gradient(135deg, #111827, #56637a); }
</style>
