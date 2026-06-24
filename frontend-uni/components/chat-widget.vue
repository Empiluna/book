<!--
  ═══════════════════════════════════════════════════════
  【模块五 · 智能问答助手】悬浮聊天组件
    可嵌入任意页面，提供悬浮按钮+对话面板
  ═══════════════════════════════════════════════════════
-->
<template>
  <view class="chat-widget">
    <!-- 悬浮按钮 -->
    <view class="chat-fab" @click="togglePanel" v-if="!showPanel">
      <text class="chat-fab-icon">💬</text>
      <view class="chat-fab-badge" v-if="unreadCount > 0">{{ unreadCount }}</view>
    </view>

    <!-- 对话面板 -->
    <view class="chat-panel" v-if="showPanel">
      <!-- 头部 -->
      <view class="chat-header">
        <view class="chat-header-left">
          <text class="chat-header-icon">🤖</text>
          <text class="chat-header-title">智能荐书助手</text>
        </view>
        <view class="chat-header-right">
          <text class="chat-header-btn" @click="clearHistory">清空</text>
          <text class="chat-header-btn" @click="togglePanel">✕</text>
        </view>
      </view>

      <!-- 消息列表 -->
      <scroll-view class="chat-messages" scroll-y :scroll-top="scrollTop"
                   :scroll-with-animation="true" ref="msgList">
        <!-- 欢迎消息 -->
        <view class="chat-msg chat-msg-assistant" v-if="messages.length === 0">
          <view class="chat-msg-bubble chat-bubble-assistant">
            <text class="chat-msg-text">👋 你好！我是智能荐书助手，可以帮你：</text>
            <view class="chat-suggestions">
              <text class="chat-suggestion-item" @click="sendQuick('推荐几本科幻小说')">📖 推荐图书</text>
              <text class="chat-suggestion-item" @click="sendQuick('怎么看我的阅读进度')">❓ 功能问答</text>
              <text class="chat-suggestion-item" @click="sendQuick('我收藏了哪些书')">📊 个人数据</text>
              <text class="chat-suggestion-item" @click="sendQuick('有哪些热门新书')">🔥 热门新书</text>
            </view>
          </view>
        </view>

        <!-- 历史消息 -->
        <view v-for="(msg, idx) in messages" :key="idx"
              :class="['chat-msg', msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-assistant']">
          <view :class="['chat-msg-bubble', msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant']">
            <text class="chat-msg-text">{{ msg.content }}</text>
            <!-- 建议追问 -->
            <view class="chat-suggestions" v-if="msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && msg.role === 'assistant'">
              <text class="chat-suggestion-item"
                    v-for="(q, qi) in msg.suggestedQuestions" :key="qi"
                    @click="sendQuick(q)">{{ q }}</text>
            </view>
          </view>
        </view>

        <!-- 加载中 -->
        <view class="chat-msg chat-msg-assistant" v-if="loading">
          <view class="chat-msg-bubble chat-bubble-assistant">
            <text class="chat-typing">正在思考...</text>
          </view>
        </view>
      </scroll-view>

      <!-- 输入区 -->
      <view class="chat-input-area">
        <input class="chat-input" v-model="inputText" placeholder="输入你的问题..."
               :disabled="loading" @confirm="sendMessage" confirm-type="send" />
        <view class="chat-send-btn" @click="sendMessage" :class="{ disabled: loading || !inputText.trim() }">
          <text>发送</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { api } from '@/api/index.js';
import { isLoggedIn } from '@/utils/auth.js';

export default {
  name: 'ChatWidget',
  props: {
    mode: {
      type: String,
      default: 'user' // 'user' | 'admin'
    }
  },
  data() {
    return {
      showPanel: false,
      inputText: '',
      messages: [],
      loading: false,
      unreadCount: 0,
      scrollTop: 0,
    };
  },
  methods: {
    togglePanel() {
      this.showPanel = !this.showPanel;
      if (this.showPanel) {
        this.unreadCount = 0;
        this.$nextTick(() => this.scrollToBottom());
        // 加载历史
        if (isLoggedIn()) {
          this.loadHistory();
        }
      }
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
      } catch (e) {
        // 静默失败
      }
    },

    async sendMessage() {
      const text = this.inputText.trim();
      if (!text || this.loading) return;

      // 添加用户消息
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
          content: '抱歉，AI服务暂时不可用。请稍后重试或通过页面菜单使用系统功能。',
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

    async clearHistory() {
      try {
        await api.chat.deleteHistory();
        this.messages = [];
      } catch (e) {
        // 静默失败
      }
    },

    scrollToBottom() {
      this.scrollTop = this.scrollTop + 99999; // 触发滚动到底部
    },
  },
};
</script>

<style scoped>
.chat-widget {
  position: fixed;
  z-index: 999;
}

/* 悬浮按钮 */
.chat-fab {
  position: fixed;
  right: 40rpx;
  bottom: 200rpx;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563EB, #7C3AED);
  box-shadow: 0 8rpx 24rpx rgba(37, 99, 235, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.chat-fab-icon {
  font-size: 44rpx;
}
.chat-fab-badge {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  min-width: 36rpx;
  height: 36rpx;
  border-radius: 18rpx;
  background: #EF4444;
  color: #fff;
  font-size: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8rpx;
}

/* 对话面板 */
.chat-panel {
  position: fixed;
  right: 20rpx;
  bottom: 120rpx;
  width: 600rpx;
  max-width: 90vw;
  height: 800rpx;
  max-height: 60vh;
  background: #FFFFFF;
  border-radius: 24rpx;
  box-shadow: 0 16rpx 48rpx rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 头部 */
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 28rpx;
  background: linear-gradient(135deg, #2563EB, #7C3AED);
  color: #fff;
}
.chat-header-left { display: flex; align-items: center; gap: 12rpx; }
.chat-header-icon { font-size: 36rpx; }
.chat-header-title { font-size: 30rpx; font-weight: bold; }
.chat-header-right { display: flex; gap: 20rpx; }
.chat-header-btn { font-size: 26rpx; cursor: pointer; opacity: 0.85; }

/* 消息区 */
.chat-messages {
  flex: 1;
  padding: 20rpx;
  background: #F8FAFC;
  overflow-y: auto;
}
.chat-msg { margin-bottom: 24rpx; display: flex; }
.chat-msg-user { justify-content: flex-end; }
.chat-msg-assistant { justify-content: flex-start; }
.chat-msg-bubble {
  max-width: 85%;
  padding: 16rpx 24rpx;
  border-radius: 20rpx;
  font-size: 28rpx;
  line-height: 1.6;
}
.chat-bubble-user {
  background: linear-gradient(135deg, #2563EB, #1D4ED8);
  color: #fff;
  border-bottom-right-radius: 6rpx;
}
.chat-bubble-assistant {
  background: #FFFFFF;
  color: #1E293B;
  border: 1px solid #E2E8F0;
  border-bottom-left-radius: 6rpx;
}
.chat-msg-text { white-space: pre-wrap; word-break: break-word; }
.chat-typing { color: #94A3B8; font-style: italic; font-size: 26rpx; }

/* 快捷建议 */
.chat-suggestions { margin-top: 16rpx; display: flex; flex-wrap: wrap; gap: 12rpx; }
.chat-suggestion-item {
  padding: 8rpx 18rpx;
  background: #EEF2FF;
  color: #2563EB;
  border-radius: 30rpx;
  font-size: 24rpx;
  cursor: pointer;
}

/* 输入区 */
.chat-input-area {
  display: flex;
  align-items: center;
  padding: 16rpx 20rpx;
  border-top: 1px solid #E2E8F0;
  background: #FFFFFF;
  gap: 12rpx;
}
.chat-input {
  flex: 1;
  height: 72rpx;
  padding: 0 20rpx;
  background: #F1F5F9;
  border-radius: 36rpx;
  font-size: 28rpx;
}
.chat-send-btn {
  padding: 12rpx 28rpx;
  background: linear-gradient(135deg, #2563EB, #7C3AED);
  color: #fff;
  border-radius: 36rpx;
  font-size: 26rpx;
  font-weight: bold;
  cursor: pointer;
}
.chat-send-btn.disabled {
  opacity: 0.5;
}
</style>
