<template>
  <view class="page">
    <view class="nav">
      <view class="back" @click="back">‹</view>
      <view>
        <view class="title">智能问答助手</view>
        <view class="sub">系统功能 · 图书荐读 · 个人画像</view>
      </view>
    </view>

    <view class="hero-card">
      <view class="planet"><view></view></view>
      <view class="hero-main">
        <view class="hero-title">Ask with Context</view>
        <view class="hero-desc">我会结合用户画像、图书资源和阅读行为生成回答，并拒答系统业务范围之外的问题。</view>
      </view>
    </view>

    <view class="intent-grid">
      <view v-for="item in intents" :key="item.title" class="intent" @click="sendQuick(item.prompt)">
        <text class="intent-icon">{{ item.icon }}</text>
        <text class="intent-title">{{ item.title }}</text>
        <text class="intent-desc">{{ item.desc }}</text>
      </view>
    </view>

    <scroll-view class="messages" scroll-y :scroll-top="scrollTop">
      <view v-for="(m, idx) in messages" :key="idx" class="msg" :class="m.role">
        <view class="bubble">
          <view v-if="m.intent" class="intent-badge">{{ m.intent }}</view>
          <text>{{ m.content }}</text>
          <view v-if="m.suggestions && m.suggestions.length" class="suggestions">
            <view v-for="s in m.suggestions" :key="s" @click="sendQuick(s)">{{ s }}</view>
          </view>
        </view>
      </view>
      <view v-if="loading" class="msg assistant"><view class="bubble typing"><text></text><text></text><text></text></view></view>
    </scroll-view>

    <view class="composer-wrap">
      <input v-model="input" class="composer" placeholder="例如：我这个月读了多久？" confirm-type="send" @confirm="send" />
      <button class="send" :loading="loading" @click="send">发送</button>
    </view>
  </view>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import module1Api from '../../api/module1.js'
const input = ref('')
const loading = ref(false)
const scrollTop = ref(0)
const intents = [
  { icon: '✦', title: '功能问答', desc: '收藏/进度/购书', prompt: '收藏功能在哪里？' },
  { icon: '◎', title: '自然荐书', desc: '按主题或图书', prompt: '推荐几本适合人工智能入门的书' },
  { icon: '◈', title: '个人阅读', desc: '书架/评分/进度', prompt: '我收藏了哪些书？' },
  { icon: '⌘', title: '后台帮助', desc: '管理员指引', prompt: '如何添加图书？' }
]
const messages = ref([
  { role: 'assistant', content: '你好，我是智能问答助手。你可以问我推荐、图书、个人阅读数据和系统功能位置。', suggestions: ['推荐几本AI入门书', '怎么看阅读进度？', '我给哪些书打过高分？'] }
])
function back() { uni.navigateBack() }
function sendQuick(text) { input.value = text; send() }
async function send() {
  const text = input.value.trim()
  if (!text || loading.value) return
  input.value = ''
  messages.value.push({ role: 'user', content: text })
  loading.value = true
  await scrollBottom()
  try {
    const res = await module1Api.chat(text)
    messages.value.push({
      role: 'assistant',
      content: res.content || res.answer || '暂未生成回答。',
      intent: res.intent_type || '',
      suggestions: res.suggested_questions || []
    })
  } catch (e) {
    messages.value.push({ role: 'assistant', content: '调用失败：请确认后端已启动、接口地址正确；个人阅读问答需先登录并保存 token。' })
  } finally {
    loading.value = false
    await scrollBottom()
  }
}
async function scrollBottom() { await nextTick(); scrollTop.value += 99999 }
</script>

<style scoped>
.page { min-height:100vh; padding: 36rpx 26rpx 150rpx; background: radial-gradient(circle at 20% 0%, #dff3ff 0, transparent 32%), linear-gradient(180deg,#f1f5ff,#ffffff); }
.nav { display:flex; align-items:center; gap:20rpx; }
.back { width:68rpx; height:68rpx; display:flex; align-items:center; justify-content:center; border-radius:24rpx; background:#fff; color:#17203a; font-size:56rpx; box-shadow:0 16rpx 45rpx rgba(20,30,60,.10); }
.title { color:#141b34; font-size:38rpx; font-weight:900; }
.sub { margin-top:4rpx; color:#7a859d; font-size:22rpx; }
.hero-card { margin-top:26rpx; display:flex; gap:22rpx; padding:30rpx; border-radius:38rpx; color:#fff; background: linear-gradient(135deg,#121a33,#4f46e5 62%,#67e8f9 120%); box-shadow:0 34rpx 90rpx rgba(45,67,180,.24); }
.planet { width:104rpx; height:104rpx; border-radius:36rpx; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,.14); border:1rpx solid rgba(255,255,255,.26); }
.planet view { width:54rpx; height:54rpx; border-radius:50%; background:linear-gradient(135deg,#fff,#a7f3ff); box-shadow:0 0 70rpx rgba(167,243,255,.9); }
.hero-title { font-size:34rpx; font-weight:900; }
.hero-desc { margin-top:10rpx; color:rgba(255,255,255,.72); font-size:24rpx; line-height:1.55; }
.intent-grid { display:grid; grid-template-columns:1fr 1fr; gap:18rpx; margin-top:24rpx; }
.intent { padding:22rpx; border-radius:30rpx; background:rgba(255,255,255,.86); box-shadow:0 18rpx 58rpx rgba(31,47,90,.10); border:1rpx solid rgba(255,255,255,.88); display:flex; flex-direction:column; gap:8rpx; }
.intent-icon { color:#536dfe; font-size:34rpx; }
.intent-title { color:#141b34; font-weight:900; font-size:25rpx; }
.intent-desc { color:#7c879d; font-size:21rpx; }
.messages { margin-top:24rpx; height: 690rpx; }
.msg { display:flex; margin-bottom:18rpx; }
.msg.user { justify-content:flex-end; }
.bubble { max-width:80%; padding:22rpx 24rpx; border-radius:30rpx; color:#243047; font-size:26rpx; line-height:1.65; background:rgba(255,255,255,.92); box-shadow:0 14rpx 44rpx rgba(31,47,90,.08); }
.user .bubble { color:#fff; background:linear-gradient(135deg,#536dfe,#8b5cf6); }
.intent-badge { display:inline-flex; margin-bottom:10rpx; padding:6rpx 12rpx; border-radius:999rpx; color:#536dfe; background:rgba(83,109,254,.12); font-size:20rpx; font-weight:900; }
.suggestions { display:flex; flex-wrap:wrap; gap:10rpx; margin-top:16rpx; }
.suggestions view { padding:10rpx 14rpx; border-radius:999rpx; color:#4f63d9; background:#edf1ff; font-size:21rpx; }
.typing { display:flex; gap:10rpx; align-items:center; }
.typing text { width:12rpx; height:12rpx; border-radius:50%; background:#536dfe; animation:blink 1s infinite; }
.typing text:nth-child(2){ animation-delay:.15s }.typing text:nth-child(3){ animation-delay:.3s }
.composer-wrap { position:fixed; left:0; right:0; bottom:0; display:flex; gap:16rpx; padding:22rpx 26rpx 34rpx; background:rgba(248,251,255,.86); backdrop-filter:blur(24rpx); box-shadow:0 -20rpx 60rpx rgba(31,47,90,.08); }
.composer { flex:1; height:82rpx; padding:0 26rpx; border-radius:28rpx; background:#fff; color:#141b34; font-size:26rpx; box-shadow:0 12rpx 40rpx rgba(31,47,90,.08); }
.send { width:140rpx; height:82rpx; line-height:82rpx; border-radius:28rpx; color:#fff; font-weight:900; font-size:26rpx; background:linear-gradient(135deg,#536dfe,#64e6ff); }
@keyframes blink { 0%,100%{opacity:.25;transform:translateY(0)}50%{opacity:1;transform:translateY(-8rpx)} }
</style>
