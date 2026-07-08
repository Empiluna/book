<template>
  <view class="container graph-page">
    <view class="card hero-card">
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

    <view class="card graph-entry-card" v-if="nodes.length">
      <view class="between">
        <view>
          <text class="sub-title">图谱关系图</text>
          <text class="muted">{{ nodes.length }} 个节点 · {{ edges.length }} 条关系</text>
        </view>
        <text class="graph-icon">🕸️</text>
      </view>
      <view class="preview-bar">
        <text v-for="n in previewNodes" :key="n.id" class="preview-node">{{ shortLabel(n.label, 4) }}</text>
      </view>
      <button class="btn" @click="openGraphFull">打开图谱关系图</button>
    </view>

    <view class="card" v-if="nodes.length">
      <text class="sub-title">节点关系</text>
      <view class="node" v-for="n in nodes.slice(0, 18)" :key="n.id">
        <text class="node-type">{{ typeLabel(n.type) }}</text>
        <text class="node-label">{{ n.label }}</text>
      </view>
    </view>

    <view class="card" v-if="edges.length">
      <text class="sub-title">关系路径</text>
      <view class="edge" v-for="(e,idx) in edges.slice(0, 24)" :key="idx">
        <text class="muted">{{ nodeName(e.source) }} → {{ e.label || e.relation }} → {{ nodeName(e.target) }}</text>
      </view>
    </view>

    <view class="card" v-if="explainCards.length">
      <text class="sub-title">推荐路径解释</text>
      <view class="path-card" v-for="p in explainCards" :key="p.key" @click="openPathCard(p)">
        <view class="between">
          <text class="path-title">{{ p.title }}</text>
          <text class="path-badge">{{ p.badge }}</text>
        </view>
        <text class="path-text">{{ p.text }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { request } from '../../api/request.js'

export default {
  data: function () {
    return { mode: 'profile', loading: false, error: '', stats: null, graph: {}, nodes: [], edges: [], paths: [] }
  },
  computed: {
    backendName: function () {
      const b = (this.graph && this.graph.backend) || (this.stats && this.stats.backend) || ''
      return b === 'sql-fallback' ? '本地图谱' : (b || '图谱服务')
    },
    previewNodes: function () {
      return (this.nodes || []).slice(0, 8)
    },
    explainCards: function () {
      const that = this
      const seen = {}
      const out = []
      ;(this.paths || []).forEach(function (p, idx) {
        const title = that.pathTitle(p, idx)
        const text = that.pathText(p)
        const badge = that.pathBadge(p)
        const keyText = title + '|' + text
        if (!text || seen[keyText]) return
        seen[keyText] = true
        out.push({ key: 'p' + idx + '-' + keyText, title: title, text: text, badge: badge, book_id: p.book_id || p.id })
      })
      if (!out.length) {
        ;(this.edges || []).slice(0, 8).forEach(function (e, idx) {
          const text = that.nodeName(e.source) + ' → ' + (e.label || e.relation || '关联') + ' → ' + that.nodeName(e.target)
          if (seen[text]) return
          seen[text] = true
          out.push({ key: 'e' + idx, title: '图谱路径 ' + (idx + 1), text: text, badge: '关系' })
        })
      }
      return out.slice(0, 10)
    }
  },
  onLoad: function () { this.load() },
  onPullDownRefresh: function () {
    const that = this
    this.load(function () { uni.stopPullDownRefresh() })
  },
  methods: {
    load: function (done) {
      const that = this
      that.loading = true
      that.error = ''
      Promise.all([
        request('/graph/stats'),
        request('/graph/profile-graph?mode=' + that.mode + '&limit=36')
      ]).then(function (res) {
        that.stats = res[0] || null
        that.graph = res[1] || {}
        that.nodes = that.graph.nodes || []
        that.edges = that.graph.edges || []
        that.paths = that.graph.path_cards || that.graph.items || []
      }).catch(function (e) {
        that.error = e.message || '图谱加载失败'
      }).then(function () {
        that.loading = false
        if (done) done()
      })
    },
    changeMode: function (m) { this.mode = m; this.load() },
    openGraphFull: function () {
      uni.navigateTo({ url: '/pages/graph-full/graph-full?mode=' + encodeURIComponent(this.mode) })
    },
    typeLabel: function (type) {
      const map = { Profile: '画像', InterestCluster: '兴趣簇', SeedBook: '种子书', Book: '图书', Author: '作者', Tag: '标签', Field: '领域', Audience: '适读人群', Difficulty: '难度', Keyword: '关键词', Topic: '主题', Publisher: '出版社', Series: '系列' }
      return map[type] || type || '节点'
    },
    shortLabel: function (label, max) {
      label = String(label || '节点')
      max = max || 5
      return label.length > max ? label.slice(0, max) + '…' : label
    },
    nodeName: function (id) {
      const found = this.nodes.find(function (n) { return n.id === id })
      return found ? found.label : id
    },
    pathTitle: function (p, idx) {
      if (p.target) return '推荐《' + p.target + '》'
      if (p.title) return p.title
      if (p.book && p.book.title) return p.book.title
      return '推荐路径 ' + (idx + 1)
    },
    pathText: function (p) {
      if (p.path_text) return p.path_text
      if (p.reason && p.reason !== '基于知识图谱路径推荐') return p.reason
      if (p.source && p.target) return '《' + p.source + '》 → ' + (p.label || this.pathBadge(p)) + ' → 《' + p.target + '》'
      if (Array.isArray(p.paths) && p.paths.length) {
        const first = p.paths[0]
        if (first.path_text) return first.path_text
        if (first.label) return '通过「' + first.label + '」产生推荐'
      }
      return p.reason || '根据当前画像、语义节点和图书关系生成推荐。'
    },
    pathBadge: function (p) {
      const map = { same_author: '同作者', same_tag: '同标签', same_series: '同系列', same_publisher: '同出版社', similar: '相似', multi_hop: '多跳', same_field: '领域', same_audience: '人群', same_keyword: '关键词', same_difficulty: '难度', topic_bridge: '主题', next_read: '续读', prerequisite: '前置' }
      return p.label || map[p.type] || '图谱'
    },
    openPathCard: function (p) {
      if (p.book_id) uni.navigateTo({ url: '/pages/detail/detail?id=' + p.book_id })
    }
  }
}
</script>

<style scoped>
.graph-page{padding-bottom:calc(34rpx + env(safe-area-inset-bottom))}
.hero-card{background:linear-gradient(135deg,#fff,#eff6ff 55%,#f3e8ff)}
.mode-row{margin:18rpx 0}
.graph-entry-card{background:linear-gradient(135deg,#ffffff,#f8f5ff)}
.graph-icon{font-size:54rpx}
.preview-bar{display:flex;flex-wrap:wrap;gap:12rpx;margin:22rpx 0 14rpx;min-height:74rpx;align-items:center}
.preview-node{display:inline-flex;align-items:center;justify-content:center;min-width:76rpx;height:64rpx;border-radius:999rpx;background:linear-gradient(135deg,#ede9fe,#e0f2fe);color:#4c1d95;font-size:22rpx;font-weight:900;padding:0 16rpx;box-shadow:0 10rpx 24rpx rgba(124,58,237,.08)}

.node{display:flex;gap:14rpx;align-items:center;padding:14rpx 0;border-bottom:1rpx solid #eef2f7}
.node-type{font-size:22rpx;font-weight:900;color:#7c3aed;background:#ede9fe;border-radius:999rpx;padding:6rpx 12rpx}
.node-label{font-size:27rpx;color:#111827;font-weight:800;flex:1}
.edge{padding:12rpx 0;border-bottom:1rpx dashed #e5e7eb}
.path-card{padding:22rpx;border-radius:24rpx;background:linear-gradient(135deg,#f8fafc,#ffffff);margin-bottom:16rpx;border:1rpx solid #eef2f7;box-shadow:0 10rpx 28rpx rgba(15,23,42,.04)}
.path-title{display:block;flex:1;font-size:28rpx;color:#111827;font-weight:900;margin-bottom:8rpx;line-height:1.35}
.path-badge{font-size:20rpx;font-weight:900;color:#7c3aed;background:#ede9fe;border-radius:999rpx;padding:6rpx 12rpx;margin-left:10rpx}
.path-text{display:block;color:#475467;font-size:25rpx;line-height:1.7}
</style>
