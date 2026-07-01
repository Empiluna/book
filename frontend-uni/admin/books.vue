<template>
  <view class="page">
    <view class="panel block">
      <view class="heading">
        <view>
          <text class="h1">图书管理</text>
          <text class="desc">维护图书资料、购书链接、搜索索引和 JSON 数据。</text>
        </view>
        <text class="count">{{ total }} 本</text>
      </view>
      <view class="toolbar">
        <input class="input grow" v-model="q" placeholder="搜索书名、作者、标签" confirm-type="search" @confirm="load" />
        <button class="btn" :disabled="loading" @click="load">搜索</button>
        <button class="ghost" @click="toggleForm">{{ showForm ? '收起' : '新增图书' }}</button>
        <button class="ghost" @click="exportJson">导出 JSON</button>
        <button class="ghost" :disabled="loading" @click="reindex">重建索引</button>
      </view>
    </view>

    <view class="panel block" v-if="showForm">
      <text class="section">{{ editingId ? '编辑图书' : '新增图书' }}</text>
      <view class="formgrid">
        <input class="input" v-model="form.title" placeholder="书名*" />
        <input class="input" v-model="form.subtitle" placeholder="副标题" />
        <input class="input" v-model="form.authorsText" placeholder="作者，多个用逗号分隔" />
        <input class="input" v-model="form.publisher" placeholder="出版社" />
        <input class="input" v-model="form.series" placeholder="系列" />
        <input class="input" v-model="form.isbn" placeholder="ISBN" />
        <input class="input" v-model="form.category" placeholder="分类" />
        <input class="input" v-model="form.tagsText" placeholder="标签，多个用逗号分隔" />
        <input class="input" v-model="form.difficulty" placeholder="难度" />
        <input class="input" v-model="form.publication_year" type="number" placeholder="出版年份" />
        <input class="input" v-model="form.page_count" type="number" placeholder="页数" />
        <input class="input" v-model="form.cover_url" placeholder="封面 URL" />
        <input class="input wide" v-model="form.ebook_pdf_url" placeholder="PDF 试读 URL" />
        <input class="input wide" v-model="form.ebook_epub_url" placeholder="EPUB 试读 URL" />
      </view>
      <textarea class="textarea" v-model="form.description" placeholder="简介"></textarea>
      <textarea class="textarea" v-model="form.trial_text" placeholder="试读文本"></textarea>
      <label class="check"><checkbox :checked="form.is_new" @click="form.is_new = !form.is_new" /> 新书推荐</label>
      <view class="toolbar">
        <button class="btn" :disabled="saving" @click="saveBook">{{ saving ? '保存中' : '保存' }}</button>
        <button class="ghost" @click="resetForm">取消</button>
      </view>
    </view>

    <view class="panel block" v-if="linkBook">
      <view class="heading">
        <view>
          <text class="section">购书链接</text>
          <text class="desc">{{ linkBook.title }}</text>
        </view>
        <button class="mini" @click="closeLinks">关闭</button>
      </view>
      <view class="formgrid compact">
        <input class="input" v-model="linkForm.platform" placeholder="平台，如京东/当当" />
        <input class="input" v-model="linkForm.url" placeholder="购买链接 URL" />
        <input class="input" v-model="linkForm.price" type="number" placeholder="价格" />
        <button class="btn" @click="saveLink">{{ editingLinkId ? '更新链接' : '新增链接' }}</button>
      </view>
      <view class="linkrow head"><text>平台</text><text>价格</text><text>状态</text><text>操作</text></view>
      <view class="linkrow" v-for="link in linkBook.purchase_links || []" :key="link.id">
        <text>{{ link.platform }}</text>
        <text>{{ link.price == null ? '-' : '¥' + link.price }}</text>
        <text :class="link.is_active ? 'ok' : 'bad'">{{ link.is_active ? '启用' : '停用' }}</text>
        <view class="ops">
          <button class="mini" @click="editLink(link)">编辑</button>
          <button class="mini danger" @click="removeLink(link)">停用</button>
        </view>
      </view>
      <view class="empty" v-if="!(linkBook.purchase_links || []).length">暂无购书链接</view>
    </view>

    <view class="panel block">
      <view class="row head"><text>ID</text><text>图书</text><text>评分</text><text>链接</text><text>操作</text></view>
      <view class="row" v-for="b in books" :key="b.id">
        <text>{{ b.id }}</text>
        <view class="book">
          <text class="strong">{{ b.title }}</text>
          <text class="muted">{{ (b.authors || []).join('、') || '未知作者' }} · {{ b.publisher || '未知出版社' }}</text>
        </view>
        <text>{{ b.avg_rating || 0 }}</text>
        <text>{{ (b.purchase_links || []).length }}</text>
        <view class="ops">
          <button class="mini" @click="edit(b)">编辑</button>
          <button class="mini" @click="openLinks(b)">购书</button>
          <button class="mini danger" @click="remove(b)">删除</button>
        </view>
      </view>
      <view class="empty" v-if="!books.length">{{ loading ? '加载中...' : '暂无图书数据' }}</view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { request } from '../api/request'
import { requireAdminPage } from '../utils/admin'

const q = ref('')
const books = ref([])
const total = ref(0)
const loading = ref(false)
const saving = ref(false)
const showForm = ref(false)
const editingId = ref(null)
const linkBook = ref(null)
const editingLinkId = ref(null)

const blankForm = () => ({
  title: '',
  subtitle: '',
  authorsText: '',
  publisher: '',
  series: '',
  isbn: '',
  category: '',
  tagsText: '',
  difficulty: '大众',
  publication_year: '',
  page_count: '240',
  cover_url: '',
  ebook_pdf_url: '',
  ebook_epub_url: '',
  description: '',
  trial_text: '',
  is_new: false
})

const blankLink = () => ({ platform: '', url: '', price: '' })
const form = ref(blankForm())
const linkForm = ref(blankLink())

const exportableBooks = computed(() => books.value.map((book) => ({
  title: book.title,
  subtitle: book.subtitle,
  isbn: book.isbn,
  authors: book.authors || [],
  publisher: book.publisher,
  series: book.series,
  publication_year: book.publication_year,
  category: book.category,
  tags: book.tags || [],
  difficulty: book.difficulty,
  description: book.description,
  trial_text: book.trial_text,
  cover_url: book.cover_url,
  ebook_pdf_url: book.ebook_pdf_url,
  ebook_epub_url: book.ebook_epub_url,
  page_count: book.page_count,
  is_new: book.is_new
})))

function splitList(value) {
  return String(value || '').split(/[,，]/).map((item) => item.trim()).filter(Boolean)
}

function nullable(value) {
  const text = String(value ?? '').trim()
  return text ? text : null
}

function numeric(value) {
  const text = String(value ?? '').trim()
  return text ? Number(text) : null
}

function payload() {
  return {
    title: form.value.title.trim(),
    subtitle: nullable(form.value.subtitle),
    authors: splitList(form.value.authorsText),
    publisher: nullable(form.value.publisher),
    series: nullable(form.value.series),
    isbn: nullable(form.value.isbn),
    category: nullable(form.value.category),
    tags: splitList(form.value.tagsText),
    difficulty: nullable(form.value.difficulty),
    publication_year: numeric(form.value.publication_year),
    page_count: Number(form.value.page_count || 240),
    cover_url: nullable(form.value.cover_url),
    ebook_pdf_url: nullable(form.value.ebook_pdf_url),
    ebook_epub_url: nullable(form.value.ebook_epub_url),
    description: nullable(form.value.description),
    trial_text: nullable(form.value.trial_text),
    is_new: Boolean(form.value.is_new)
  }
}

async function load() {
  loading.value = true
  try {
    const path = q.value ? `/books?q=${encodeURIComponent(q.value)}&limit=80` : '/books/admin/export-json'
    const res = await request(path)
    books.value = res.items || []
    total.value = res.total ?? books.value.length
    if (linkBook.value) {
      linkBook.value = books.value.find((item) => item.id === linkBook.value.id) || null
    }
  } catch (e) {
    uni.showToast({ title: e?.detail || '加载图书失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}

function toggleForm() {
  showForm.value = !showForm.value
  if (!showForm.value) resetForm()
}

function edit(book) {
  editingId.value = book.id
  showForm.value = true
  form.value = {
    title: book.title || '',
    subtitle: book.subtitle || '',
    authorsText: (book.authors || []).join('，'),
    publisher: book.publisher || '',
    series: book.series || '',
    isbn: book.isbn || '',
    category: book.category || '',
    tagsText: (book.tags || []).join('，'),
    difficulty: book.difficulty || '',
    publication_year: book.publication_year ? String(book.publication_year) : '',
    page_count: book.page_count ? String(book.page_count) : '240',
    cover_url: book.cover_url || '',
    ebook_pdf_url: book.ebook_pdf_url || '',
    ebook_epub_url: book.ebook_epub_url || '',
    description: book.description || '',
    trial_text: book.trial_text || '',
    is_new: Boolean(book.is_new)
  }
}

function resetForm() {
  editingId.value = null
  showForm.value = false
  form.value = blankForm()
}

async function saveBook() {
  if (!form.value.title.trim()) {
    uni.showToast({ title: '请填写书名', icon: 'none' })
    return
  }
  saving.value = true
  try {
    if (editingId.value) {
      await request(`/books/admin/${editingId.value}`, { method: 'PUT', data: payload() })
    } else {
      await request('/books/admin', { method: 'POST', data: payload() })
    }
    uni.showToast({ title: '已保存' })
    resetForm()
    await load()
  } catch (e) {
    uni.showToast({ title: e?.detail || '保存失败', icon: 'none' })
  } finally {
    saving.value = false
  }
}

function remove(book) {
  uni.showModal({
    title: '确认删除',
    content: book.title,
    success: async (res) => {
      if (!res.confirm) return
      try {
        await request(`/books/admin/${book.id}`, { method: 'DELETE' })
        uni.showToast({ title: '已删除' })
        await load()
      } catch (e) {
        uni.showToast({ title: e?.detail || '删除失败', icon: 'none' })
      }
    }
  })
}

function openLinks(book) {
  linkBook.value = book
  editingLinkId.value = null
  linkForm.value = blankLink()
}

function closeLinks() {
  linkBook.value = null
  editingLinkId.value = null
  linkForm.value = blankLink()
}

function editLink(link) {
  editingLinkId.value = link.id
  linkForm.value = {
    platform: link.platform || '',
    url: link.url || '',
    price: link.price == null ? '' : String(link.price)
  }
}

async function saveLink() {
  if (!linkBook.value || !linkForm.value.platform.trim() || !linkForm.value.url.trim()) {
    uni.showToast({ title: '请填写平台和链接', icon: 'none' })
    return
  }
  const data = {
    book_id: linkBook.value.id,
    platform: linkForm.value.platform.trim(),
    url: linkForm.value.url.trim(),
    price: numeric(linkForm.value.price),
    is_active: true
  }
  try {
    if (editingLinkId.value) {
      await request(`/ecosystem/purchase-links/${editingLinkId.value}`, { method: 'PUT', data })
    } else {
      await request('/ecosystem/purchase-links', { method: 'POST', data })
    }
    uni.showToast({ title: '链接已保存' })
    editingLinkId.value = null
    linkForm.value = blankLink()
    await load()
  } catch (e) {
    uni.showToast({ title: e?.detail || '链接保存失败', icon: 'none' })
  }
}

function removeLink(link) {
  uni.showModal({
    title: '停用购书链接',
    content: link.platform,
    success: async (res) => {
      if (!res.confirm) return
      try {
        await request(`/ecosystem/purchase-links/${link.id}`, { method: 'DELETE' })
        uni.showToast({ title: '已停用' })
        await load()
      } catch (e) {
        uni.showToast({ title: e?.detail || '停用失败', icon: 'none' })
      }
    }
  })
}

function exportJson() {
  uni.setClipboardData({
    data: JSON.stringify(exportableBooks.value, null, 2),
    success: () => uni.showToast({ title: 'JSON 已复制' })
  })
}

async function reindex() {
  try {
    const res = await request('/books/admin/reindex-search', { method: 'POST' })
    uni.showToast({ title: `索引 ${res.indexed || 0} 本` })
  } catch (e) {
    uni.showToast({ title: e?.detail || '重建失败', icon: 'none' })
  }
}

onShow(() => { if (requireAdminPage()) load() })
</script>

<style scoped>
.page{padding:28rpx;background:#f6f7fb;min-height:100vh;box-sizing:border-box}
.panel{background:#fff;border-radius:22rpx;box-shadow:0 18rpx 44rpx rgba(15,23,42,.08)}
.block{padding:30rpx;margin-bottom:22rpx}
.heading{display:flex;align-items:flex-start;justify-content:space-between;gap:18rpx}
.h1{display:block;font-size:42rpx;font-weight:900;color:#111827}
.desc,.muted{display:block;color:#667085;font-size:24rpx;margin-top:8rpx;line-height:1.6}
.count{flex:0 0 auto;background:#eff6ff;color:#1d4ed8;border-radius:999rpx;padding:8rpx 18rpx;font-size:24rpx;font-weight:800}
.toolbar{display:flex;gap:12rpx;flex-wrap:wrap;margin-top:18rpx;align-items:center}
.formgrid{display:grid;grid-template-columns:1fr 1fr;gap:14rpx;margin-top:18rpx}
.formgrid.compact{grid-template-columns:1fr 1.6fr 180rpx 180rpx}
.input{background:#f8fafc;border-radius:16rpx;padding:18rpx;box-sizing:border-box;min-width:0}
.grow{flex:1;min-width:260rpx}
.wide{grid-column:span 2}
.textarea{background:#f8fafc;border-radius:16rpx;padding:18rpx;width:100%;min-height:150rpx;box-sizing:border-box;margin-top:14rpx}
.check{display:flex;align-items:center;gap:8rpx;color:#334155;margin-top:14rpx;font-size:26rpx}
.btn,.ghost,.mini{font-weight:800;border-radius:16rpx}
.btn{background:#2563eb;color:white}
.ghost{background:#eef2ff;color:#1d4ed8}
.mini{font-size:24rpx;background:#f1f5f9;color:#334155;margin:4rpx;padding:0 16rpx}
.danger{background:#fee2e2;color:#b91c1c}
.section{display:block;font-size:30rpx;font-weight:900;color:#111827}
.row{display:grid;grid-template-columns:70rpx 1.8fr 90rpx 80rpx 260rpx;gap:12rpx;align-items:center;padding:18rpx 0;border-bottom:1rpx solid #eef2f7}
.linkrow{display:grid;grid-template-columns:1fr 120rpx 110rpx 190rpx;gap:12rpx;align-items:center;padding:16rpx 0;border-bottom:1rpx solid #eef2f7}
.head{font-weight:900;color:#475467}
.strong{display:block;font-weight:900;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.book{min-width:0}
.ops{display:flex;flex-wrap:wrap}
.ok{color:#16a34a;font-weight:900}
.bad{color:#dc2626;font-weight:900}
.empty{color:#98a2b3;text-align:center;padding:28rpx}
button[disabled]{opacity:.55}
@media (max-width: 700px){
  .formgrid,.formgrid.compact{grid-template-columns:1fr}
  .wide{grid-column:span 1}
  .row{grid-template-columns:60rpx 1fr 70rpx;align-items:start}
  .row > text:nth-child(4),.row > .ops{grid-column:2 / 4}
  .linkrow{grid-template-columns:1fr 100rpx}
}
</style>
