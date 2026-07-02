<template>
  <view class="page chat">
    <view class="chat-hero">
      <text class="title">AI荐书助手</text>
      <text class="sub">融合用户画像、知识图谱、混合推荐和功能指引</text>
    </view>

    <scroll-view scroll-y class="msgs" :scroll-into-view="lastId">
      <view v-for="(m,i) in messages" :id="'msg-'+i" :key="i" :class="['row',m.role]">
        <view class="avatar">{{ m.role === 'user' ? '你' : 'AI' }}</view>

        <view :class="['bubble',m.role]">
          <text v-if="m.meta" class="meta">{{ m.meta }}</text>
          <text class="content">{{ m.content }}</text>

          <view v-if="m.books && m.books.length" class="book-list">
            <view
              v-for="b in m.books.slice(0,3)"
              :key="b.id || b.book_id"
              class="book-card"
              @click="openBook(b.id || b.book_id)"
            >
              <text class="book-title">{{ b.title }}</text>
              <text class="book-meta">{{ (b.authors || []).join('、') || b.author || '未知作者' }} · ⭐ {{ b.avg_rating || 0 }}</text>
              <text v-if="b.reason" class="reason">{{ b.reason }}</text>
            </view>
          </view>

          <view v-if="m.suggestions && m.suggestions.length" class="chips">
            <text
              v-for="x in m.suggestions.slice(0,4)"
              :key="x"
              class="chip"
              @click="quickAsk(x)"
            >
              {{ x }}
            </text>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="input glass">
      <input v-model="text" placeholder="推荐几本人工智能入门书" @confirm="send"/>
      <button class="btn" @click="send">发送</button>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, nextTick } from 'vue';
import { request } from '../../api/request';

const text = ref('');
const messages = ref([
  {
    role:'ai',
    content:'我是AI荐书助手，可以回答荐书、图书知识、个人阅读和后台管理问题。',
    suggestions:[
      '推荐几本人工智能入门书',
      '我喜欢《三体》，还能看什么？',
      '怎么看我的阅读进度？'
    ]
  }
]);

const lastId = computed(() => `msg-${messages.value.length - 1}`);

function scrollBottom(){
  nextTick(() => {});
}

function quickAsk(q){
  text.value = q;
  send();
}

function openBook(id){
  uni.navigateTo({url:`/pages/detail/detail?id=${id}`});
}

async function send(){
  const q = text.value.trim();
  if(!q) return;

  messages.value.push({role:'user',content:q});
  text.value = '';

  const loading = {
    role:'ai',
    content:'正在检索图书库、用户画像和知识图谱……'
  };

  messages.value.push(loading);
  scrollBottom();

  try{
    const r = await request('/chat/send',{
      method:'POST',
      data:{message:q}
    });

    Object.assign(loading,{
      content:r.answer,
      books:r.books || [],
      suggestions:r.suggestions || [],
      meta:`${r.intent || 'assistant'} · ${r.llm_enabled ? 'LLM增强' : '本地规则回答'}`
    });
  }catch(e){
    Object.assign(loading,{
      content:e.message || '智能助手暂时不可用',
      suggestions:['推荐几本人工智能入门书','怎么购买实体书？'],
      meta:'请求失败'
    });
  }
}
</script>

<style scoped>
.chat{
  display:flex;
  flex-direction:column;
  height:100vh;
  background:linear-gradient(135deg,#f9f1df,#eff6ff 48%,#f7f3ff);
}
.chat-hero{
  padding:30rpx 28rpx 18rpx;
}
.title{
  display:block;
  font-size:40rpx;
  font-weight:900;
  color:#111827;
}
.sub{
  display:block;
  margin-top:8rpx;
  color:#667085;
  font-size:24rpx;
}
.msgs{
  flex:1;
  padding:0 20rpx;
}
.row{
  display:flex;
  gap:14rpx;
  align-items:flex-start;
  margin:18rpx 0;
}
.row.user{
  flex-direction:row-reverse;
}
.avatar{
  width:56rpx;
  height:56rpx;
  border-radius:20rpx;
  background:#111827;
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:22rpx;
  font-weight:900;
}
.row.user .avatar{
  background:linear-gradient(135deg,#7c3aed,#0ea5e9);
}
.bubble{
  max-width:78%;
  padding:20rpx;
  border-radius:26rpx;
  background:rgba(255,255,255,.88);
  border:1rpx solid rgba(148,163,184,.25);
  line-height:1.65;
  box-shadow:0 12rpx 30rpx rgba(15,23,42,.06);
}
.bubble.user{
  background:linear-gradient(135deg,#7c3aed,#0ea5e9);
  color:#fff;
}
.meta{
  display:block;
  color:#7c3aed;
  font-size:21rpx;
  font-weight:900;
  margin-bottom:8rpx;
}
.content{
  white-space:pre-wrap;
  font-size:27rpx;
  color:#334155;
}
.bubble.user .content{
  color:#fff;
}
.book-list{
  margin-top:14rpx;
}
.book-card{
  display:block;
  padding:16rpx;
  margin-top:10rpx;
  border-radius:20rpx;
  background:#f8fafc;
  border:1rpx solid rgba(148,163,184,.24);
}
.book-title{
  display:block;
  color:#111827;
  font-size:27rpx;
  font-weight:900;
}
.book-meta,
.reason{
  display:block;
  margin-top:6rpx;
  color:#667085;
  font-size:22rpx;
}
.chips{
  display:flex;
  gap:10rpx;
  flex-wrap:wrap;
  margin-top:14rpx;
}
.chip{
  padding:10rpx 14rpx;
  border-radius:999rpx;
  background:rgba(124,58,237,.10);
  color:#475569;
  font-size:22rpx;
  font-weight:800;
}
.input{
  display:flex;
  gap:12rpx;
  padding:18rpx;
  background:rgba(255,255,255,.82);
  border-top:1rpx solid rgba(148,163,184,.24);
}
.input input{
  flex:1;
  background:#fff;
  border-radius:999rpx;
  padding:18rpx 22rpx;
}
.btn{
  border-radius:999rpx;
  background:linear-gradient(135deg,#7c3aed,#0ea5e9);
  color:#fff;
  font-weight:900;
}
</style>
