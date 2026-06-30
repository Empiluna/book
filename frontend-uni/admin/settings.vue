<template>
  <view class="page">
    <view class="glass block"><text class="h1">系统设置</text><text class="desc">推荐权重、系统配置、ItemCF预计算与运行开关。</text><button class="btn" @click="load">加载配置</button></view>
    <view class="glass block"><text class="section">推荐权重</text><view class="two"><input class="input" v-model="weights.kg" placeholder="KG"/><input class="input" v-model="weights.cf" placeholder="CF"/></view><view class="two"><input class="input" v-model="weights.hot" placeholder="Hot"/><input class="input" v-model="weights.new" placeholder="New"/></view><view class="toolbar"><button class="btn" @click="saveWeights">保存权重</button><button class="ghost" @click="precompute">预计算ItemCF</button></view></view>
    <view class="glass block"><text class="section">配置项</text><view class="row head"><text>Key</text><text>Value</text><text>操作</text></view><view class="row" v-for="c in configs" :key="c.key"><text>{{c.key}}</text><input class="smallinput" v-model="c.value"/><button class="mini" @click="saveConfig(c)">保存</button></view></view>
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../api/request'
const configs=ref([]); const weights=ref({kg:'0.4',cf:'0.4',hot:'0.1',new:'0.1'})
async function load(){ const c=await request('/admin/configs'); configs.value=c.items||[]; try{ const w=await request('/recommend/admin/weights'); weights.value={kg:String(w.kg),cf:String(w.cf),hot:String(w.hot),new:String(w.new)} }catch(e){} }
async function saveWeights(){ await request('/recommend/admin/weights',{method:'PUT',data:{kg:Number(weights.value.kg),cf:Number(weights.value.cf),hot:Number(weights.value.hot),new:Number(weights.value.new)}}); uni.showToast({title:'权重已保存'}) }
async function precompute(){ const r=await request('/recommend/admin/precompute-itemcf',{method:'POST'}); uni.showToast({title:r.message||'已预计算'}) }
async function saveConfig(c){ await request('/admin/configs',{method:'PUT',data:{key:c.key,value:String(c.value),description:c.description||''}}); uni.showToast({title:'已保存'}) }
onMounted(load)
</script>
<style scoped>.page{padding:28rpx;background:#f6f7fb;min-height:100vh}.glass{background:#fff;border-radius:30rpx;box-shadow:0 22rpx 60rpx rgba(15,23,42,.08)}.block{padding:30rpx;margin-bottom:22rpx}.h1{font-size:44rpx;font-weight:900}.desc{display:block;color:#667085;font-size:24rpx;margin-top:8rpx}.section{font-size:32rpx;font-weight:900}.btn,.ghost,.mini{font-weight:800;border-radius:18rpx}.btn{background:#4f46e5;color:#fff}.ghost{background:#eef2ff;color:#3730a3}.toolbar{display:flex;gap:12rpx;flex-wrap:wrap;margin-top:18rpx}.two{display:grid;grid-template-columns:1fr 1fr;gap:14rpx;margin:14rpx 0}.input,.smallinput{background:#f8fafc;border-radius:18rpx;padding:18rpx}.row{display:grid;grid-template-columns:1.4fr 1fr 120rpx;gap:12rpx;align-items:center;padding:16rpx 0;border-bottom:1rpx solid #eef2f7}.head{font-weight:900;color:#475467}.mini{font-size:24rpx;background:#f1f5f9;color:#334155}</style>
