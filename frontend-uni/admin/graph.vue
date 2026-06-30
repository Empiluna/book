<template>
  <view class="page">
    <view class="glass block"><text class="h1">知识图谱管理</text><text class="desc">Neo4j约束初始化、MySQL同步、实体关系写入、Cypher控制台。</text>
      <view class="toolbar"><button class="btn" @click="load">刷新统计</button><button class="ghost" @click="initGraph">初始化约束</button><button class="ghost" @click="syncGraph">同步MySQL</button></view>
    </view>
    <view class="grid"><view class="stat" v-for="s in statsList" :key="s.label"><text class="num">{{s.value}}</text><text>{{s.label}}</text></view></view>
    <view class="glass block"><text class="section">创建关系</text><view class="two"><input class="input" v-model="rel.source_id" placeholder="源ID"/><input class="input" v-model="rel.target_id" placeholder="目标ID"/></view><view class="two"><input class="input" v-model="rel.relation_type" placeholder="关系 AUTHORED_BY"/><input class="input" v-model="rel.weight" placeholder="权重"/></view><button class="btn" @click="createRelation">创建关系</button></view>
    <view class="glass block"><text class="section">Cypher 控制台</text><textarea class="textarea" v-model="cypher" placeholder="MATCH (n) RETURN n LIMIT 10"></textarea><button class="btn" @click="runCypher">执行</button><scroll-view scroll-y class="result"><text>{{ result }}</text></scroll-view></view>
  </view>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { request } from '../api/request'
const stats=ref({}); const cypher=ref('MATCH (n) RETURN n LIMIT 10'); const result=ref('')
const rel=ref({source_id:'1', target_id:'2', relation_type:'SIMILAR_TO', weight:'0.7'})
const statsList=computed(()=>[{label:'节点数',value:stats.value.nodes||stats.value.node_count||0},{label:'关系数',value:stats.value.relations||stats.value.relationship_count||0},{label:'后端',value:stats.value.backend||'-'},{label:'状态',value:stats.value.message||'就绪'}])
async function load(){ stats.value=await request('/graph/stats') }
async function initGraph(){ result.value=JSON.stringify(await request('/graph/admin/init',{method:'POST'}),null,2); load() }
async function syncGraph(){ result.value=JSON.stringify(await request('/graph/admin/sync',{method:'POST'}),null,2); load() }
async function runCypher(){ result.value=JSON.stringify(await request('/graph/admin/cypher',{method:'POST',data:{cypher:cypher.value,params:{}}}),null,2) }
async function createRelation(){ result.value=JSON.stringify(await request('/graph/admin/relations',{method:'POST',data:{source_type:'Book',source_id:Number(rel.value.source_id),relation_type:rel.value.relation_type,target_type:'Book',target_id:Number(rel.value.target_id),weight:Number(rel.value.weight||1)}}),null,2); load() }
onMounted(load)
</script>
<style scoped>.page{padding:28rpx;background:#f6f7fb;min-height:100vh}.glass{background:#fff;border-radius:30rpx;box-shadow:0 22rpx 60rpx rgba(15,23,42,.08)}.block{padding:30rpx;margin-bottom:22rpx}.h1{font-size:44rpx;font-weight:900}.desc{display:block;color:#667085;font-size:24rpx;margin-top:8rpx}.toolbar{display:flex;gap:12rpx;flex-wrap:wrap;margin-top:18rpx}.btn,.ghost{font-weight:800;border-radius:18rpx}.btn{background:#4f46e5;color:white}.ghost{background:#eef2ff;color:#3730a3}.grid{display:grid;grid-template-columns:1fr 1fr;gap:18rpx;margin-bottom:22rpx}.stat{background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:26rpx;color:white;padding:26rpx}.num{display:block;font-size:38rpx;font-weight:900}.section{font-weight:900;font-size:32rpx}.two{display:grid;grid-template-columns:1fr 1fr;gap:14rpx;margin:14rpx 0}.input,.textarea{background:#f8fafc;border-radius:18rpx;padding:18rpx}.textarea{width:100%;min-height:160rpx;box-sizing:border-box}.result{height:260rpx;background:#0f172a;color:#e2e8f0;border-radius:20rpx;padding:18rpx;margin-top:18rpx;font-size:22rpx;white-space:pre-wrap}</style>
