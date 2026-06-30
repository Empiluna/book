<template>
  <view class="page">
    <view class="glass block"><text class="h1">图书管理</text><text class="desc">图书增删改查、JSON导出、ES索引重建、同步Neo4j图谱。</text>
      <view class="toolbar"><input class="input" v-model="q" placeholder="搜索书名/作者/标签"/><button class="btn" @click="load">搜索</button><button class="ghost" @click="showForm=!showForm">{{showForm?'收起':'新增图书'}}</button><button class="ghost" @click="reindex">重建索引</button></view>
    </view>
    <view class="glass block" v-if="showForm"><text class="section">{{editingId?'编辑图书':'新增图书'}}</text>
      <input class="input full" v-model="form.title" placeholder="书名*"/><input class="input full" v-model="form.authorsText" placeholder="作者，多个用逗号分隔"/>
      <input class="input full" v-model="form.publisher" placeholder="出版社"/><input class="input full" v-model="form.isbn" placeholder="ISBN"/>
      <input class="input full" v-model="form.category" placeholder="分类"/><input class="input full" v-model="form.tagsText" placeholder="标签，多个用逗号分隔"/>
      <textarea class="textarea" v-model="form.description" placeholder="简介"></textarea>
      <view class="toolbar"><button class="btn" @click="saveBook">保存</button><button class="ghost" @click="resetForm">取消</button></view>
    </view>
    <view class="glass block"><view class="row head"><text>ID</text><text>书名</text><text>评分</text><text>操作</text></view>
      <view class="row" v-for="b in books" :key="b.id"><text>{{b.id}}</text><view><text class="strong">{{b.title}}</text><text class="muted">{{(b.authors||[]).join('、')}} · {{b.publisher}}</text></view><text>{{b.avg_rating}}</text><view><button class="mini" @click="edit(b)">编辑</button><button class="mini danger" @click="remove(b)">删除</button></view></view>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../api/request'
const q=ref(''); const books=ref([]); const showForm=ref(false); const editingId=ref(null)
const form=ref({title:'',authorsText:'',publisher:'',isbn:'',category:'',tagsText:'',description:''})
function payload(){return {title:form.value.title, authors:form.value.authorsText.split(/[,，]/).map(s=>s.trim()).filter(Boolean), publisher:form.value.publisher||null, isbn:form.value.isbn||null, category:form.value.category||null, tags:form.value.tagsText.split(/[,，]/).map(s=>s.trim()).filter(Boolean), description:form.value.description||null}}
async function load(){ const res=await request(q.value?`/books?q=${encodeURIComponent(q.value)}&limit=80`:'/books/admin/export-json'); books.value=res.items||[] }
function edit(b){ editingId.value=b.id; showForm.value=true; form.value={title:b.title,authorsText:(b.authors||[]).join('，'),publisher:b.publisher||'',isbn:b.isbn||'',category:b.category||'',tagsText:(b.tags||[]).join('，'),description:b.description||''} }
function resetForm(){ editingId.value=null; showForm.value=false; form.value={title:'',authorsText:'',publisher:'',isbn:'',category:'',tagsText:'',description:''} }
async function saveBook(){ if(editingId.value){ await request(`/books/admin/${editingId.value}`,{method:'PUT',data:payload()}) } else { await request('/books/admin',{method:'POST',data:payload()}) } uni.showToast({title:'已保存'}); resetForm(); load() }
async function remove(b){ uni.showModal({title:'确认删除',content:b.title,success:async r=>{ if(r.confirm){ await request(`/books/admin/${b.id}`,{method:'DELETE'}); load() } }}) }
async function reindex(){ const res=await request('/books/admin/reindex-search',{method:'POST'}); uni.showToast({title:`索引${res.indexed||0}本`}) }
onMounted(load)
</script>
<style scoped>
.page{padding:28rpx;background:#f6f7fb;min-height:100vh}.glass{background:#fff;border-radius:30rpx;box-shadow:0 22rpx 60rpx rgba(15,23,42,.08)}.block{padding:30rpx;margin-bottom:22rpx}.h1{font-size:44rpx;font-weight:900}.desc,.muted{display:block;color:#667085;font-size:24rpx;margin-top:8rpx}.toolbar{display:flex;gap:12rpx;flex-wrap:wrap;margin-top:18rpx}.input{background:#f8fafc;border-radius:18rpx;padding:18rpx}.full{display:block;margin:12rpx 0}.textarea{background:#f8fafc;border-radius:18rpx;padding:18rpx;width:100%;min-height:160rpx;box-sizing:border-box}.btn,.ghost,.mini{font-weight:800;border-radius:18rpx}.btn{background:#4f46e5;color:white}.ghost{background:#eef2ff;color:#3730a3}.mini{font-size:24rpx;background:#f1f5f9;color:#334155;margin:4rpx}.danger{background:#fee2e2;color:#b91c1c}.section{font-size:32rpx;font-weight:900}.row{display:grid;grid-template-columns:70rpx 1.8fr 90rpx 180rpx;gap:12rpx;align-items:center;padding:18rpx 0;border-bottom:1rpx solid #eef2f7}.head{font-weight:900;color:#475467}.strong{display:block;font-weight:900}
</style>
