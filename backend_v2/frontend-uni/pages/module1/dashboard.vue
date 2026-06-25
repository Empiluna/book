<template>
  <view class="page">
    <view class="hero">
      <view class="hero-bg one"></view>
      <view class="hero-bg two"></view>
      <view class="topbar">
        <view>
          <view class="eyebrow">MODULE 01 · USER PROFILE</view>
          <view class="hero-title">阅读画像驾驶舱</view>
          <view class="hero-desc">将阅读历史、收藏、评分和进度转化为可解释兴趣画像。</view>
        </view>
        <view class="avatar" @click="goChat">AI</view>
      </view>
      <view class="hero-actions">
        <button class="primary" @click="refreshAll">刷新画像</button>
        <button class="secondary" @click="goChat">打开智能助手</button>
      </view>
    </view>

    <view class="section grid-two">
      <LuxuryMetricCard icon="⏱" :value="stats.total_reading_minutes || 0" label="累计阅读分钟" sub-label="多端进度实时同步" trend="Live" tone="blue" />
      <LuxuryMetricCard icon="✓" :value="stats.finished_books || 0" label="已完成图书" sub-label="基于阅读历史统计" trend="Done" tone="green" />
      <LuxuryMetricCard icon="★" :value="stats.rating_count || 0" label="评分记录" sub-label="用于更新高分图书池" trend="Score" tone="gold" />
      <LuxuryMetricCard icon="◇" :value="stats.bookmark_count || 0" label="书架收藏" sub-label="形成长期兴趣偏好" trend="Shelf" tone="purple" />
    </view>

    <view class="section">
      <ReadingRadar :metrics="radarMetrics" />
    </view>

    <view class="section">
      <PreferenceCloud :tags="profile.tag_preferences || []" />
    </view>

    <view class="section card">
      <view class="card-head">
        <view>
          <view class="card-title">偏好作者与高分图书</view>
          <view class="card-sub">推荐引擎会优先读取这些画像信号</view>
        </view>
        <view class="mini-btn" @click="refreshAll">同步</view>
      </view>
      <view class="author-row">
        <view v-for="a in authorList" :key="a.name" class="author-chip">
          <text>{{ a.name }}</text><text>{{ a.count || a.weight || '' }}</text>
        </view>
        <view v-if="!authorList.length" class="empty">暂无作者偏好</view>
      </view>
      <view class="book-list">
        <view v-for="b in highBooks" :key="b.book_id || b.id || b.title" class="book-item">
          <view class="book-cover">{{ (b.title || '书').slice(0,1) }}</view>
          <view class="book-main">
            <view class="book-title">{{ b.title || b.book_title || '未知图书' }}</view>
            <view class="book-meta">评分 {{ b.rating || b.score || '—' }} · 已纳入高分图书池</view>
          </view>
        </view>
        <view v-if="!highBooks.length" class="empty">暂无高分图书，先给几本书评分</view>
      </view>
    </view>

    <view class="section card">
      <view class="card-head">
        <view>
          <view class="card-title">阅读进度时间线</view>
          <view class="card-sub">展示最近阅读状态和继续阅读入口</view>
        </view>
        <view class="mini-btn" @click="goProgress">全部</view>
      </view>
      <view class="timeline">
        <view v-for="item in progressList.slice(0,4)" :key="item.id || item.book_id" class="timeline-item">
          <view class="dot"></view>
          <view class="tl-main">
            <view class="tl-title">{{ item.book_title || item.title || `图书 #${item.book_id}` }}</view>
            <view class="progress-bar"><view :style="`width:${item.progress_percent || 0}%`"></view></view>
            <view class="tl-meta">第 {{ item.current_page || 0 }} 页 · {{ item.progress_percent || 0 }}%</view>
          </view>
        </view>
        <view v-if="!progressList.length" class="empty">暂无阅读进度</view>
      </view>
    </view>

    <view class="section">
      <AIAssistantPanel />
    </view>
  </view>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import module1Api from '../../api/module1.js'
import LuxuryMetricCard from '../../components/module1/LuxuryMetricCard.vue'
import PreferenceCloud from '../../components/module1/PreferenceCloud.vue'
import ReadingRadar from '../../components/module1/ReadingRadar.vue'
import AIAssistantPanel from '../../components/module1/AIAssistantPanel.vue'

const profile = ref({})
const stats = ref({})
const progressList = ref([])
const loading = ref(false)
const authorList = computed(() => profile.value.author_preferences || profile.value.favorite_authors || [])
const highBooks = computed(() => profile.value.high_rating_books || profile.value.high_rated_books || [])
const radarMetrics = computed(() => ({
  preference: Math.min(100, (profile.value.tag_preferences || []).length * 14 + 30),
  active: Math.min(100, (stats.value.reading_days || 0) * 3 + 45),
  completion: Math.min(100, (stats.value.finished_books || 0) * 12 + 35),
  interaction: Math.min(100, (stats.value.rating_count || 0) * 10 + 30),
  exploration: Math.min(100, (stats.value.bookmark_count || 0) * 8 + 42)
}))
async function refreshAll() {
  loading.value = true
  try {
    const [p, s, pr] = await Promise.allSettled([
      module1Api.profile(), module1Api.stats(), module1Api.progress()
    ])
    if (p.status === 'fulfilled') profile.value = p.value || {}
    if (s.status === 'fulfilled') stats.value = s.value || {}
    if (pr.status === 'fulfilled') progressList.value = Array.isArray(pr.value) ? pr.value : (pr.value.items || [])
  } finally {
    loading.value = false
  }
}
function goChat() { uni.navigateTo({ url: '/pages/module1/chat' }) }
function goProgress() { uni.navigateTo({ url: '/pages/module1/progress' }) }
onMounted(refreshAll)
</script>

<style scoped>
.page { min-height:100vh; padding-bottom: 56rpx; background: linear-gradient(180deg,#eef4ff 0%,#f8fbff 48%,#ffffff 100%); }
.hero { position:relative; overflow:hidden; padding: 66rpx 34rpx 38rpx; border-bottom-left-radius: 50rpx; border-bottom-right-radius: 50rpx; color:#fff; background: linear-gradient(135deg,#141b34 0%,#3c4ac9 55%,#67e8f9 130%); box-shadow:0 34rpx 90rpx rgba(42,66,170,.28); }
.hero-bg { position:absolute; border-radius:999rpx; filter:blur(8rpx); opacity:.6; }
.hero-bg.one { width:320rpx; height:320rpx; right:-120rpx; top:-100rpx; background:#8b5cf6; }
.hero-bg.two { width:260rpx; height:260rpx; left:-90rpx; bottom:-130rpx; background:#64e6ff; }
.topbar { position:relative; z-index:1; display:flex; justify-content:space-between; gap:20rpx; align-items:flex-start; }
.eyebrow { font-size:21rpx; color:rgba(255,255,255,.62); letter-spacing:2rpx; font-weight:800; }
.hero-title { margin-top:14rpx; font-size:50rpx; line-height:1.12; font-weight:900; }
.hero-desc { margin-top:16rpx; max-width: 540rpx; color:rgba(255,255,255,.72); font-size:25rpx; line-height:1.55; }
.avatar { width:86rpx; height:86rpx; display:flex; align-items:center; justify-content:center; border-radius:30rpx; background:rgba(255,255,255,.16); border:1rpx solid rgba(255,255,255,.36); font-weight:900; backdrop-filter: blur(18rpx); }
.hero-actions { position:relative; z-index:1; margin-top:34rpx; display:flex; gap:18rpx; }
button { margin:0; }
.primary, .secondary { height:76rpx; line-height:76rpx; border-radius:25rpx; font-weight:900; font-size:25rpx; }
.primary { color:#141b34; background:linear-gradient(135deg,#ffffff,#bdf7ff); }
.secondary { color:#fff; background:rgba(255,255,255,.14); border:1rpx solid rgba(255,255,255,.24); }
.section { margin: 28rpx 26rpx 0; }
.grid-two { display:grid; grid-template-columns: 1fr 1fr; gap: 22rpx; }
.card { padding: 30rpx; border-radius:36rpx; background:rgba(255,255,255,.86); box-shadow:0 28rpx 80rpx rgba(24,39,80,.10); border:1rpx solid rgba(255,255,255,.88); }
.card-head { display:flex; justify-content:space-between; align-items:flex-start; gap:20rpx; }
.card-title { font-size:32rpx; font-weight:900; color:#141b34; }
.card-sub { margin-top:8rpx; color:#7a859d; font-size:22rpx; }
.mini-btn { padding: 12rpx 18rpx; border-radius:999rpx; color:#536dfe; background:rgba(83,109,254,.10); font-weight:800; font-size:22rpx; }
.author-row { display:flex; flex-wrap:wrap; gap:14rpx; margin-top:26rpx; }
.author-chip { display:flex; gap:10rpx; padding:14rpx 18rpx; color:#4f63d9; font-size:24rpx; font-weight:800; background:rgba(83,109,254,.10); border-radius:999rpx; }
.book-list { margin-top: 24rpx; display:flex; flex-direction:column; gap:18rpx; }
.book-item { display:flex; gap:18rpx; align-items:center; padding:18rpx; border-radius:28rpx; background:#f5f7ff; }
.book-cover { width:82rpx; height:108rpx; border-radius:18rpx; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:900; background:linear-gradient(135deg,#5e7cff,#8b5cf6); }
.book-title { color:#1b2438; font-weight:900; font-size:27rpx; }
.book-meta { margin-top:8rpx; color:#7c879f; font-size:22rpx; }
.timeline { margin-top: 26rpx; display:flex; flex-direction:column; gap:22rpx; }
.timeline-item { position:relative; display:flex; gap:18rpx; }
.dot { margin-top:8rpx; width:22rpx; height:22rpx; border-radius:50%; background:#64e6ff; box-shadow:0 0 30rpx #64e6ff; }
.tl-main { flex:1; }
.tl-title { font-weight:900; color:#1b2438; font-size:26rpx; }
.progress-bar { margin-top:14rpx; height:12rpx; border-radius:999rpx; background:#e5ebff; overflow:hidden; }
.progress-bar view { height:100%; border-radius:999rpx; background:linear-gradient(90deg,#5e7cff,#64e6ff); }
.tl-meta { margin-top:8rpx; color:#7d879d; font-size:22rpx; }
.empty { color:#8a94aa; font-size:24rpx; padding:12rpx 0; }
</style>
