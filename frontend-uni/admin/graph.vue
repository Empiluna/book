<template>
  <view class="page">
    <view class="panel block">
      <text class="h1">知识图谱管理</text>
      <text class="desc">初始化约束、同步 MySQL 数据、创建关系并执行 Cypher 查询。</text>
      <view class="toolbar">
        <button class="btn" @click="load">刷新统计</button>
        <button class="ghost" @click="initGraph">初始化约束</button>
        <button class="ghost" @click="syncGraph">同步 MySQL</button>
      </view>
    </view>

    <view class="grid">
      <view class="stat" v-for="s in statsList" :key="s.label">
        <text class="num">{{ s.value }}</text>
        <text>{{ s.label }}</text>
      </view>
    </view>

    <view class="panel block">
      <text class="section">创建图书关系</text>
      <view class="two">
        <input class="input" v-model="rel.source_id" type="number" placeholder="源图书 ID" />
        <input class="input" v-model="rel.target_id" type="number" placeholder="目标图书 ID" />
      </view>
      <view class="two">
        <input class="input" v-model="rel.relation_type" placeholder="关系类型，如 SIMILAR_TO" />
        <input class="input" v-model="rel.weight" type="digit" placeholder="权重" />
      </view>
      <button class="btn" @click="createRelation">创建关系</button>
    </view>

    <view class="panel block">
      <text class="section">Cypher 控制台</text>
      <textarea class="textarea" v-model="cypher" placeholder="MATCH (n) RETURN n LIMIT 10"></textarea>
      <button class="btn run" @click="runCypher">执行</button>
      <scroll-view scroll-y class="result"><text>{{ result }}</text></scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { request } from '../api/request'
import { requireAdminPage } from '../utils/admin'

const stats = ref({})
const cypher = ref('MATCH (n) RETURN n LIMIT 10')
const result = ref('')
const rel = ref({ source_id: '1', target_id: '2', relation_type: 'SIMILAR_TO', weight: '0.7' })

const statsList = computed(() => [
  { label: '节点数', value: stats.value.nodes || stats.value.node_count || 0 },
  { label: '关系数', value: stats.value.relations || stats.value.relationship_count || 0 },
  { label: '后端', value: stats.value.backend || '-' },
  { label: '状态', value: stats.value.message || '就绪' }
])

function showResult(value) {
  result.value = JSON.stringify(value, null, 2)
}

async function load() {
  try {
    stats.value = await request('/graph/stats')
  } catch (e) {
    uni.showToast({ title: '加载图谱统计失败', icon: 'none' })
  }
}

async function initGraph() {
  try {
    showResult(await request('/graph/admin/init', { method: 'POST' }))
    load()
  } catch (e) {
    uni.showToast({ title: '初始化失败', icon: 'none' })
  }
}

async function syncGraph() {
  try {
    showResult(await request('/graph/admin/sync', { method: 'POST' }))
    load()
  } catch (e) {
    uni.showToast({ title: '同步失败', icon: 'none' })
  }
}

async function runCypher() {
  try {
    showResult(await request('/graph/admin/cypher', { method: 'POST', data: { cypher: cypher.value, params: {} } }))
  } catch (e) {
    uni.showToast({ title: '执行失败', icon: 'none' })
  }
}

async function createRelation() {
  const data = {
    source_type: 'Book',
    source_id: Number(rel.value.source_id),
    relation_type: rel.value.relation_type,
    target_type: 'Book',
    target_id: Number(rel.value.target_id),
    weight: Number(rel.value.weight || 1)
  }
  if (!data.source_id || !data.target_id || !data.relation_type || Number.isNaN(data.weight)) {
    uni.showToast({ title: '请填写有效关系数据', icon: 'none' })
    return
  }
  try {
    showResult(await request('/graph/admin/relations', { method: 'POST', data }))
    load()
  } catch (e) {
    uni.showToast({ title: '创建关系失败', icon: 'none' })
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
.toolbar{display:flex;gap:12rpx;flex-wrap:wrap;margin-top:18rpx}
.btn,.ghost{font-weight:800;border-radius:16rpx}
.btn{background:#2563eb;color:white}
.ghost{background:#eef2ff;color:#1d4ed8}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:18rpx;margin-bottom:22rpx}
.stat{background:#2563eb;border-radius:20rpx;color:white;padding:26rpx}
.num{display:block;font-size:38rpx;font-weight:900}
.section{display:block;font-weight:900;font-size:30rpx;margin-bottom:16rpx}
.two{display:grid;grid-template-columns:1fr 1fr;gap:14rpx;margin:14rpx 0}
.input,.textarea{background:#f8fafc;border-radius:16rpx;padding:18rpx;box-sizing:border-box}
.textarea{width:100%;min-height:160rpx}
.run{margin-top:16rpx}
.result{height:260rpx;background:#0f172a;color:#e2e8f0;border-radius:18rpx;padding:18rpx;margin-top:18rpx;font-size:22rpx;white-space:pre-wrap;box-sizing:border-box}
</style>
