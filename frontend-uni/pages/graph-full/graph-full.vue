<template>
  <view class="container full-page">
    <view class="card top-card">
      <view class="between">
        <view>
          <text class="title">图谱关系图</text>
          <text class="muted">{{ modeLabel }} · {{ visualNodes.length }} 个节点 · {{ visualEdges.length }} 条关系</text>
        </view>
        <button class="btn small secondary" @click="load">刷新</button>
      </view>
      <view class="mode-row">
        <text :class="mode==='profile'?'chip active':'chip'" @click="changeMode('profile')">画像</text>
        <text :class="mode==='recent'?'chip active':'chip'" @click="changeMode('recent')">最近阅读</text>
        <text :class="mode==='high_rated'?'chip active':'chip'" @click="changeMode('high_rated')">高分图书</text>
      </view>
    </view>

    <view v-if="error" class="card"><text class="muted">{{ error }}</text></view>
    <view v-if="loading" class="card"><text class="muted">正在生成图谱关系图...</text></view>

    <view class="graph-card" v-if="visualNodes.length">
      <view class="graph-stage">
        <text class="layer-title top">画像中心</text>
        <text class="layer-title middle">兴趣 / 语义节点</text>
        <text class="layer-title bottom">推荐图书</text>

        <view v-for="(e,idx) in visualEdges" :key="'e'+idx" class="graph-line" :style="e.style"></view>

        <view v-for="n in visualNodes" :key="n.id" :class="'graph-node ' + n.className" :style="n.style" @click="tapNode(n)">
          <text class="node-main">{{ n.shortLabel }}</text>
          <text class="node-sub">{{ n.typeLabel }}</text>
        </view>
      </view>
    </view>

    <view class="card legend-card" v-if="visualNodes.length">
      <text class="sub-title">图例</text>
      <view class="legend-row">
        <text class="dot center"></text><text class="muted">画像中心</text>
        <text class="dot semantic"></text><text class="muted">兴趣 / 语义节点</text>
        <text class="dot book"></text><text class="muted">图书节点</text>
      </view>
    </view>
  </view>
</template>

<script>
import { request } from '../../api/request.js'

const STAGE_W = 650

export default {
  data: function () {
    return { mode: 'profile', loading: false, error: '', graph: {}, nodes: [], edges: [] }
  },
  computed: {
    modeLabel: function () {
      const map = { profile: '我的阅读画像', recent: '最近阅读', high_rated: '高分图书' }
      return map[this.mode] || '知识图谱'
    },
    visualNodes: function () {
      const source = (this.nodes || []).slice(0, 26)
      if (!source.length) return []

      const centerId = (this.graph && this.graph.center) || ''
      const centerNode = source.find(function (n) { return n.id === centerId || n.type === 'Profile' }) || source[0]
      const rest = source.filter(function (n) { return n.id !== centerNode.id })

      const semanticTypes = { InterestCluster: true, Tag: true, Field: true, Audience: true, Difficulty: true, Keyword: true, Topic: true }
      const bookTypes = { Book: true, SeedBook: true }

      const semantic = rest.filter(function (n) { return semanticTypes[n.type] }).slice(0, 8)
      const books = rest.filter(function (n) { return bookTypes[n.type] }).slice(0, 10)
      const others = rest.filter(function (n) { return !semanticTypes[n.type] && !bookTypes[n.type] }).slice(0, 4)

      const arranged = []
      arranged.push(this.buildVisualNode(centerNode, 325, 170, 124, 'center'))

      this.placeRow(semantic.slice(0, 4), 470, 92, 'semantic', arranged)
      this.placeRow(semantic.slice(4, 8), 610, 88, 'semantic', arranged)
      this.placeRow(others, 735, 80, 'other', arranged)
      this.placeRow(books.slice(0, 5), 1010, 94, 'book', arranged)
      this.placeRow(books.slice(5, 10), 1170, 94, 'book', arranged)

      return arranged
    },
    visualNodeMap: function () {
      const map = {}
      this.visualNodes.forEach(function (n) { map[n.id] = n })
      return map
    },
    visualEdges: function () {
      const map = this.visualNodeMap
      const lines = []
      const used = {}
      ;(this.edges || []).forEach(function (e) {
        const a = map[e.source]
        const b = map[e.target]
        if (!a || !b) return

        const sig = e.source + '|' + e.target
        if (used[sig]) return
        used[sig] = true

        const dx = b.cx - a.cx
        const dy = b.cy - a.cy
        const len = Math.sqrt(dx * dx + dy * dy)
        if (!len) return
        const deg = Math.atan2(dy, dx) * 180 / Math.PI
        lines.push({
          style: 'left:' + a.cx + 'rpx;top:' + a.cy + 'rpx;width:' + Math.max(40, Math.round(len)) + 'rpx;transform:rotate(' + deg + 'deg);'
        })
      })
      return lines.slice(0, 34)
    }
  },
  onLoad: function (query) {
    this.mode = (query && query.mode) || 'profile'
    this.load()
  },
  onPullDownRefresh: function () {
    const that = this
    this.load(function () { uni.stopPullDownRefresh() })
  },
  methods: {
    load: function (done) {
      const that = this
      that.loading = true
      that.error = ''
      request('/graph/profile-graph?mode=' + that.mode + '&limit=42').then(function (res) {
        that.graph = res || {}
        that.nodes = that.graph.nodes || []
        that.edges = that.graph.edges || []
      }).catch(function (e) {
        that.error = e.message || '图谱加载失败'
      }).then(function () {
        that.loading = false
        if (done) done()
      })
    },
    changeMode: function (m) { this.mode = m; this.load() },
    placeRow: function (list, y, size, cls, arranged) {
      const count = list.length
      if (!count) return
      const gap = STAGE_W / (count + 1)
      list.forEach((n, idx) => {
        arranged.push(this.buildVisualNode(n, Math.round(gap * (idx + 1)), y, size, cls))
      })
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
    buildVisualNode: function (n, x, y, size, cls) {
      const isBook = n.type === 'Book' || n.type === 'SeedBook'
      return {
        id: n.id,
        label: n.label || '节点',
        shortLabel: this.shortLabel(n.label, cls === 'center' ? 6 : 5),
        type: n.type,
        typeLabel: this.typeLabel(n.type),
        book_id: n.book_id || (isBook ? String(n.id).split(':').pop() : null),
        cx: Math.round(x),
        cy: Math.round(y),
        size: size,
        className: cls,
        style: 'left:' + Math.round(x - size / 2) + 'rpx;top:' + Math.round(y - size / 2) + 'rpx;width:' + size + 'rpx;height:' + size + 'rpx;'
      }
    },
    tapNode: function (n) {
      if (n.book_id) uni.navigateTo({ url: '/pages/detail/detail?id=' + n.book_id })
      else uni.showToast({ title: n.label, icon: 'none' })
    }
  }
}
</script>

<style scoped>
.full-page{padding-bottom:calc(34rpx + env(safe-area-inset-bottom))}
.top-card{background:linear-gradient(135deg,#fff,#eff6ff 55%,#f3e8ff)}
.mode-row{margin-top:18rpx}
.graph-card{background:#fff;border-radius:34rpx;padding:20rpx;margin-bottom:22rpx;box-shadow:0 18rpx 44rpx rgba(15,23,42,.08);overflow:hidden}
.graph-stage{
  position:relative;
  width:650rpx;
  height:1320rpx;
  margin:0 auto;
  border-radius:32rpx;
  background:linear-gradient(180deg,#f8fbff 0%,#f3f0ff 48%,#fff8ed 100%);
  overflow:hidden;
  border:1rpx solid #e9d5ff;
}
.graph-stage:before{content:"";position:absolute;left:40rpx;right:40rpx;top:300rpx;border-top:1rpx dashed rgba(124,58,237,.16)}
.graph-stage:after{content:"";position:absolute;left:40rpx;right:40rpx;top:900rpx;border-top:1rpx dashed rgba(249,115,22,.18)}
.layer-title{
  position:absolute;
  left:28rpx;
  z-index:6;
  font-size:22rpx;
  font-weight:900;
  border-radius:999rpx;
  padding:8rpx 14rpx;
  background:rgba(255,255,255,.86);
  box-shadow:0 8rpx 20rpx rgba(15,23,42,.05);
}
.layer-title.top{top:24rpx;color:#7c3aed}
.layer-title.middle{top:320rpx;color:#4c1d95}
.layer-title.bottom{top:920rpx;color:#c2410c}
.graph-line{position:absolute;height:3rpx;background:linear-gradient(90deg,rgba(124,58,237,.18),rgba(14,165,233,.34));transform-origin:0 50%;z-index:1}
.graph-node{position:absolute;border-radius:9999rpx;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rpx;box-shadow:0 14rpx 38rpx rgba(15,23,42,.11);border:2rpx solid rgba(255,255,255,.92)}
.graph-node.center{background:linear-gradient(135deg,#7c3aed,#0ea5e9);color:#fff}
.graph-node.semantic{background:linear-gradient(135deg,#ede9fe,#e0f2fe);color:#4c1d95}
.graph-node.book{background:linear-gradient(135deg,#fff7ed,#fff);color:#111827;border-color:#fed7aa}
.graph-node.other{background:linear-gradient(135deg,#f1f5f9,#fff);color:#334155}
.node-main{font-size:22rpx;font-weight:900;line-height:1.12}
.graph-node.center .node-main{font-size:25rpx}
.node-sub{font-size:17rpx;margin-top:4rpx;opacity:.78;font-weight:800}
.legend-row{display:flex;align-items:center;gap:10rpx;flex-wrap:wrap}
.dot{display:inline-block;width:24rpx;height:24rpx;border-radius:50%;margin-left:8rpx}
.dot.center{background:#7c3aed}
.dot.semantic{background:#c4b5fd}
.dot.book{background:#fdba74}
@media screen and (max-width: 380px){
  .graph-stage{width:620rpx;height:1320rpx}
}
</style>
