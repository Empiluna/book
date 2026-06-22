<template>
  <!--
    comment-list.vue — 评论区组件 — 负责人: D (模块四)
    列表渲染、发表评论、点赞、置顶、删除
  -->
  <view class="comment-section">
    <!-- 评论输入框 -->
    <view v-if="store.isLoggedIn" class="comment-form card">
      <textarea v-model="commentText" placeholder="写下你对这本书的看法..." maxlength="500" />
      <button class="btn-primary btn-sm" @click="submitComment" :disabled="!commentText.trim()">
        发布评论
      </button>
    </view>
    <view v-else class="card text-center">
      <text>登录后即可发表评论</text>
      <navigator url="/pages/login/login" class="nav-link">去登录</navigator>
    </view>

    <!-- 评论列表 -->
    <view v-if="comments.length === 0" class="empty-state">
      <text>暂无评论，来说两句吧</text>
    </view>
    <view v-for="c in comments" :key="c.id" :class="['comment-item', c.is_pinned ? 'pinned' : '']">
      <view class="comment-header">
        <text class="comment-user">{{ c.username || '用户' + c.user_id }}</text>
        <text class="comment-time">{{ formatTime(c.created_at) }}</text>
        <text v-if="c.is_pinned" class="pin-badge">📌 置顶</text>
      </view>
      <view class="comment-body">{{ c.content }}</view>
      <view class="comment-actions">
        <text @click="toggleLike(c)">👍 {{ c.likes_count || 0 }}</text>
        <text v-if="store.userInfo && store.userInfo.is_admin" @click="togglePin(c)">{{ c.is_pinned ? '取消置顶' : '📌 置顶' }}</text>
        <text v-if="store.userInfo && store.userInfo.is_admin" class="btn-del" @click="doDelete(c)">🗑 删除</text>
      </view>
    </view>
  </view>
</template>

<script>
import { store } from '../store/index.js';
import { api } from '../api/index.js';

export default {
  name: 'CommentList',
  props: {
    bookId: { type: Number, required: true },
    initialComments: { type: Array, default: () => [] },
  },
  data() {
    return {
      store,
      comments: this.initialComments,
      commentText: '',
    };
  },
  watch: {
    initialComments(val) { this.comments = val; },
  },
  methods: {
    formatTime(t) {
      if (!t) return '';
      const d = new Date(t);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    },
    async submitComment() {
      try {
        await api.ecosystem.createComment({ book_id: this.bookId, content: this.commentText });
        uni.showToast({ title: '评论发布成功', icon: 'success' });
        this.commentText = '';
        this.loadComments();
      } catch (err) {
        uni.showToast({ title: err.message, icon: 'none' });
      }
    },
    async toggleLike(comment) {
      try {
        const res = await api.ecosystem.likeComment({ comment_id: comment.id });
        uni.showToast({ title: res.liked ? '已点赞' : '已取消', icon: 'none' });
        this.loadComments();
      } catch (err) {
        uni.showToast({ title: err.message, icon: 'none' });
      }
    },
    async togglePin(comment) {
      try {
        await api.ecosystem.pinComment(comment.id, !comment.is_pinned);
        uni.showToast({ title: '操作成功', icon: 'success' });
        this.loadComments();
      } catch (err) {
        uni.showToast({ title: err.message, icon: 'none' });
      }
    },
    async doDelete(comment) {
      const res = await uni.showModal({ title: '确认删除', content: '确定删除这条评论吗？' });
      if (!res.confirm) return;
      try {
        await api.ecosystem.deleteComment(comment.id);
        uni.showToast({ title: '已删除', icon: 'success' });
        this.loadComments();
      } catch (err) {
        uni.showToast({ title: err.message, icon: 'none' });
      }
    },
    async loadComments() {
      try {
        const data = await api.ecosystem.getComments(this.bookId);
        this.comments = data || [];
      } catch { /* ignore */ }
    },
  },
};
</script>

<style scoped>
.comment-form { margin: 24rpx; }
.comment-form textarea {
  width: 100%;
  height: 140rpx;
  border: 2rpx solid #e2e8f0;
  border-radius: 12rpx;
  padding: 16rpx;
  font-size: 26rpx;
  margin-bottom: 16rpx;
}
.comment-item {
  background: #fff;
  margin: 0 24rpx 16rpx;
  padding: 24rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.comment-item.pinned {
  border-left: 6rpx solid #f59e0b;
  background: #fffbeb;
}
.comment-header { display: flex; align-items: center; gap: 12rpx; margin-bottom: 12rpx; }
.comment-user { font-weight: 600; font-size: 26rpx; }
.comment-time { font-size: 22rpx; color: #94a3b8; }
.pin-badge { font-size: 20rpx; color: #f59e0b; }
.comment-body { font-size: 28rpx; line-height: 1.6; color: #334155; }
.comment-actions { display: flex; gap: 32rpx; margin-top: 16rpx; }
.comment-actions text { font-size: 24rpx; color: #64748b; }
.btn-del { color: #ef4444 !important; }
.empty-state { text-align: center; padding: 60rpx; color: #94a3b8; }
.nav-link { color: #2563eb; margin-left: 8rpx; }
</style>
