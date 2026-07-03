<template>
  <view class="container">
    <view class="card">
      <text class="title">搜索发现</text>
      <view class="search-row">
        <input class="input search-input" v-model="keyword" placeholder="搜索书名、作者、标签" confirm-type="search" @confirm="load" />
        <button class="btn search-btn" @click="load">搜索</button>
      </view>
      <view class="sort-row">
        <text :class="sort==='hot'?'chip active':'chip'" @click="setSort('hot')">热门</text>
        <text :class="sort==='new'?'chip active':'chip'" @click="setSort('new')">新书</text>
        <text :class="sort==='rating'?'chip active':'chip'" @click="setSort('rating')">高分</text>
      </view>
    </view>

    <view class="card" v-if="hotSearches.length">
      <text class="sub-title">热门搜索</text>
      <view class="chips">
        <text v-for="item in hotSearches" :key="item.keyword" class="chip" @click="quick(item.keyword)">{{ item.keyword }}</text>
      </view>
    </view>

    <view class="card" v-if="options.categories.length || options.tags.length">
      <text class="sub-title">分类筛选</text>
      <scroll-view scroll-x class="chip-scroll"><text class="chip" @click="filterCategory('')">全部</text><text v-for="c in options.categories" :key="c" :class="category===c?'chip active':'chip'" @click="filterCategory(c)">{{ c }}</text></scroll-view>
      <text class="sub-title tag-title">标签</text>
      <view class="chips"><text v-for="t in options.tags.slice(0, 18)" :key="t" :class="tag===t?'chip active':'chip'" @click="filterTag(t)">{{ t }}</text></view>
    </view>

    <view v-if="error" class="card"><text class="muted">{{ error }}</text></view>
    <view v-if="loading" class="card"><text class="muted">正在搜索...</text></view>
    <BookCard v-for="item in books" :key="item.id" :book="item" @click="goDetail"></BookCard>
    <view v-if="!loading && !books.length" class="card empty"><text class="muted">暂无结果，换个关键词试试。</text></view>
  </view>
</template>

<script>
import BookCard from '../../components/BookCard.vue'
import { request, normalizeBooks } from '../../api/request.js'
export default {
  components: { BookCard: BookCard },
  data: function () { return { keyword: '', category: '', tag: '', sort: 'hot', books: [], options: { categories: [], tags: [] }, hotSearches: [], loading: false, error: '' } },
  onLoad: function () { this.init() },
  onPullDownRefresh: function () { const that = this; this.load(function () { uni.stopPullDownRefresh() }) },
  methods: {
    init: function () {
      const that = this
      request('/books/meta/options').then(function (res) { that.options = res || { categories: [], tags: [] } }).catch(function () {})
      request('/books/hot-searches?limit=10').then(function (res) { that.hotSearches = (res && res.items) || [] }).catch(function () {})
      that.load()
    },
    buildPath: function () {
      let path = '/books?limit=40&mode=hybrid&sort=' + encodeURIComponent(this.sort)
      if (this.keyword) path += '&q=' + encodeURIComponent(this.keyword)
      if (this.category) path += '&category=' + encodeURIComponent(this.category)
      if (this.tag) path += '&tag=' + encodeURIComponent(this.tag)
      return path
    },
    load: function (done) {
      const that = this
      that.loading = true; that.error = ''
      request(that.buildPath()).then(function (res) { that.books = normalizeBooks((res && (res.items || res.books || res.data)) || []) }).catch(function (e) { that.error = e.message || '搜索失败' }).then(function () { that.loading = false; if (done) done() })
    },
    quick: function (q) { this.keyword = q; this.load() },
    filterCategory: function (c) { this.category = c; this.load() },
    filterTag: function (t) { this.tag = this.tag === t ? '' : t; this.load() },
    setSort: function (s) { this.sort = s; this.load() },
    goDetail: function (book) { uni.navigateTo({ url: '/pages/detail/detail?id=' + (book.id || book.book_id) }) }
  }
}
</script>

<style scoped>
.search-row{display:flex;gap:16rpx;align-items:center}.search-input{flex:1}.search-btn{width:150rpx;font-size:26rpx;padding:0}.sort-row{margin-top:18rpx}.chip-scroll{white-space:nowrap}.chip-scroll .chip{display:inline-block}.tag-title{margin-top:18rpx}
</style>
