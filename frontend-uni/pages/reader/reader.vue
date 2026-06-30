<template>
  <view class="page reader-page">
    <view class="glass head">
      <text class="h1">电子书在线试读</text>
      <text class="meta">PDF.js / EPUB.js 阅读器 · 翻页 · 缩放 · 目录 · 进度保存</text>
    </view>
    <!-- #ifdef H5 -->
    <web-view :src="readerUrl" class="webview" />
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <web-view :src="readerUrl" class="webview" />
    <!-- #endif -->
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const readerUrl = ref('')
onMounted(() => {
  const pages = getCurrentPages()
  const id = pages[pages.length - 1].options.id || 1
  readerUrl.value = `http://localhost:8000/static/reader.html?book_id=${id}`
})
</script>
<style scoped>
.reader-page{height:100vh;padding:0;background:#f8fafc}.head{margin:20rpx;padding:24rpx}.h1{display:block;font-size:40rpx;font-weight:900}.meta{display:block;color:#667085;margin-top:8rpx}.webview{width:100%;height:calc(100vh - 150rpx)}
</style>
