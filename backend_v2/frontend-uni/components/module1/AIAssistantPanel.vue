<template>
  <view class="ai-panel">
    <view class="ai-head">
      <view class="orb"><view></view></view>
      <view>
        <view class="ai-title">智能问答助手</view>
        <view class="ai-sub">荐书 · 画像问答 · 功能指引</view>
      </view>
    </view>
    <scroll-view class="chat-list" scroll-y :scroll-top="scrollTop">
      <view v-for="(m, idx) in messages" :key="idx" class="msg" :class="m.role">
        <view class="bubble">{{ m.content }}</view>
      </view>
    </scroll-view>
    <view class="quick-row">
      <view v-for="q in quickQuestions" :key="q" class="quick" @click="sendQuick(q)">{{ q }}</view>
    </view>
    <view class="composer">
      <input v-model="input" class="input" placeholder="问我：我最近在读什么？" confirm-type="send" @confirm="send" />
      <button class="send-btn" :loading="loading" @click="send">发送</button>
    </view>
  </view>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import module1Api from '../../api/module1.js'
const input = ref('')
const loading = ref(false)
const scrollTop = ref(0)
const quickQuestions = ['我收藏了哪些书？', '推荐几本AI入门书', '怎么看阅读进度？']
const messages = ref([
  { role: 'assistant', content: '你好，我可以结合你的阅读画像、书架、评分和进度回答问题。' }
])
function sendQuick(q) { input.value = q; send() }
async function send() {
  const text = input.value.trim()
  if (!text || loading.value) return
  input.value = ''
  messages.value.push({ role: 'user', content: text })
  loading.value = true
  try {
    const res = await module1Api.chat(text)
    messages.value.push({ role: 'assistant', content: res.content || res.answer || '已收到，但没有生成有效回答。' })
  } catch (e) {
    messages.value.push({ role: 'assistant', content: '智能助手接口暂时不可用，请确认后端已启动并完成登录授权。' })
  } finally {
    loading.value = false
    await nextTick()
    scrollTop.value += 9999
  }
}
</script>

<style scoped>
.ai-panel { padding: 28rpx; border-radius: 36rpx; background: rgba(255,255,255,.84); box-shadow: 0 30rpx 90rpx rgba(22,37,78,.14); border:1rpx solid rgba(255,255,255,.88); backdrop-filter: blur(22rpx); }
.ai-head { display:flex; gap: 18rpx; align-items:center; }
.orb { width:74rpx; height:74rpx; border-radius:28rpx; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#5e7cff,#64e6ff); box-shadow:0 0 50rpx rgba(94,124,255,.42); }
.orb view { width:32rpx; height:32rpx; border-radius:50%; background:#fff; opacity:.88; animation:pulse 1.8s infinite; }
.ai-title { font-weight: 900; font-size: 32rpx; color:#141b34; }
.ai-sub { color:#7a859d; font-size:22rpx; margin-top:6rpx; }
.chat-list { height: 390rpx; margin-top:24rpx; padding-right: 4rpx; }
.msg { display:flex; margin-bottom:18rpx; }
.msg.user { justify-content:flex-end; }
.bubble { max-width: 78%; padding: 18rpx 22rpx; border-radius: 26rpx; font-size: 25rpx; line-height: 1.65; color:#263047; background: #f3f6ff; }
.msg.user .bubble { color:#fff; background: linear-gradient(135deg,#536dfe,#8b5cf6); }
.quick-row { display:flex; flex-wrap:wrap; gap: 12rpx; margin: 10rpx 0 20rpx; }
.quick { padding: 12rpx 16rpx; border-radius:999rpx; font-size:22rpx; color:#4f63d9; background:rgba(83,109,254,.10); }
.composer { display:flex; gap: 14rpx; align-items:center; }
.input { flex:1; height: 76rpx; padding:0 22rpx; border-radius: 24rpx; background:#f4f7ff; color:#1c2438; font-size:25rpx; }
.send-btn { height:76rpx; line-height:76rpx; padding: 0 28rpx; border-radius:24rpx; background:linear-gradient(135deg,#5e7cff,#64e6ff); color:#fff; font-weight:800; font-size:25rpx; }
@keyframes pulse { 0%,100%{transform:scale(.85);opacity:.7} 50%{transform:scale(1.12);opacity:1} }
</style>
