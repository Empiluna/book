<template>
  <!--
    admin.vue — 管理后台
    负责人: B (图谱管理) + D (购书链接)
    路由: pages/admin/admin
  -->
  <view class="page">
    <view class="header">
      <text class="title">⚙️ 管理后台</text>
    </view>

    <!-- Tab 切换 -->
    <view class="tabs">
      <text :class="['tab', activeTab === 'graph' ? 'active' : '']" @click="activeTab = 'graph'">🕸️ 图谱</text>
      <text :class="['tab', activeTab === 'purchase' ? 'active' : '']" @click="activeTab = 'purchase'">🛒 购书</text>
    </view>

    <!-- 图谱管理 (B) -->
    <view v-if="activeTab === 'graph'" class="content">
      <view class="stats-row">
        <view class="stat">
          <text class="num">{{ graphStats.books || 0 }}</text>
          <text class="lbl">图书</text>
        </view>
        <view class="stat">
          <text class="num">{{ graphStats.authors || 0 }}</text>
          <text class="lbl">作者</text>
        </view>
        <view class="stat">
          <text class="num">{{ graphStats.tags || 0 }}</text>
          <text class="lbl">标签</text>
        </view>
        <view class="stat">
          <text class="num">{{ graphStats.relations || 0 }}</text>
          <text class="lbl">关系</text>
        </view>
      </view>
      <button class="btn-primary" style="margin-top:32rpx;" @click="initGraph">初始化图谱约束</button>
      <text class="hint">首次启动时执行，重复执行无副作用</text>

      <view class="tip-box">
        <text class="tip-title">📋 批量导入数据</text>
        <text class="tip-text">后端执行: python scripts/import_books.py</text>
        <text class="tip-text">Neo4j Browser: http://localhost:7474</text>
      </view>
    </view>

    <!-- 购书链接管理 (D) -->
    <view v-if="activeTab === 'purchase'" class="content">
      <view class="form-group">
        <text class="label">图书 ID</text>
        <input v-model="purchaseForm.bookId" class="input" type="number" placeholder="输入图书ID" />
      </view>
      <view class="form-group">
        <text class="label">京东链接</text>
        <input v-model="purchaseForm.url_jd" class="input" placeholder="https://item.jd.com/..." />
      </view>
      <view class="form-group">
        <text class="label">当当链接</text>
        <input v-model="purchaseForm.url_dd" class="input" placeholder="https://product.dangdang.com/..." />
      </view>
      <view class="form-group">
        <text class="label">淘宝链接</text>
        <input v-model="purchaseForm.url_tb" class="input" placeholder="https://item.taobao.com/..." />
      </view>
      <button class="btn-primary" @click="savePurchase">保存购书链接</button>
    </view>
  </view>

  <!-- 管理员智能助手悬浮按钮 -->
  <chat-widget mode="admin" />
</template>

<script>
import { api } from '../../api/index.js';

export default {
  data() {
    return {
      activeTab: 'graph',
      graphStats: {},
      purchaseForm: { bookId: '', url_jd: '', url_dd: '', url_tb: '' },
    };
  },
  onShow() {
    this.loadGraphStats();
  },
  methods: {
    async loadGraphStats() {
      try { this.graphStats = await api.graph.getStats(); } catch { /* */ }
    },
    async initGraph() {
      try {
        await api.graph.initConstraints();
        uni.showToast({ title: '图谱约束已创建', icon: 'success' });
      } catch (err) { uni.showToast({ title: err.message, icon: 'none' }); }
    },
    async savePurchase() {
      if (!this.purchaseForm.bookId) {
        uni.showToast({ title: '请输入图书ID', icon: 'none' }); return;
      }
      try {
        await api.ecosystem.updatePurchaseLinks(this.purchaseForm);
        uni.showToast({ title: '购书链接已保存', icon: 'success' });
      } catch (err) { uni.showToast({ title: err.message, icon: 'none' }); }
    },
  },
};
</script>

<style scoped>
.page { padding-bottom: 40rpx; }
.header { padding: 32rpx 24rpx; background: #fff; border-bottom: 2rpx solid #f1f5f9; }
.title { font-size: 34rpx; font-weight: 700; }
.tabs { display: flex; background: #fff; padding: 0 24rpx; border-bottom: 2rpx solid #e2e8f0; }
.tab {
  padding: 20rpx 32rpx;
  font-size: 28rpx;
  color: #64748b;
  border-bottom: 4rpx solid transparent;
  margin-bottom: -2rpx;
}
.tab.active { color: #2563eb; border-bottom-color: #2563eb; font-weight: 600; }
.content { padding: 24rpx; }
.stats-row { display: flex; gap: 16rpx; }
.stat {
  flex: 1; text-align: center;
  background: #fff; border-radius: 16rpx;
  padding: 32rpx 0; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.stat .num { font-size: 44rpx; font-weight: 700; color: #2563eb; display: block; }
.stat .lbl { font-size: 22rpx; color: #94a3b8; }
.hint { font-size: 22rpx; color: #94a3b8; display: block; margin-top: 12rpx; text-align: center; }
.tip-box {
  background: #f0f9ff; border: 2rpx solid #bae6fd; border-radius: 16rpx;
  padding: 24rpx; margin-top: 32rpx;
}
.tip-title { font-weight: 600; display: block; margin-bottom: 8rpx; }
.tip-text { font-size: 24rpx; color: #64748b; display: block; margin-top: 4rpx; }
.form-group { margin-bottom: 24rpx; }
.label { font-size: 26rpx; font-weight: 600; display: block; margin-bottom: 8rpx; }
.input {
  width: 100%; height: 72rpx;
  border: 2rpx solid #e2e8f0; border-radius: 12rpx;
  padding: 0 20rpx; font-size: 26rpx;
}
</style>
