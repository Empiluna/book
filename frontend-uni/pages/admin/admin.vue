<template>
  <view class="container">
    <view class="card">
      <text class="title">移动端管理后台</text>
      <text class="muted">提供数据总览、用户、评论、推荐权重和图谱同步等常用管理功能。复杂图书编辑仍建议使用网页后台。</text>
      <button class="btn" @click="load">刷新数据</button>
    </view>

    <view v-if="!admin" class="card">
      <text class="muted">当前账号不是管理员，请使用管理员账号登录后查看。</text>
      <button class="btn" @click="goLogin">去登录</button>
    </view>

    <view v-if="error" class="card"><text class="muted">{{ error }}</text></view>

    <view v-if="admin && dashboard" class="card">
      <text class="title">数据总览</text>
      <view class="stat-grid">
        <view class="stat-item"><text class="stat-num">{{ d('users') }}</text><text class="muted">用户</text></view>
        <view class="stat-item"><text class="stat-num">{{ d('books') }}</text><text class="muted">图书</text></view>
        <view class="stat-item"><text class="stat-num">{{ d('comments') }}</text><text class="muted">评论</text></view>
        <view class="stat-item"><text class="stat-num">{{ d('feedbacks') }}</text><text class="muted">反馈</text></view>
      </view>
    </view>

    <view v-if="admin" class="card">
      <text class="title">快捷操作</text>
      <button class="btn" @click="syncGraph">同步知识图谱</button>
      <button class="btn secondary" @click="precompute">预计算 ItemCF</button>
      <button class="btn secondary" @click="openWebAdmin">打开网页后台地址</button>
    </view>

    <view v-if="admin" class="card">
      <text class="title">用户管理</text>
      <view class="search-row"><input class="input" v-model="userQ" placeholder="搜索用户" /><button class="btn small" @click="loadUsers">搜索</button></view>
      <view class="user" v-for="u in users" :key="u.id">
        <text class="user-name">{{ u.username }} · {{ u.is_admin ? '管理员' : '用户' }}</text>
        <text class="muted">{{ u.email || '' }} · {{ u.is_active ? '启用' : '禁用' }}</text>
        <view class="row-actions"><button class="btn secondary small" @click="toggleUser(u)">{{ u.is_active ? '禁用' : '启用' }}</button><button class="btn secondary small" @click="toggleRole(u)">{{ u.is_admin ? '转用户' : '设管理员' }}</button></view>
      </view>
    </view>

    <view v-if="admin" class="card">
      <text class="title">评论管理</text>
      <view class="comment" v-for="c in comments" :key="c.id">
        <text class="comment-title">{{ c.book_title || '图书' }} · {{ c.nickname || c.username }}</text>
        <text class="muted">{{ c.content }}</text>
        <view class="row-actions"><button class="btn secondary small" @click="pinComment(c)">置顶/取消</button><button class="btn danger small" @click="deleteComment(c)">删除</button></view>
      </view>
    </view>
  </view>
</template>
<script>
import { request, getUser, isAdmin, ORIGIN, showError } from '../../api/request.js'
export default {
  data: function () { return { admin: false, dashboard: null, users: [], comments: [], userQ: '', error: '' } },
  onShow: function () { this.admin = isAdmin(); if (this.admin) this.load() },
  methods: {
    d: function (key) { return (this.dashboard && ((this.dashboard.cards && this.dashboard.cards[key]) || this.dashboard[key] || this.dashboard[key + '_count'])) || 0 },
    load: function () {
      const that = this; that.error = ''
      if (!isAdmin()) { that.admin = false; return }
      that.admin = true
      Promise.all([request('/admin/dashboard'), request('/admin/users'), request('/ecosystem/admin/comments?limit=20')]).then(function (res) {
        that.dashboard = res[0] || {}
        that.users = (res[1] && res[1].items) || []
        that.comments = (res[2] && res[2].items) || []
      }).catch(function (e) { that.error = e.message || '管理数据加载失败' })
    },
    loadUsers: function () { const that = this; request('/admin/users' + (that.userQ ? '?q=' + encodeURIComponent(that.userQ) : '')).then(function (res) { that.users = (res && res.items) || [] }).catch(function (e) { showError(e, '用户加载失败') }) },
    toggleUser: function (u) { const that = this; request('/admin/users/' + u.id + '/status', { method: 'PUT', data: { is_active: !u.is_active } }).then(function () { that.loadUsers() }).catch(function (e) { showError(e, '操作失败') }) },
    toggleRole: function (u) { const that = this; request('/admin/users/' + u.id + '/role', { method: 'PUT', data: { is_admin: !u.is_admin } }).then(function () { that.loadUsers() }).catch(function (e) { showError(e, '操作失败') }) },
    pinComment: function (c) { const that = this; request('/ecosystem/admin/comments/' + c.id + '/pin', { method: 'POST' }).then(function () { that.load() }).catch(function (e) { showError(e, '操作失败') }) },
    deleteComment: function (c) { const that = this; uni.showModal({ title: '确认删除', content: '确定删除这条评论吗？', success: function (res) { if (res.confirm) request('/ecosystem/admin/comments/' + c.id, { method: 'DELETE' }).then(function () { that.load() }).catch(function (e) { showError(e, '删除失败') }) } }) },
    syncGraph: function () { request('/graph/admin/sync', { method: 'POST' }).then(function () { uni.showToast({ title: '已同步' }) }).catch(function (e) { showError(e, '同步失败') }) },
    precompute: function () { request('/recommend/admin/precompute-itemcf', { method: 'POST' }).then(function () { uni.showToast({ title: '已完成' }) }).catch(function (e) { showError(e, '操作失败') }) },
    goLogin: function () { uni.navigateTo({ url: '/pages/login/login' }) },
    openWebAdmin: function () { uni.showModal({ title: '网页后台地址', content: ORIGIN + '/admin', showCancel: false }) }
  }
}
</script>
<style scoped>
.search-row{display:flex;gap:12rpx;margin-bottom:18rpx}.search-row .input{flex:1}.user,.comment{padding:18rpx 0;border-bottom:1rpx solid #eef2f7}.user-name,.comment-title{display:block;font-size:28rpx;color:#111827;font-weight:900;margin-bottom:8rpx}.row-actions{display:flex;gap:12rpx;margin-top:12rpx}.row-actions .btn{flex:1}
</style>
