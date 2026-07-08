const API = '/api/v1';
let token = localStorage.getItem('token') || '';
let currentUser = JSON.parse(localStorage.getItem('user') || 'null');
let lastAdminDashboard = null;
let lastAdminGraphStats = null;
let adminBookPage = 1;
const adminBookPageSize = 20;

function $(id){ return document.getElementById(id); }
function headers(){ return token ? {'Authorization': `Bearer ${token}`, 'Content-Type':'application/json'} : {'Content-Type':'application/json'}; }
function isAdmin(){ return !!(currentUser && currentUser.is_admin); }
function toast(msg){ const el=document.createElement('div'); el.className='toast'; el.textContent=msg; document.body.appendChild(el); setTimeout(()=>el.remove(),2600); }
function attr(value){ return String(value ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function html(value){ return String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function stat(label, value){ return `<div class="stat"><b>${value}</b><span>${label}</span></div>`; }
function adminSplit(value){ return String(value||'').split(/[,，、]/).map(x=>x.trim()).filter(Boolean); }
function adminJson(data){ return JSON.stringify(data, null, 2); }
const adminMetricLabels = {
  books:'图书',
  users:'用户',
  comments:'评论',
  ratings:'评分',
  bookmarks:'收藏',
  searches:'搜索',
  chat_messages:'问答',
  purchase_clicks:'购书点击',
  authors:'作者',
  tags:'标签',
  publishers:'出版社',
  series:'系列',
  semantic_nodes:'语义节点',
  fields:'领域节点',
  audiences:'读者群体节点',
  difficulties:'难度节点',
  keywords:'关键词节点',
  topics:'主题节点',
  relations:'关系',
  advanced_relations:'高级语义关系',
};

function topObjectEntries(obj, limit=8){
  return Object.entries(obj || {}).sort((a,b)=>Number(b[1]||0)-Number(a[1]||0)).slice(0, limit).map(([name,count])=>({name, count}));
}

function buildAdminAssistantContext(){
  const dash = lastAdminDashboard || {};
  const graph = lastAdminGraphStats || {};
  return {
    cards: dash.cards || {},
    graph_stats: graph,
    category_distribution: topObjectEntries(dash.category_distribution, 10),
    rating_distribution: dash.rating_distribution || {},
    user_status: dash.user_status || {},
    activity_7d: (dash.activity || []).map(x=>({
      date: x.date,
      new_users: x.users || 0,
      comments: x.comments || 0,
      ratings: x.ratings || 0,
      searches: x.searches || 0,
      reads: x.reads || 0,
    })),
    hot_books: (dash.hot_books || []).slice(0, 5).map(b=>({
      title: b.title,
      authors: b.authors || [],
      category: b.category,
      rating: b.avg_rating,
      hot_score: b.hot_score,
      views: b.view_count,
    })),
    top_keywords: dash.top_keywords || [],
    cache: dash.cache || {},
  };
}

async function ensureAdminAssistantContext(){
  if(lastAdminDashboard) return;
  const [dash, graph] = await Promise.all([api('/admin/dashboard'), api('/graph/stats').catch(()=>null)]);
  lastAdminDashboard = dash;
  lastAdminGraphStats = graph;
}

async function api(path, opts={}){
  const res = await fetch(API + path, {headers: headers(), ...opts});
  if(!res.ok){
    let text = await res.text();
    try{ text = JSON.parse(text).detail || text; }catch(e){}
    throw new Error(text || res.statusText);
  }
  return res.json();
}

function setAdminVisible(visible){
  $('adminLogin').classList.toggle('hidden', visible);
  $('adminApp').classList.toggle('hidden', !visible);
  $('logoutBtn').classList.toggle('hidden', !visible);
  $('adminAssistantBtn')?.classList.toggle('hidden', !visible);
  $('adminRefreshBtn')?.classList.toggle('hidden', !visible);
  if(!visible) $('adminAssistant')?.classList.add('hidden');
}

async function requireAdmin(){
  if(!token || !isAdmin()){
    setAdminVisible(false);
    return false;
  }
  try{
    await api('/admin/dashboard');
    setAdminVisible(true);
    return true;
  }catch(e){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    token = '';
    currentUser = null;
    setAdminVisible(false);
    return false;
  }
}

async function adminLogin(){
  const account = $('adminLoginUser').value.trim();
  const password = $('adminLoginPass').value;
  if(!account || !password) return toast('请填写管理员账号和密码');
  try{
    const data = await api('/user/login', {method:'POST', body:JSON.stringify({account, username_or_email:account, password, role:"admin"})});
    token = data.access_token;
    currentUser = data.user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(currentUser));
    if(!isAdmin()){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      token = '';
      currentUser = null;
      return toast('当前账号不是管理员');
    }
    toast('管理员登录成功');
    await loadAdmin();
  }catch(e){
    toast(e.message || '登录失败');
  }
}

function logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  token = '';
  currentUser = null;
  setAdminVisible(false);
}

function openAdminAssistant(){
  if(!isAdmin()) return toast('请先使用管理员账号登录');
  $('adminAssistant')?.classList.toggle('hidden');
}

async function sendAdminChat(){
  if(!isAdmin()) return toast('请先使用管理员账号登录');
  const input = $('adminChatInput');
  const box = $('adminChatBox');
  const message = input.value.trim();
  if(!message) return;
  input.value = '';
  box.innerHTML += `<div class="bubble user">${html(message)}</div>`;
  box.scrollTop = box.scrollHeight;
  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'bubble';
  loadingMsg.textContent = '正在分析后台数据…';
  box.appendChild(loadingMsg);
  try{
    await ensureAdminAssistantContext();
    loadingMsg.textContent = '正在调用 AI 助手…';
    const context = JSON.stringify(buildAdminAssistantContext());
    const prompt = `请以管理员助手身份回答。你可以使用以下后台实时数据作为分析依据，数据是JSON：${context}\n回答要求：优先基于数据给出结论、异常点和可执行建议；如果问题与数据无关，再按图书管理、用户运营、评论审核和数据分析经验回答。\n管理员问题：${message}`;
    const data = await api('/chat/send', {method:'POST', body:JSON.stringify({message:prompt})});
    loadingMsg.remove();
    const books = (data.books || []).slice(0, 3).map(b=>`<div class="mini-item"><b>${html(b.title)}</b><span>${html(b.reason || b.category || '')}</span></div>`).join('');
    box.innerHTML += `<div class="bubble">${html(data.answer || '我暂时没有得到有效回复。')}${books}</div>`;
  }catch(e){
    loadingMsg.remove();
    box.innerHTML += `<div class="bubble">助手暂时不可用：${html(e.message || '请求失败')}</div>`;
  }
  box.scrollTop = box.scrollHeight;
}

async function loadAdmin(){
  if(!await requireAdmin()) return;
  const [dash, gs] = await Promise.all([api('/admin/dashboard'), api('/graph/stats').catch(()=>null)]);
  lastAdminDashboard = dash;
  lastAdminGraphStats = gs;
  $('adminStats').innerHTML = Object.entries(dash.cards || {}).map(([k,v])=>stat(adminMetricLabels[k] || k, v)).join('');
  $('adminGraphStats').innerHTML = gs ? Object.entries(gs).filter(([,v])=>typeof v === 'number').map(([k,v])=>stat(adminMetricLabels[k] || k, v)).join('') : '';
  renderAdminInsights(dash);
  await Promise.allSettled([adminLoadBooks(), adminLoadImportBatches(), adminLoadUsers(), adminLoadComments()]);
}

function renderBars(id, entries, options={}){
  const target = $(id);
  if(!target) return;
  const rows = Array.isArray(entries) ? entries : Object.entries(entries || {}).map(([label,value])=>({label, value}));
  const clean = rows.map(x=>({label: x.label ?? x.keyword ?? x[0], value: Number(x.value ?? x.count ?? x[1] ?? 0)})).filter(x=>x.label);
  const max = Math.max(1, ...clean.map(x=>x.value));
  target.innerHTML = clean.slice(0, options.limit || 8).map(x=>`
    <div class="admin-bar-row">
      <span>${html(x.label)}</span>
      <div class="admin-bar-track"><i style="width:${Math.max(4, x.value / max * 100)}%"></i></div>
      <b>${x.value}</b>
    </div>
  `).join('') || '<p class="meta">暂无数据</p>';
}

function renderActivity(activity){
  const target = $('adminActivityChart');
  if(!target) return;
  const rows = activity || [];
  const max = Math.max(1, ...rows.flatMap(x=>[x.users||0, x.comments||0, x.ratings||0, x.searches||0, x.reads||0]));
  target.innerHTML = `
    <div class="admin-line-legend">
      <span><i class="tone-a"></i>用户</span><span><i class="tone-b"></i>评论</span><span><i class="tone-c"></i>评分</span><span><i class="tone-d"></i>搜索</span><span><i class="tone-e"></i>阅读</span>
    </div>
    <div class="admin-line-grid">
      ${rows.map(day=>`
        <div class="admin-line-day">
          <div class="admin-line-stack">
            <i class="tone-a" style="height:${Math.max(3, (day.users||0)/max*100)}%"></i>
            <i class="tone-b" style="height:${Math.max(3, (day.comments||0)/max*100)}%"></i>
            <i class="tone-c" style="height:${Math.max(3, (day.ratings||0)/max*100)}%"></i>
            <i class="tone-d" style="height:${Math.max(3, (day.searches||0)/max*100)}%"></i>
            <i class="tone-e" style="height:${Math.max(3, (day.reads||0)/max*100)}%"></i>
          </div>
          <span>${html(day.date)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderUserDonut(status){
  const target = $('adminUserChart');
  if(!target) return;
  const active = Number(status?.active || 0);
  const disabled = Number(status?.disabled || 0);
  const admins = Number(status?.admins || 0);
  const members = Number(status?.members || 0);
  const total = Math.max(1, active + disabled);
  const activeDeg = active / total * 360;
  target.innerHTML = `
    <div class="admin-donut" style="background:conic-gradient(#10b981 0 ${activeDeg}deg,#ef4444 ${activeDeg}deg 360deg)"><b>${active + disabled}</b><span>用户</span></div>
    <div class="admin-status-list">
      <div><span>启用用户</span><b>${active}</b></div>
      <div><span>禁用用户</span><b>${disabled}</b></div>
      <div><span>管理员</span><b>${admins}</b></div>
      <div><span>普通用户</span><b>${members}</b></div>
    </div>
  `;
}

function renderHotBooks(items){
  const target = $('adminHotBooks');
  if(!target) return;
  const rows = (items || []).slice(0, 10).map(b=>({
    label: b.title,
    value: Number(b.hot_score || b.view_count || 0),
    meta: (b.authors || []).join('、') || b.category || '暂无作者',
  })).filter(x=>x.label);
  renderWordCloud(target, rows, '暂无热门图书');
}

function renderWordCloud(target, rows, emptyText='暂无数据'){
  if(!target) return;
  const clean = (rows || []).map(x=>({
    label: x.label ?? x.keyword ?? x.name,
    value: Number(x.value ?? x.count ?? 0),
    meta: x.meta || '',
  })).filter(x=>x.label);
  const values = clean.map(x=>x.value);
  const max = Math.max(1, ...values);
  const min = Math.min(...values, max);
  target.innerHTML = clean.map((x, index)=>{
    const ratio = max === min ? .55 : (x.value - min) / (max - min);
    const size = Math.round(14 + ratio * 22);
    const weight = Math.round(650 + ratio * 250);
    const tone = index % 5;
    const rotations = [-7, 4, 0, -3, 7, 2, -5, 5];
    const rotate = rotations[index % rotations.length];
    const title = x.meta ? `${x.meta} · ${x.value}` : String(x.value);
    return `<span class="word tone-${tone}" style="font-size:${size}px;font-weight:${weight};transform:rotate(${rotate}deg)" title="${attr(title)}">${html(x.label)}</span>`;
  }).join('') || `<p class="meta">${html(emptyText)}</p>`;
}

function renderChips(id, rows){
  const target = $(id);
  renderWordCloud(target, rows, '暂无热搜');
}

function renderStatus(id, status){
  const target = $(id);
  if(!target) return;
  target.innerHTML = (status || []).map(row=>`<div><span>${html(row.label)}</span><b>${html(row.value)}</b></div>`).join('') || '<p class="meta">暂无状态</p>';
}

function renderAdminInsights(dash){
  renderBars('adminCategoryChart', dash.category_distribution, {limit: 8});
  renderBars('adminRatingChart', dash.rating_distribution);
  renderActivity(dash.activity);
  renderUserDonut(dash.user_status);
  renderHotBooks(dash.hot_books);
  renderChips('adminKeywordChart', dash.top_keywords);
  renderStatus('adminCacheStatus', [
    {label:'图书库状态', value:`${dash.cards?.books || 0} 本可展示`},
    {label:'用户互动', value:`${dash.cards?.comments || 0} 条评论 / ${dash.cards?.ratings || 0} 条评分`},
    {label:'推荐缓存', value:dash.cache?.backend ? '运行中' : '本地运行'},
    {label:'搜索记录', value:`${dash.cards?.searches || 0} 次搜索`},
  ]);
}

function adminSwitchTab(tab){
  const panes = {books:'adminBooks', users:'adminUsers', comments:'adminComments'};
  document.querySelectorAll('.admin-tab').forEach(x=>x.classList.toggle('active', x.dataset.adminTab===tab));
  document.querySelectorAll('.admin-pane').forEach(x=>x.classList.remove('active'));
  $(panes[tab] || 'adminBooks')?.classList.add('active');
  if(tab === 'books') { adminLoadBooks(); adminLoadImportBatches(); }
  if(tab === 'users') adminLoadUsers();
  if(tab === 'comments') adminLoadComments();
}

async function adminLoadBooks(page=adminBookPage){
  if(!isAdmin()) return;
  adminBookPage = Math.max(1, Number(page) || 1);
  const q = $('adminBookSearch')?.value?.trim();
  const params = new URLSearchParams({
    page:String(adminBookPage),
    limit:String(adminBookPageSize),
    include_deleted:'true',
  });
  if(q) params.set('q', q);
  const data = await api(`/books/admin/export-json?${params.toString()}`).catch(e=>({items:[], error:e.message}));
  if(data.error){ $('adminBookList').innerHTML = `<p class="meta">${data.error}</p>`; return; }
  const rows = data.items || [];
  $('adminBookList').innerHTML = `<table><thead><tr><th>ID</th><th>书名</th><th>作者</th><th>分类</th><th>评分</th><th>状态</th><th>操作</th></tr></thead><tbody>${rows.map(b=>`<tr><td>${b.id}</td><td>${html(b.title)}<br><span>${html(b.publisher||'')}</span></td><td>${html((b.authors||[]).join('、'))}</td><td>${html(b.category||'')}</td><td>${Number(b.avg_rating||0).toFixed(1)} / 10</td><td><span class="${b.is_deleted?'status-bad':'status-ok'}">${b.is_deleted?'已下架':'已上架'}</span></td><td><button class="${b.is_deleted?'':'danger-btn'}" onclick="adminToggleBookStatus(${b.id}, ${!!b.is_deleted}, '${attr(b.title)}')">${b.is_deleted?'上架':'下架'}</button></td></tr>`).join('') || '<tr><td colspan="7">暂无图书</td></tr>'}</tbody></table>`;
  renderAdminBookPager(data.total || 0, data.page || adminBookPage, data.limit || adminBookPageSize);
}

function renderAdminBookPager(total, page, limit){
  const target = $('adminBookPager');
  if(!target) return;
  const pages = Math.max(1, Math.ceil(total / Math.max(1, limit)));
  target.innerHTML = `
    <button ${page <= 1 ? 'disabled' : ''} onclick="adminLoadBooks(${page - 1})">上一页</button>
    <span>第 ${page} / ${pages} 页，共 ${total} 本</span>
    <button ${page >= pages ? 'disabled' : ''} onclick="adminLoadBooks(${page + 1})">下一页</button>
  `;
}

function adminResetBookForm(){ $('adminBookForm')?.reset(); if($('adminBookId')) $('adminBookId').value=''; }
function adminBookPayload(){
  const year = Number($('adminBookYear').value);
  return {
    title: $('adminBookTitle').value.trim(),
    authors: adminSplit($('adminBookAuthors').value),
    category: $('adminBookCategory').value.trim() || null,
    tags: adminSplit($('adminBookTags').value),
    publisher: $('adminBookPublisher').value.trim() || null,
    publication_year: year || null,
    cover_url: $('adminBookCover').value.trim() || null,
    description: $('adminBookDescription').value.trim() || null,
  };
}

async function adminSaveBook(event){
  event?.preventDefault?.();
  const id = $('adminBookId').value;
  const payload = adminBookPayload();
  if(!payload.title) return toast('请填写书名');
  await api(id ? `/books/admin/${id}` : '/books/admin', {method:id?'PUT':'POST', body:JSON.stringify(payload)});
  toast('图书已保存');
  adminResetBookForm();
  await adminLoadBooks();
}

async function adminToggleBookStatus(id, isDeleted, title){
  const nextDeleted = !isDeleted;
  if(!confirm(`确认${nextDeleted ? '下架' : '上架'}《${title}》？`)) return;
  await api(`/books/admin/${id}/status`, {method:'PUT', body:JSON.stringify({is_deleted:nextDeleted})});
  toast(nextDeleted ? '图书已下架' : '图书已上架');
  await Promise.allSettled([adminLoadBooks(), loadAdmin()]);
}

async function adminReindex(){ const r = await api('/books/admin/reindex-search', {method:'POST'}); toast(`已重建索引：${r.indexed || 0} 本`); }


let adminCurrentImportBatch = null;
let adminCurrentImportItems = [];
let adminCurrentImportItemId = null;

function adminStatusText(status){
  return {pending:'待编辑', edited:'已编辑', committed:'已入库', failed:'失败', staged:'暂存'}[status] || status || '待编辑';
}
function adminImportItemById(id){ return adminCurrentImportItems.find(x => Number(x.id) === Number(id)); }

function adminPreviewSelectedEpubFiles(){
  const input = $('adminBatchEpubFiles');
  const preview = $('adminSelectedEpubPreview');
  if(!preview) return;
  const files = Array.from(input?.files || []);
  if(!files.length){
    preview.innerHTML = '';
    return;
  }
  const epubFiles = files.filter(file => String(file.name || '').toLowerCase().endsWith('.epub'));
  preview.innerHTML = `<b>已选择 ${files.length} 个文件，EPUB ${epubFiles.length} 个：</b>` + files.slice(0, 20).map(file => `<span>${html(file.name)}</span>`).join('') + (files.length > 20 ? `<span>还有 ${files.length - 20} 个...</span>` : '');
}

function adminRenderImportList(){
  const list = $('adminImportList');
  const summary = $('adminImportSummary');
  if(!list) return;
  if(!adminCurrentImportItems.length){
    list.innerHTML = '<div class="epub-editor-empty">还没有待入库文件</div>';
    if(summary) summary.textContent = '一次性选择多个 EPUB 文件上传后，所有文件会同时显示在左侧。';
    return;
  }
  const committed = adminCurrentImportItems.filter(x => x.status === 'committed').length;
  const edited = adminCurrentImportItems.filter(x => x.status === 'edited').length;
  const pending = adminCurrentImportItems.filter(x => x.status === 'pending').length;
  const failed = adminCurrentImportItems.filter(x => x.status === 'failed').length;
  if(summary){
    summary.textContent = `当前批次：${adminCurrentImportBatch?.batch_no || '-'}，共 ${adminCurrentImportItems.length} 本，待编辑 ${pending} 本，已编辑 ${edited} 本，已入库 ${committed} 本，失败 ${failed} 本。`;
  }
  list.innerHTML = adminCurrentImportItems.map(item => `
    <button class="epub-import-item ${Number(item.id) === Number(adminCurrentImportItemId) ? 'active' : ''}" onclick="adminSelectImportItem(${item.id})">
      <span><b>${html(item.title || item.original_filename)}</b><span>${html(item.original_filename)}</span></span>
      <em class="epub-status ${html(item.status)}">${adminStatusText(item.status)}</em>
    </button>
  `).join('');
}

function adminFillImportEditor(item){
  adminCurrentImportItemId = item?.id || null;
  const form = $('adminImportEditor');
  const empty = $('adminImportEditorEmpty');
  if(!item){
    form?.classList.add('hidden');
    empty?.classList.remove('hidden');
    adminRenderImportList();
    return;
  }
  empty?.classList.add('hidden');
  form?.classList.remove('hidden');
  $('adminImportEditorTitle').textContent = `编辑：${item.original_filename}`;
  $('adminImportItemId').value = item.id;
  $('adminImportTitle').value = item.title || '';
  $('adminImportAuthors').value = item.authors_text || (item.authors || []).join('，');
  $('adminImportCategory').value = item.category || '';
  $('adminImportTags').value = item.tags_text || (item.tags || []).join('，');
  $('adminImportPublisher').value = item.publisher || '';
  $('adminImportYear').value = item.publication_year || '';
  $('adminImportIsbn').value = item.isbn || '';
  $('adminImportPages').value = item.page_count || 240;
  $('adminImportCoverUrl').value = item.cover_url || '';
  $('adminImportDescription').value = item.description || '';
  if($('adminImportCoverFile')) $('adminImportCoverFile').value = '';
  adminRenderImportList();
}

function adminSelectImportItem(id){
  const item = adminImportItemById(id);
  if(!item) return toast('待入库文件不存在');
  adminFillImportEditor(item);
}

async function adminStageEpubFiles(){
  const input = $('adminBatchEpubFiles');
  const btn = $('adminStageEpubBtn');
  const files = Array.from(input?.files || []);
  if(!files.length) return toast('请一次性选择多个 EPUB 文件');
  const epubFiles = files.filter(file => String(file.name || '').toLowerCase().endsWith('.epub'));
  if(!epubFiles.length) return toast('请选择 .epub 文件');
  if(epubFiles.length !== files.length) toast(`已过滤 ${files.length - epubFiles.length} 个非 EPUB 文件`);

  const form = new FormData();
  epubFiles.forEach(file => form.append('files', file, file.name));
  if(btn){ btn.disabled = true; btn.textContent = `正在上传 ${epubFiles.length} 本...`; }
  try{
    const res = await fetch(API + '/books/admin/import-stage', {
      method:'POST',
      headers: token ? {'Authorization': `Bearer ${token}`} : {},
      body: form,
    });
    if(!res.ok){
      const text = await res.text();
      throw new Error(text || '上传失败');
    }
    const data = await res.json();
    adminCurrentImportBatch = data.batch;
    adminCurrentImportItems = data.batch?.items || [];
    toast(data.message || `已上传 ${adminCurrentImportItems.length} 本到待入库`);
    adminFillImportEditor(adminCurrentImportItems[0] || null);
    if(input) input.value = '';
    if($('adminSelectedEpubPreview')) $('adminSelectedEpubPreview').innerHTML = '';
  }finally{
    if(btn){ btn.disabled = false; btn.textContent = '批量上传到待入库'; }
  }
}

async function adminLoadImportBatches(){
  const data = await api('/books/admin/import-batches?limit=1').catch(e=>({items:[], error:e.message}));
  if(data.error) return toast(data.error);
  const batch = (data.items || [])[0];
  if(!batch){
    adminCurrentImportBatch = null;
    adminCurrentImportItems = [];
    adminFillImportEditor(null);
    return;
  }
  adminCurrentImportBatch = batch;
  adminCurrentImportItems = batch.items || [];
  adminFillImportEditor(adminCurrentImportItems[0] || null);
}

async function adminSaveImportItem(event){
  event?.preventDefault?.();
  const id = $('adminImportItemId')?.value;
  if(!id) return toast('请先选择左侧待入库文件');
  if(!$('adminImportTitle').value.trim()) return toast('请填写书名');
  const form = new FormData();
  form.append('title', $('adminImportTitle').value.trim());
  form.append('authors', $('adminImportAuthors').value.trim());
  form.append('category', $('adminImportCategory').value.trim());
  form.append('tags', $('adminImportTags').value.trim());
  form.append('publisher', $('adminImportPublisher').value.trim());
  form.append('publication_year', $('adminImportYear').value.trim());
  form.append('isbn', $('adminImportIsbn').value.trim());
  form.append('page_count', $('adminImportPages').value.trim() || '240');
  form.append('cover_url', $('adminImportCoverUrl').value.trim());
  form.append('description', $('adminImportDescription').value.trim());
  const cover = $('adminImportCoverFile')?.files?.[0];
  if(cover) form.append('cover_file', cover);
  const res = await fetch(API + `/books/admin/import-items/${id}`, {
    method:'PUT',
    headers: token ? {'Authorization': `Bearer ${token}`} : {},
    body: form,
  });
  if(!res.ok){
    const text = await res.text();
    throw new Error(text || '保存失败');
  }
  const data = await res.json();
  const index = adminCurrentImportItems.findIndex(x => Number(x.id) === Number(id));
  if(index >= 0) adminCurrentImportItems[index] = data.item;
  toast('当前图书信息已保存');
  adminFillImportEditor(data.item);
}

async function adminCommitCurrentImportItem(){
  const id = $('adminImportItemId')?.value;
  if(!id) return toast('请先选择左侧待入库文件');
  if(!confirm('确认把当前图书写入数据库？')) return;
  const data = await api(`/books/admin/import-items/${id}/commit`, {method:'POST'});
  const index = adminCurrentImportItems.findIndex(x => Number(x.id) === Number(id));
  if(index >= 0) adminCurrentImportItems[index] = data.item;
  toast(data.message || '已入库');
  adminFillImportEditor(data.item);
  await adminLoadBooks();
}

async function adminCommitCurrentBatch(){
  if(!adminCurrentImportBatch?.id) return toast('请先批量上传 EPUB 文件');
  if(!confirm('确认批量入库当前批次中所有已填写书名的图书？')) return;
  const data = await api(`/books/admin/import-batches/${adminCurrentImportBatch.id}/commit`, {method:'POST'});
  adminCurrentImportBatch = data.batch;
  adminCurrentImportItems = data.batch?.items || [];
  toast(data.message || '批量入库完成');
  adminFillImportEditor(adminCurrentImportItems[0] || null);
  await adminLoadBooks();
}

async function adminDeleteCurrentImportItem(){
  const id = $('adminImportItemId')?.value;
  if(!id) return toast('请先选择待入库文件');
  if(!confirm('确认移除这个待入库文件？')) return;
  await api(`/books/admin/import-items/${id}`, {method:'DELETE'});
  adminCurrentImportItems = adminCurrentImportItems.filter(x => Number(x.id) !== Number(id));
  toast('已移除');
  adminFillImportEditor(adminCurrentImportItems[0] || null);
}

function adminCheckedValues(selector){
  return Array.from(document.querySelectorAll(selector + ':checked'))
    .map(x => Number(x.value))
    .filter(Boolean);
}
function adminUpdateBatchHint(type){
  const ids = type === 'user' ? adminCheckedValues('.admin-user-check') : adminCheckedValues('.admin-comment-check');
  const hint = type === 'user' ? $('adminUserBatchHint') : $('adminCommentBatchHint');
  if(hint) hint.textContent = type === 'user' ? `已选择 ${ids.length} 个用户` : `已选择 ${ids.length} 条帖子`;
}
function adminToggleAllUsers(checked){
  document.querySelectorAll('.admin-user-check').forEach(x => x.checked = checked);
  adminUpdateBatchHint('user');
}
function adminToggleAllComments(checked){
  document.querySelectorAll('.admin-comment-check').forEach(x => x.checked = checked);
  adminUpdateBatchHint('comment');
}
function adminSelectedUserIds(){ return adminCheckedValues('.admin-user-check'); }
function adminSelectedCommentIds(){ return adminCheckedValues('.admin-comment-check'); }
async function adminBatchUserStatus(isActive){
  const ids = adminSelectedUserIds();
  if(!ids.length) return toast('请先选择用户');
  if(!confirm(`确认批量${isActive ? '启用' : '禁用'} ${ids.length} 个用户？`)) return;
  const r = await api('/admin/users/batch/status', {method:'PUT', body:JSON.stringify({ids, is_active:isActive})});
  toast(`已更新 ${r.updated || 0} 个用户${r.skipped ? `，跳过 ${r.skipped} 个` : ''}`);
  await Promise.allSettled([adminLoadUsers(), loadAdmin()]);
}
async function adminBatchUserRole(isAdminRole){
  const ids = adminSelectedUserIds();
  if(!ids.length) return toast('请先选择用户');
  if(!confirm(`确认批量设为${isAdminRole ? '管理员' : '普通用户'}？`)) return;
  const r = await api('/admin/users/batch/role', {method:'PUT', body:JSON.stringify({ids, is_admin:isAdminRole})});
  toast(`已更新 ${r.updated || 0} 个用户${r.skipped ? `，跳过 ${r.skipped} 个` : ''}`);
  await Promise.allSettled([adminLoadUsers(), loadAdmin()]);
}
async function adminBatchDeleteUsers(){
  const ids = adminSelectedUserIds();
  if(!ids.length) return toast('请先选择用户');
  if(!confirm(`确认删除选中的 ${ids.length} 个用户？该操作会同时清理其评论、书架、评分和阅读记录。`)) return;
  const r = await api('/admin/users/batch/delete', {method:'POST', body:JSON.stringify({ids})});
  toast(`已删除 ${r.deleted || 0} 个用户${r.skipped ? `，跳过 ${r.skipped} 个` : ''}`);
  await Promise.allSettled([adminLoadUsers(), loadAdmin()]);
}
async function adminBatchPinComments(isPinned){
  const ids = adminSelectedCommentIds();
  if(!ids.length) return toast('请先选择帖子');
  const r = await api('/ecosystem/admin/comments/batch/pin', {method:'POST', body:JSON.stringify({ids, is_pinned:isPinned})});
  toast(`已更新 ${r.updated || 0} 条帖子`);
  await adminLoadComments();
}
async function adminBatchDeleteComments(){
  const ids = adminSelectedCommentIds();
  if(!ids.length) return toast('请先选择帖子');
  if(!confirm(`确认删除选中的 ${ids.length} 条帖子？`)) return;
  const r = await api('/ecosystem/admin/comments/batch/delete', {method:'POST', body:JSON.stringify({ids})});
  toast(`已删除 ${r.deleted || 0} 条帖子`);
  await Promise.allSettled([adminLoadComments(), loadAdmin()]);
}


async function adminLoadUsers(){
  if(!isAdmin()) return;
  const q = $('adminUserSearch')?.value?.trim();
  const data = await api('/admin/users' + (q ? `?q=${encodeURIComponent(q)}` : '')).catch(e=>({items:[], error:e.message}));
  if(data.error){ $('adminUserList').innerHTML = `<p class="meta">${html(data.error)}</p>`; return; }
  const rows = data.items || [];
  if($('adminUserCheckAll')) $('adminUserCheckAll').checked = false;
  $('adminUserList').innerHTML = `<table><thead><tr><th>选择</th><th>ID</th><th>用户</th><th>邮箱</th><th>角色</th><th>状态</th><th>操作</th></tr></thead><tbody>${rows.map(u=>`<tr><td><input class="admin-row-check admin-user-check" type="checkbox" value="${u.id}" onchange="adminUpdateBatchHint('user')"></td><td>${u.id}</td><td>${html(u.nickname||u.username)}<br><span>${html(u.username)}</span></td><td>${html(u.email)}</td><td>${u.is_admin?'管理员':'用户'}</td><td><span class="${u.is_active?'status-ok':'status-bad'}">${u.is_active?'启用':'禁用'}</span></td><td><button onclick="adminToggleUser(${u.id}, ${u.is_active})">${u.is_active?'禁用':'启用'}</button><button onclick="adminToggleRole(${u.id}, ${u.is_admin})">${u.is_admin?'取消管理员':'设为管理员'}</button></td></tr>`).join('') || '<tr><td colspan="7">暂无用户</td></tr>'}</tbody></table>`;
  adminUpdateBatchHint('user');
}

async function adminToggleUser(id, active){ await api(`/admin/users/${id}/status`, {method:'PUT', body:JSON.stringify({is_active:!active})}); toast('用户状态已更新'); adminLoadUsers(); }
async function adminToggleRole(id, isAdmin){ await api(`/admin/users/${id}/role`, {method:'PUT', body:JSON.stringify({is_admin:!isAdmin})}); toast('用户角色已更新'); await Promise.allSettled([adminLoadUsers(), loadAdmin()]); }
async function adminExportUsers(){ const r=await api('/admin/users/export-csv'); await navigator.clipboard?.writeText(r.content).catch(()=>{}); toast('CSV已复制到剪贴板'); }

async function adminLoadComments(){
  if(!isAdmin()) return;
  const qs = [];
  if($('adminCommentBookId')?.value) qs.push(`book_id=${$('adminCommentBookId').value}`);
  if($('adminCommentUsername')?.value) qs.push(`username=${encodeURIComponent($('adminCommentUsername').value)}`);
  const data = await api('/ecosystem/admin/comments' + (qs.length ? `?${qs.join('&')}` : '')).catch(e=>({items:[], error:e.message}));
  if(data.error){ $('adminCommentList').innerHTML = `<p class="meta">${html(data.error)}</p>`; return; }
  const rows = data.items || [];
  if($('adminCommentCheckAll')) $('adminCommentCheckAll').checked = false;
  $('adminCommentList').innerHTML = `<table><thead><tr><th>选择</th><th>ID</th><th>图书</th><th>用户</th><th>内容</th><th>状态</th><th>操作</th></tr></thead><tbody>${rows.map(c=>`<tr><td><input class="admin-row-check admin-comment-check" type="checkbox" value="${c.id}" onchange="adminUpdateBatchHint('comment')"></td><td>${c.id}</td><td>${html(c.book_title||c.book_id)}</td><td>${html(c.nickname||c.username)}<br><span>⭐ ${html(c.rating||'-')} · 赞 ${html(c.likes_count||0)}</span></td><td>${html(c.content)}</td><td><span class="${c.is_pinned?'status-ok':''}">${c.is_pinned?'置顶':'普通'}</span></td><td><button onclick="adminPinComment(${c.id})">${c.is_pinned?'取消置顶':'置顶'}</button><button class="danger-btn" onclick="adminDeleteComment(${c.id})">删除</button></td></tr>`).join('') || '<tr><td colspan="7">暂无帖子</td></tr>'}</tbody></table>`;
  adminUpdateBatchHint('comment');
}

async function adminPinComment(id){ await api(`/ecosystem/admin/comments/${id}/pin`, {method:'POST'}); toast('置顶状态已更新'); adminLoadComments(); }
async function adminDeleteComment(id){ if(!confirm('确认删除这条评论？')) return; await api(`/ecosystem/admin/comments/${id}`, {method:'DELETE'}); toast('评论已删除'); await Promise.allSettled([adminLoadComments(), loadAdmin()]); }

async function adminLoadSettings(){
  if(!isAdmin()) return;
  const [weights, configs] = await Promise.all([api('/recommend/admin/weights').catch(()=>null), api('/admin/configs').catch(()=>({items:[]}))]);
  if(weights){ $('adminWeightKg').value=weights.kg; $('adminWeightCf').value=weights.cf; $('adminWeightHot').value=weights.hot; $('adminWeightNew').value=weights.new; }
  $('adminConfigList').innerHTML = `<table><thead><tr><th>键</th><th>值</th><th>说明</th></tr></thead><tbody>${(configs.items||[]).map(c=>`<tr onclick="adminFillConfig('${attr(c.key)}','${attr(c.value)}','${attr(c.description||'')}')"><td>${c.key}</td><td>${c.value}</td><td>${c.description||''}</td></tr>`).join('') || '<tr><td colspan="3">暂无配置</td></tr>'}</tbody></table>`;
}

function adminFillConfig(key, value, desc){ $('adminConfigKey').value=key; $('adminConfigValue').value=value; $('adminConfigDesc').value=desc; }
async function adminSaveWeights(){ await api('/recommend/admin/weights', {method:'PUT', body:JSON.stringify({kg:Number($('adminWeightKg').value), cf:Number($('adminWeightCf').value), hot:Number($('adminWeightHot').value), new:Number($('adminWeightNew').value)})}); toast('推荐权重已保存'); }
async function adminPrecomputeItemCf(){ const r=await api('/recommend/admin/precompute-itemcf', {method:'POST'}); toast(r.message || 'ItemCF已预计算'); }
async function adminSaveConfig(){
  const key=$('adminConfigKey').value.trim(); if(!key) return toast('请填写配置键');
  await api('/admin/configs', {method:'PUT', body:JSON.stringify({key, value:$('adminConfigValue').value, description:$('adminConfigDesc').value})});
  toast('配置已保存');
  adminLoadSettings();
}

async function adminGraphInit(){ $('adminGraphResult').textContent=adminJson(await api('/graph/admin/init', {method:'POST'})); }
async function adminGraphSync(){ $('adminGraphResult').textContent=adminJson(await api('/graph/admin/sync', {method:'POST'})); }
async function adminGraphSemantic(){ $('adminGraphResult').textContent=adminJson(await api('/graph/admin/semantic/enrich', {method:'POST'})); }
async function adminCreateRelation(){
  const payload = {source_type:'Book', source_id:Number($('adminRelSource').value), relation_type:$('adminRelType').value.trim()||'SIMILAR_TO', target_type:'Book', target_id:Number($('adminRelTarget').value), weight:Number($('adminRelWeight').value||1)};
  if(!payload.source_id || !payload.target_id) return toast('请填写源/目标图书 ID');
  $('adminGraphResult').textContent = adminJson(await api('/graph/admin/relations', {method:'POST', body:JSON.stringify(payload)}));
}
async function adminRunCypher(){
  const cypher = $('adminCypher').value.trim();
  if(!cypher) return toast('请填写 Cypher');
  $('adminGraphResult').textContent = adminJson(await api('/graph/admin/cypher', {method:'POST', body:JSON.stringify({cypher, params:{}})}));
}

document.querySelectorAll('.admin-tab').forEach(btn=>btn.addEventListener('click',()=>adminSwitchTab(btn.dataset.adminTab)));
$('adminBookForm')?.addEventListener('submit', adminSaveBook);
$('adminLoginBtn').onclick = adminLogin;
$('logoutBtn').onclick = logout;
$('adminAssistantBtn').onclick = openAdminAssistant;
$('adminRefreshBtn').onclick = async () => { await loadAdmin(); toast('后台数据已刷新'); };
$('adminLoginPass').addEventListener('keydown', e=>{ if(e.key === 'Enter') adminLogin(); });
$('adminChatInput')?.addEventListener('keydown', e=>{ if(e.key === 'Enter') sendAdminChat(); });
loadAdmin();

