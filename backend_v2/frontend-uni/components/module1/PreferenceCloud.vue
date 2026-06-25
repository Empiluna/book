<template>
  <view class="cloud-wrap">
    <view class="cloud-head">
      <text class="title">兴趣标签星云</text>
      <text class="desc">根据收藏、评分、阅读记录动态生成</text>
    </view>
    <view class="tag-field">
      <view
        v-for="(tag, index) in normalizedTags"
        :key="tag.name + index"
        class="tag-chip"
        :style="chipStyle(tag, index)"
      >
        <text class="tag-name">{{ tag.name }}</text>
        <text class="tag-score">{{ Math.round(tag.weight * 100) }}%</text>
      </view>
      <view v-if="!normalizedTags.length" class="empty">暂无画像标签，先收藏或评分几本书</view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ tags: { type: Array, default: () => [] } })
const palette = ['#5e7cff', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef5da8']
const normalizedTags = computed(() => props.tags.map((item) => ({
  name: item.name || item.tag || item[0] || '未知标签',
  weight: Number(item.weight ?? item.score ?? item[1] ?? 0.5)
})).slice(0, 18))
function chipStyle(tag, index) {
  const size = 24 + Math.min(22, tag.weight * 26)
  const color = palette[index % palette.length]
  return `font-size:${size}rpx;border-color:${color}33;background:${color}14;color:${color};box-shadow:0 18rpx 42rpx ${color}20;`
}
</script>

<style scoped>
.cloud-wrap {
  padding: 30rpx;
  border-radius: 36rpx;
  background: linear-gradient(145deg, rgba(255,255,255,.86), rgba(241,245,255,.74));
  border: 1rpx solid rgba(255,255,255,.85);
  box-shadow: 0 26rpx 80rpx rgba(20, 34, 75, .10);
}
.cloud-head { display: flex; flex-direction: column; gap: 8rpx; }
.title { font-size: 32rpx; font-weight: 900; color: #141b34; }
.desc { color: #75819c; font-size: 22rpx; }
.tag-field { display: flex; flex-wrap: wrap; gap: 18rpx; margin-top: 28rpx; min-height: 168rpx; align-items: center; }
.tag-chip {
  display:flex;
  gap: 10rpx;
  align-items:center;
  padding: 16rpx 20rpx;
  border: 1rpx solid;
  border-radius: 999rpx;
  font-weight: 800;
}
.tag-score { opacity: .65; font-size: 20rpx; }
.empty { color:#8a94aa; font-size: 24rpx; }
</style>
