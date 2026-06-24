<!--
  ═══════════════════════════════════════════════════════
  【模块五 · 智能问答助手】独立聊天页面
  ═══════════════════════════════════════════════════════
-->
<template>
  <view class="chat-page">
    <!-- 头部 -->
    <view class="chat-page-header">
      <text class="chat-page-back" @click="goBack">← 返回</text>
      <text class="chat-page-title">🤖 智能荐书助手</text>
      <text class="chat-page-clear" @click="clearAll">清空</text>
    </view>

    <!-- 消息列表 -->
    <scroll-view class="chat-page-messages" scroll-y
                 :scroll-top="scrollTop" scroll-with-animation>
      <!-- 空状态 -->
      <view class="chat-empty" v-if="messages.length === 0 && !loading">
        <text class="chat-empty-icon">🤖</text>
        <text class="chat-empty-title">你好，我是智能荐书助手</text>
        <text class="chat-empty-desc">我可以帮你推荐图书、查询图书信息、\n管理阅读记录、解答功能使用问题</text>
        <view class="chat-empty-suggestions">
          <view class="chat-empty-suggestion" @click="sendQuick('推荐几本科幻小说')">
            <text>📖</text><text>推荐图书</text>
          </view>
          <view class="chat-empty-suggestion" @click="sendQuick('《三体》的作者是谁')">
            <text>🔍</text><text>查询图书</text>
          </view>
          <view class="chat-empty-suggestion" @click="sendQuick('怎么收藏图书到书架')">
            <text>❓</text><text>功能帮助</text>
          </view>
          <view class="chat-empty-suggestion" @click="sendQuick('我最近读了哪些书')">
            <text>📊</text><text>我的数据</text>
          </view>
          <view class="chat-empty-suggestion" @click="sendQuick('有哪些适合入门的人工智能书籍')">
            <text>🎯</text><text>精准推荐</text>
          </view>
          <view class="chat-empty-suggestion" @click="sendQuick('近期有哪些新书上架')">
            <text>🆕</text><text>新书速递</text>
          </view>
        </view>
      </view>

      <!-- 消息 -->
      <view v-for="(msg, idx) in messages" :key="idx"
            :class="['chat-msg-row', msg.role === 'user' ? 'msg-row-right' : 'msg-row-left']">
        <view class="msg-avatar" v-if="msg.role === 'assistant'">🤖</view>
        <view :class="['msg-bubble', msg.role === 'user' ? 'bubble-right' : 'bubble-left']">
          <text class="msg-text">{{ msg.content }}</text>
          <view class="msg-intent" v-if="msg.intentType">
            <text class="intent-tag">{{ intentLabel(msg.intentType) }}</text>
          </view>
          <view class="msg-suggestions" v-if="msg.suggestedQuestions && msg.suggestedQuestions.length">
            <text class="msg-suggestion" v-for="(q, qi) in msg.suggestedQuestions" :key="qi"
                  @click="sendQuick(q)">{{ q }}</text>
          </view>
        </view>
        <view class="msg-avatar" v-if="msg.role === 'user'">👤</view>
      </view>

      <!-- 加载 -->
      <view class="chat-msg-row msg-row-left" v-if="loading">
        <view class="msg-avatar">🤖</view>
        <view class="msg-bubble bubble-left">
          <view class="msg-typing-dots">
            <view class="dot"></view><view class="dot"></view><view class="dot"></view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 输入栏 -->
    <view class="chat-page-input">
      <input class="chat-page-textinput" v-model="inputText"
             placeholder="输入你的问题，例如：推荐几本科幻小说"
             :disabled="loading" @confirm="sendMessage" confirm-type="send" />
      <view class="chat-page-send" @click="sendMessage"
            :class="{ 'send-disabled': loading || !inputText.trim() }">
        <text>发送</text>
      </view>
    </view>
  </view>
</template>

<script>
import { api } from '@/api/index.js';
import { isLoggedIn } from '@/utils/auth.js';

export default {
  data() {
    return {
      inputText: '',
      messages: [],
      loading: false,
      scrollTop: 0,
    };
  },
  onLoad() {
    // 加载历史
    if (isLoggedIn()) {
      this.loadHistory();
    }
  },
  methods: {
    intentLabel(type) {
      const labels = {
        function_qa: '功能问答', book_rec: '智能荐书', book_qa: '图书查询',
        personal_qa: '个人数据', admin_help: '管理帮助', kg_assist: '图谱辅助',
        out_of_scope: '超出范围',
      };
      return labels[type] || type;
    },

    async loadHistory() {
      try {
        const res = await api.chat.getHistory();
        if (res && res.messages) {
          this.messages = res.messages.map(m => ({
            role: m.role,
            content: m.content,
            intentType: m.intent_type,
            suggestedQuestions: null,
          }));
          this.$nextTick(() => this.scrollToBottom());
        }
      } catch (e) {}
    },

    async sendMessage() {
      const text = this.inputText.trim();
      if (!text || this.loading) return;

      this.messages.push({ role: 'user', content: text });
      this.inputText = '';
      this.loading = true;
      this.$nextTick(() => this.scrollToBottom());

      try {
        const res = await api.chat.send({ message: text });
        this.messages.push({
          role: 'assistant',
          content: res.content,
          intentType: res.intent_type,
          suggestedQuestions: res.suggested_questions,
        });
      } catch (e) {
        this.messages.push({
          role: 'assistant',
          content: '抱歉，AI服务暂时不可用。请稍后重试。',
          intentType: null,
          suggestedQuestions: null,
        });
      } finally {
        this.loading = false;
        this.$nextTick(() => this.scrollToBottom());
      }
    },

    sendQuick(text) {
      this.inputText = text;
      this.sendMessage();
    },

    async clearAll() {
      try {
        await api.chat.deleteHistory();
        this.messages = [];
      } catch (e) {}
    },

    goBack() {
      uni.navigateBack();
    },

    scrollToBottom() {
      this.scrollTop += 99999;
    },
  },
};
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #F8FAFC;
}

/* 头部 */
.chat-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 28rpx;
  background: linear-gradient(135deg, #2563EB, #7C3AED);
  color: #fff;
  padding-top: calc(20rpx + var(--status-bar-height, 0));
}
.chat-page-back, .chat-page-clear { font-size: 28rpx; cursor: pointer; opacity: 0.85; }
.chat-page-title { font-size: 32rpx; font-weight: bold; }

/* 消息列表 */
.chat-page-messages {
  flex: 1;
  padding: 24rpx;
  overflow-y: auto;
}

/* 空状态 */
.chat-empty { text-align: center; padding-top: 80rpx; }
.chat-empty-icon { font-size: 100rpx; display: block; margin-bottom: 20rpx; }
.chat-empty-title { font-size: 34rpx; font-weight: bold; color: #1E293B; }
.chat-empty-desc { font-size: 28rpx; color: #64748B; margin-top: 16rpx; line-height: 1.6; white-space: pre-wrap; }
.chat-empty-suggestions { margin-top: 40rpx; display: flex; flex-wrap: wrap; justify-content: center; gap: 16rpx; }
.chat-empty-suggestion {
  display: flex; align-items: center; gap: 10rpx;
  padding: 16rpx 32rpx; background: #fff; border-radius: 40rpx;
  font-size: 28rpx; color: #2563EB; box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);
  cursor: pointer;
}

/* 消息行 */
.chat-msg-row { display: flex; align-items: flex-start; margin-bottom: 28rpx; gap: 12rpx; }
.msg-row-right { flex-direction: row-reverse; }
.msg-row-left { flex-direction: row; }
.msg-avatar { font-size: 40rpx; flex-shrink: 0; width: 56rpx; text-align: center; }
.msg-bubble { max-width: 75%; padding: 18rpx 24rpx; border-radius: 20rpx; font-size: 28rpx; line-height: 1.6; }
.bubble-right { background: linear-gradient(135deg, #2563EB, #1D4ED8); color: #fff; border-bottom-right-radius: 6rpx; }
.bubble-left { background: #FFFFFF; color: #1E293B; border: 1px solid #E2E8F0; border-bottom-left-radius: 6rpx; }
.msg-text { white-space: pre-wrap; word-break: break-word; }

/* 意图标签 */
.msg-intent { margin-top: 8rpx; }
.intent-tag {
  font-size: 20rpx; padding: 2rpx 12rpx;
  background: rgba(37, 99, 235, 0.1); color: #2563EB; border-radius: 8rpx;
}

/* 建议追问 */
.msg-suggestions { margin-top: 16rpx; display: flex; flex-wrap: wrap; gap: 10rpx; }
.msg-suggestion {
  padding: 8rpx 20rpx; background: #EEF2FF; color: #2563EB;
  border-radius: 30rpx; font-size: 24rpx; cursor: pointer;
}

/* 输入中动画 */
.msg-typing-dots { display: flex; gap: 8rpx; padding: 4rpx 0; }
.dot { width: 12rpx; height: 12rpx; border-radius: 50%; background: #94A3B8; animation: dotPulse 1.4s infinite; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes dotPulse {
  0%,80%,100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

/* 输入栏 */
.chat-page-input {
  display: flex; align-items: center; padding: 16rpx 20rpx;
  border-top: 1px solid #E2E8F0; background: #fff; gap: 12rpx;
}
.chat-page-textinput {
  flex: 1; height: 76rpx; padding: 0 24rpx;
  background: #F1F5F9; border-radius: 38rpx; font-size: 28rpx;
}
.chat-page-send {
  padding: 14rpx 32rpx; background: linear-gradient(135deg, #2563EB, #7C3AED);
  color: #fff; border-radius: 38rpx; font-size: 28rpx; font-weight: bold; cursor: pointer;
}
.chat-page-send.send-disabled { opacity: 0.5; }
</style>
