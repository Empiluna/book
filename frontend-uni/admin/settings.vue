<template>
  <view class="page">
    <view class="panel block">
      <text class="h1">系统设置</text>
      <text class="desc">维护推荐权重、ItemCF 预计算和系统配置项。</text>
      <button class="btn topbtn" @click="load">加载配置</button>
    </view>

    <view class="panel block">
      <text class="section">推荐权重</text>
      <view class="two">
        <input class="input" v-model="weights.kg" type="digit" placeholder="KG" />
        <input class="input" v-model="weights.cf" type="digit" placeholder="CF" />
      </view>
      <view class="two">
        <input class="input" v-model="weights.hot" type="digit" placeholder="Hot" />
        <input class="input" v-model="weights.new" type="digit" placeholder="New" />
      </view>
      <view class="toolbar">
        <button class="btn" @click="saveWeights">保存权重</button>
        <button class="ghost" @click="precompute">预计算 ItemCF</button>
      </view>
    </view>

    <view class="panel block">
      <text class="section">配置项</text>
      <view class="row head"><text>Key</text><text>Value</text><text>操作</text></view>
      <view class="row" v-for="c in configs" :key="c.key">
        <text class="key">{{ c.key }}</text>
        <input class="smallinput" v-model="c.value" />
        <button class="mini" @click="saveConfig(c)">保存</button>
      </view>
      <view class="empty" v-if="!configs.length">暂无配置项</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { request } from '../api/request'
import { requireAdminPage } from '../utils/admin'

const configs = ref([])
const weights = ref({ kg: '0.4', cf: '0.4', hot: '0.1', new: '0.1' })

async function load() {
  try {
    const c = await request('/admin/configs')
    configs.value = c.items || []
  } catch (e) {
    uni.showToast({ title: '加载配置失败', icon: 'none' })
  }
  try {
    const w = await request('/recommend/admin/weights')
    weights.value = { kg: String(w.kg), cf: String(w.cf), hot: String(w.hot), new: String(w.new) }
  } catch (e) {
    // 权重接口不可用时保留默认值。
  }
}

async function saveWeights() {
  const data = {
    kg: Number(weights.value.kg),
    cf: Number(weights.value.cf),
    hot: Number(weights.value.hot),
    new: Number(weights.value.new)
  }
  if (Object.values(data).some((v) => Number.isNaN(v))) {
    uni.showToast({ title: '权重必须是数字', icon: 'none' })
    return
  }
  try {
    await request('/recommend/admin/weights', { method: 'PUT', data })
    uni.showToast({ title: '权重已保存' })
  } catch (e) {
    uni.showToast({ title: '保存权重失败', icon: 'none' })
  }
}

async function precompute() {
  try {
    const r = await request('/recommend/admin/precompute-itemcf', { method: 'POST' })
    uni.showToast({ title: r.message || '已预计算' })
  } catch (e) {
    uni.showToast({ title: '预计算失败', icon: 'none' })
  }
}

async function saveConfig(c) {
  try {
    await request('/admin/configs', { method: 'PUT', data: { key: c.key, value: String(c.value), description: c.description || '' } })
    uni.showToast({ title: '已保存' })
  } catch (e) {
    uni.showToast({ title: '保存失败', icon: 'none' })
  }
}

onShow(() => { if (requireAdminPage()) load() })
</script>

<style scoped>
.page{padding:28rpx;background:#f6f7fb;min-height:100vh;box-sizing:border-box}
.panel{background:#fff;border-radius:22rpx;box-shadow:0 18rpx 44rpx rgba(15,23,42,.08)}
.block{padding:30rpx;margin-bottom:22rpx}
.h1{font-size:42rpx;font-weight:900;color:#111827}
.desc{display:block;color:#667085;font-size:24rpx;margin-top:8rpx}
.section{display:block;font-size:30rpx;font-weight:900;margin-bottom:16rpx}
.btn,.ghost,.mini{font-weight:800;border-radius:16rpx}
.btn{background:#2563eb;color:#fff}
.ghost{background:#eef2ff;color:#1d4ed8}
.topbtn{margin-top:18rpx}
.toolbar{display:flex;gap:12rpx;flex-wrap:wrap;margin-top:18rpx}
.two{display:grid;grid-template-columns:1fr 1fr;gap:14rpx;margin:14rpx 0}
.input,.smallinput{background:#f8fafc;border-radius:16rpx;padding:18rpx;box-sizing:border-box}
.row{display:grid;grid-template-columns:1.35fr 1fr 120rpx;gap:12rpx;align-items:center;padding:16rpx 0;border-bottom:1rpx solid #eef2f7}
.head{font-weight:900;color:#475467}
.key{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mini{font-size:24rpx;background:#f1f5f9;color:#334155}
.empty{color:#98a2b3;text-align:center;padding:28rpx}
</style>
