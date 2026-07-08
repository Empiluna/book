<template>
  <view class="container original-page">
    <view class="hero-card">
      <text class="eyebrow">AI Writing Studio</text>
      <text class="big-title">AI小说工坊</text>
      <text class="hero-desc">填写设定、参考资料和具体要求，生成小说后可保存到个人书架。</text>
      <view class="hero-tags">
        <text>生成正文</text><text>自动简介</text><text>标签提取</text><text>保存入架</text>
      </view>
    </view>

    <view v-if="!logged" class="lock-card">
      <text class="lock-icon">🔒</text>
      <text class="title center">登录后解锁 AI 小说工坊</text>
      <text class="muted center">登录后可以生成小说、编辑正文、保存到我的书架，并在阅读器中继续阅读。</text>
      <button class="btn" @click="goLogin">去登录</button>
    </view>

    <view v-if="logged" class="layout">
      <view class="card form-card">
        <view class="section-head">
          <view>
            <text class="title">创作信息</text>
            <text class="muted">填写基础设定后再生成</text>
          </view>
        </view>

        <view class="field-row">
          <view class="field half">
            <text class="label">作品标题</text>
            <input class="input" v-model="title" placeholder="例如：星海来信" />
          </view>
          <view class="field half">
            <text class="label">题材方向</text>
            <input class="input" v-model="genre" placeholder="科幻、悬疑、成长" />
          </view>
        </view>

        <view class="field">
          <text class="label">要求字数</text>
          <picker :range="wordOptions" range-key="label" :value="wordIndex" @change="wordChange">
            <view class="picker-box">{{ wordOptions[wordIndex].label }}</view>
          </picker>
        </view>

        <view class="field">
          <text class="label">参考文档</text>
          <textarea class="textarea ref" v-model="reference" placeholder="粘贴参考设定、人物关系、世界观、故事片段等，可为空。"></textarea>
        </view>

        <view class="field">
          <text class="label">具体需求</text>
          <textarea class="textarea req" v-model="requirement" placeholder="例如：主角是一名图书管理员，发现旧书可以通往不同星球；风格温柔但有悬念，结尾留下续作空间。"></textarea>
        </view>

        <view class="actions">
          <button class="btn" :loading="generating" @click="generate">生成小说</button>
          <button class="btn secondary" :loading="saving" @click="save">保存到我的书架</button>
        </view>
      </view>

      <view class="card result-card">
        <text class="title">AI 辅助结果</text>
        <text class="muted">简介、标签和排版建议</text>
        <view class="assist-box">
          <text v-if="!assist" class="muted">生成后会在这里显示简介、标签和排版建议。</text>
          <view v-else>
            <text class="assist-title">{{ assist.title || title || '未命名作品' }}</text>
            <text class="assist-summary">{{ assist.summary || '暂无简介' }}</text>
            <view class="chips"><text v-for="t in assistTags" :key="t" class="chip active">{{ t }}</text></view>
            <text class="sub-title suggestions-title">排版建议</text>
            <text v-for="(x,idx) in suggestions" :key="idx" class="suggestion">• {{ x }}</text>
          </view>
        </view>
      </view>

      <view class="card manuscript-card">
        <text class="title">生成正文</text>
        <text class="muted">可以手动修改后保存</text>
        <textarea class="textarea manuscript" v-model="manuscript" placeholder="点击生成小说后，正文会出现在这里；也可以直接粘贴自己的正文后保存。"></textarea>
      </view>

      <view class="card">
        <view class="between">
          <text class="title">我的AI小说</text>
          <text class="badge">{{ works.length }} 篇</text>
        </view>
        <view v-for="w in works" :key="w.id || (w.book && w.book.id)" class="work-item" @click="openWork(w)">
          <text class="work-title">{{ workTitle(w) }}</text>
          <text class="muted">{{ workAuthor(w) }}</text>
        </view>
        <text v-if="works.length === 0" class="muted">还没有保存 AI 小说。</text>
      </view>
    </view>
  </view>
</template>

<script>
import { request, getToken, showError } from '../../api/request.js'

export default {
  data: function () {
    return {
      logged: false,
      title: '',
      genre: '',
      requirement: '',
      reference: '',
      manuscript: '',
      assist: null,
      works: [],
      generating: false,
      saving: false,
      wordIndex: 1,
      wordOptions: [
        { label: '短篇 600-1000 字', value: 800 },
        { label: '标准短篇 1000-2000 字', value: 1500 },
        { label: '中篇片段 2000-4000 字', value: 3000 },
        { label: '长篇章节 4000-8000 字', value: 6000 },
        { label: '长篇扩写 8000-12000 字', value: 10000 }
      ]
    }
  },
  computed: {
    assistTags: function () { return (this.assist && this.assist.tags) || [] },
    suggestions: function () { return (this.assist && this.assist.layout_suggestions) || ['建议先生成小说后再保存作品。'] }
  },
  onShow: function () {
    this.logged = !!getToken()
    if (this.logged) this.loadWorks()
  },
  methods: {
    wordChange: function (e) { this.wordIndex = Number(e.detail.value || 0) },
    goLogin: function () { uni.navigateTo({ url: '/pages/login/login' }) },
    validateGenerate: function () {
      if (!this.title.trim()) throw new Error('请填写作品标题')
      if (!this.genre.trim()) throw new Error('请填写题材方向')
      if (!this.requirement.trim()) throw new Error('请填写具体需求')
    },
    generate: function () {
      const that = this
      try { that.validateGenerate() } catch (e) { showError(e); return }
      that.generating = true
      that.assist = null
      request('/chat/original/generate', {
        method: 'POST',
        data: {
          title: that.title.trim(),
          genre: that.genre.trim(),
          requirement: that.requirement.trim(),
          reference_text: that.reference.trim() || null,
          word_count: that.wordOptions[that.wordIndex].value
        },
        timeout: 60000
      }).then(function (res) {
        that.manuscript = res.manuscript || ''
        that.assist = res.assist || null
        uni.showToast({ title: '生成完成', icon: 'success' })
      }).catch(function (e) { showError(e, '生成失败') }).then(function () { that.generating = false })
    },
    save: function () {
      const that = this
      if (!that.manuscript.trim() || that.manuscript.trim().length < 20) {
        uni.showToast({ title: '正文至少需要 20 个字', icon: 'none' })
        return
      }
      that.saving = true
      const assist = that.assist || {}
      request('/chat/original/save', {
        method: 'POST',
        data: {
          title: that.title.trim() || '未命名原创作品',
          genre: that.genre.trim() || '原创',
          manuscript: that.manuscript.trim(),
          summary: assist.summary || null,
          tags: assist.tags || [],
          layout_suggestions: assist.layout_suggestions || [],
          save_to_shelf: true
        },
        timeout: 30000
      }).then(function (res) {
        that.assist = res.assist || that.assist
        uni.showToast({ title: '已保存到书架', icon: 'success' })
        that.loadWorks()
        if (res.book && res.book.id) {
          setTimeout(function () { uni.navigateTo({ url: '/pages/detail/detail?id=' + res.book.id }) }, 500)
        }
      }).catch(function (e) { showError(e, '保存失败') }).then(function () { that.saving = false })
    },
    loadWorks: function () {
      const that = this
      request('/chat/original/mine').then(function (res) { that.works = res.items || [] }).catch(function () { that.works = [] })
    },
    workTitle: function (w) { const b = w.book || w; return b.title || '未命名作品' },
    workAuthor: function (w) { const b = w.book || w; return Array.isArray(b.authors) ? (b.authors.join('、') || '我') : (b.author || '我') },
    openWork: function (w) { const b = w.book || w; const id = b.id || b.book_id; if (id) uni.navigateTo({ url: '/pages/detail/detail?id=' + id }) }
  }
}
</script>

<style scoped>
.original-page{padding-bottom:calc(36rpx + env(safe-area-inset-bottom))}.hero-card{padding:34rpx;margin-bottom:22rpx;border-radius:34rpx;background:linear-gradient(135deg,#ede9fe,#e0f2fe);box-shadow:0 20rpx 46rpx rgba(15,23,42,.08)}.eyebrow{display:block;color:#6d28d9;font-size:22rpx;font-weight:900;margin-bottom:10rpx}.big-title{display:block;font-size:46rpx;font-weight:900;color:#111827;margin-bottom:10rpx}.hero-desc{display:block;color:#475467;font-size:26rpx;line-height:1.7}.hero-tags{display:flex;gap:10rpx;flex-wrap:wrap;margin-top:22rpx}.hero-tags text{padding:10rpx 16rpx;border-radius:999rpx;background:rgba(255,255,255,.72);color:#334155;font-size:22rpx;font-weight:800}.lock-card{text-align:center;background:#fff;border-radius:34rpx;padding:50rpx 34rpx;box-shadow:0 20rpx 50rpx rgba(15,23,42,.08)}.lock-icon{display:block;font-size:64rpx;margin-bottom:14rpx}.center{text-align:center}.lock-card .btn{margin-top:28rpx}.layout{display:block}.form-card,.result-card,.manuscript-card{padding:30rpx}.section-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:18rpx}.field{margin-bottom:22rpx}.field-row{display:flex;gap:18rpx}.field.half{flex:1}.label{display:block;margin-bottom:10rpx;color:#344054;font-size:24rpx;font-weight:900}.picker-box{height:82rpx;line-height:82rpx;padding:0 24rpx;border-radius:20rpx;border:1rpx solid #d0d5dd;background:#fff;color:#111827;font-size:28rpx}.ref{min-height:170rpx}.req{min-height:190rpx}.actions{display:flex;gap:16rpx}.actions .btn{flex:1}.assist-box{min-height:150rpx;padding:24rpx;border:1rpx dashed #cbd5e1;border-radius:24rpx;background:#f8fafc;margin-top:18rpx}.assist-title{display:block;font-size:30rpx;font-weight:900;color:#111827;margin-bottom:12rpx}.assist-summary{display:block;color:#475467;font-size:25rpx;line-height:1.7;margin-bottom:14rpx}.suggestions-title{margin-top:16rpx}.suggestion{display:block;color:#475467;font-size:24rpx;line-height:1.8}.manuscript{min-height:520rpx;margin-top:18rpx}.badge{padding:8rpx 14rpx;border-radius:999rpx;background:#ede9fe;color:#6d28d9;font-size:22rpx;font-weight:900}.work-item{padding:18rpx 0;border-bottom:1rpx solid #eef2f7}.work-title{display:block;color:#111827;font-size:28rpx;font-weight:900;margin-bottom:6rpx}@media screen and (max-width:380px){.field-row{display:block}.actions{display:block}.actions .btn{margin-bottom:12rpx}}
</style>
