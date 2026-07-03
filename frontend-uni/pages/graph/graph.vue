<template>
  <view class="container">
    <view class="card">
      <text class="title">知识图谱</text>
      <text class="muted">展示画像中心、兴趣簇、种子书、语义节点和推荐路径。</text>
      <view class="mode-row">
        <text :class="mode==='profile'?'chip active':'chip'" @click="changeMode('profile')">画像</text>
        <text :class="mode==='recent'?'chip active':'chip'" @click="changeMode('recent')">最近阅读</text>
        <text :class="mode==='high_rated'?'chip active':'chip'" @click="changeMode('high_rated')">高分图书</text>
      </view>
      <button class="btn" @click="load">刷新图谱</button>
    </view>

    <view class="card" v-if="stats">
      <text class="sub-title">图谱摘要</text>
      <view class="stat-grid">
        <view class="stat-item"><text class="stat-num">{{ stats.books || 0 }}</text><text class="muted">图书</text></view>
        <view class="stat-item"><text class="stat-num">{{ stats.semantic_nodes || 0 }}</text><text class="muted">语义节点</text></view>
        <view class="stat-item"><text class="stat-num">{{ stats.relations || 0 }}</text><text class="muted">关系</text></view>
      </view>
      <text class="muted">当前来源：{{ backendName }}</text>
    </view>

    <view v-if="error" class="card"><text class="muted">{{ error }}</text></view>
    <view v-if="loading" class="card"><text class="muted">正在生成图谱...</text></view>

    <view class="card" v-if="nodes.length">
      <text class="sub-title">节点关系</text>
      <view class="node" v-for="n in nodes" :key="n.id">
        <text class="node-type">{{ typeLabel(n.type) }}</text>
        <text class="node-label">{{ n.label }}</text>
      </view>
    </view>

    <view class="card" v-if="edges.length">
      <text class="sub-title">关系路径</text>
      <view class="edge" v-for="(e,idx) in edges.slice(0, 30)" :key="idx">
        <text class="muted">{{ nodeName(e.source) }} → {{ e.label || e.relation }} → {{ nodeName(e.target) }}</text>
      </view>
    </view>

    <view class="card" v-if="paths.length">
      <text class="sub-title">推荐路径解释</text>
      <view class="path" v-for="p in paths" :key="p.book_id || p.id" @click="goDetail(p)">
        <text class="path-title">{{ p.title }}</text>
        <text class="muted">{{ p.reason || '基于知识图谱路径推荐' }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { request } from '../../api/request.js'
export default {
  data: function () { return { mode: 'profile', loading: false, error: '', stats: null, graph: {}, nodes: [], edges: [], paths: [] } },
  computed: { backendName: function () { const b = (this.graph && this.graph.backend) || (this.stats && this.stats.backend) || ''; return b === 'sql-fallback' ? '本地图谱' : (b || '图谱服务') } },
  onLoad: function () { this.load() },
  onPullDownRefresh: function () { const that = this; this.load(function () { uni.stopPullDownRefresh() }) },
  methods: {
    load: function (done) {
      const that = this
      that.loading = true; that.error = ''
      Promise.all([request('/graph/stats'), request('/graph/profile-graph?mode=' + that.mode + '&limit=30')]).then(function (res) {
        that.stats = res[0] || null
        that.graph = res[1] || {}
        that.nodes = that.graph.nodes || []
        that.edges = that.graph.edges || []
        that.paths = that.graph.path_cards || that.graph.items || []
      }).catch(function (e) { that.error = e.message || '图谱加载失败' }).then(function () { that.loading = false; if (done) done() })
    },
    changeMode: function (m) { this.mode = m; this.load() },
    typeLabel: function (type) {
      const map = { Profile: '画像', InterestCluster: '兴趣簇', SeedBook: '种子书', Book: '图书', Author: '作者', Tag: '标签', Field: '领域', Audience: '适读人群', Difficulty: '难度', Keyword: '关键词', Topic: '主题', Publisher: '出版社' }
      return map[type] || type || '节点'
    },
    nodeName: function (id) { const found = this.nodes.find(function (n) { return n.id === id }); return found ? found.label : id },
    goDetail: function (p) { const id = p.book_id || p.id; if (id) uni.navigateTo({ url: '/pages/detail/detail?id=' + id }) }
  }
}
</script>

<style scoped>
.mode-row{margin:18rpx 0}.node{display:flex;gap:14rpx;align-items:center;padding:14rpx 0;border-bottom:1rpx solid #eef2f7}.node-type{font-size:22rpx;font-weight:900;color:#7c3aed;background:#ede9fe;border-radius:999rpx;padding:6rpx 12rpx}.node-label{font-size:27rpx;color:#111827;font-weight:800;flex:1}.edge{padding:12rpx 0;border-bottom:1rpx dashed #e5e7eb}.path{padding:18rpx;border-radius:20rpx;background:#f8fafc;margin-bottom:14rpx}.path-title{display:block;font-size:28rpx;color:#111827;font-weight:900;margin-bottom:8rpx}
</style>
