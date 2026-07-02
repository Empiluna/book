const API = '/api/v1';
let token = localStorage.getItem('token') || '';
let currentUser = JSON.parse(localStorage.getItem('user') || 'null');
let lastAdminDashboard = null;
let lastAdminGraphStats = null;

function $(id){ return document.getElementById(id); }
function headers(){ return token ? {'Authorization': `Bearer ${token}`, 'Content-Type':'application/json'} : {'Content-Type':'application/json'}; }
function isAdmin(){ return !!(currentUser && currentUser.is_admin); }
function toast(msg){ const el=document.createElement('div'); el.className='toast'; el.textContent=msg; document.body.appendChild(el); setTimeout(()=>el.remove(),2600); }
function attr(value){ return String(value ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function html(value){ return String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function stat(label, value){ return `<div class="stat"><b>${value}</b><span>${label}</span></div>`; }
function adminSplit(value){ return String(value||'').split(/[,，、]/).map(x=>x.trim()).filter(Boolean); }
function adminJson(data){ return JSON.stringify(data, null, 2); }
const adminMetricLabels = {books:'图书', users:'用户', comments:'评论', ratings:'评分', bookmarks:'收藏', searches:'搜索', chat_messages:'问答', purchase_clicks:'购书点击', nodes:'节点', relationships:'关系', semantic_nodes:'语义节点'};

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
  try{
    await ensureAdminAssistantContext();
    const context = JSON.stringify(buildAdminAssistantContext());
    const prompt = `请以管理员助手身份回答。你可以使用以下后台实时数据作为分析依据，数据是JSON：${context}\n回答要求：优先基于数据给出结论、异常点和可执行建议；如果问题与数据无关，再按图书管理、用户运营、评论审核、推荐策略、知识图谱和系统配置经验回答。\n管理员问题：${message}`;
    const data = await api('/chat/send', {method:'POST', body:JSON.stringify({message:prompt})});
    const books = (data.books || []).slice(0, 3).map(b=>`<div class="mini-item"><b>${html(b.title)}</b><span>${html(b.reason || b.category || '')}</span></div>`).join('');
    box.innerHTML += `<div class="bubble">${html(data.answer || '我暂时没有得到有效回复。')}${books}</div>`;
  }catch(e){
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
  await Promise.allSettled([adminLoadBooks(), adminLoadUsers(), adminLoadComments(), adminLoadSettings()]);
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
  target.innerHTML = (items || []).slice(0, 5).map((b, index)=>`
    <div class="admin-rank-row">
      <em>${index + 1}</em>
      <span><b>${html(b.title)}</b><small>${html((b.authors||[]).join('、') || b.category || '暂无作者')}</small></span>
      <strong>${Number(b.hot_score || b.view_count || 0).toFixed(1)}</strong>
    </div>
  `).join('') || '<p class="meta">暂无数据</p>';
}

function renderChips(id, rows){
  const target = $(id);
  if(!target) return;
  target.innerHTML = (rows || []).map(x=>`<span>${html(x.keyword)} <b>${x.count}</b></span>`).join('') || '<p class="meta">暂无热搜</p>';
}

function renderStatus(id, status){
  const target = $(id);
  if(!target) return;
  target.innerHTML = Object.entries(status || {}).map(([k,v])=>`<div><span>${html(k)}</span><b>${html(typeof v === 'object' ? JSON.stringify(v) : v)}</b></div>`).join('') || '<p class="meta">暂无状态</p>';
}

function renderAdminInsights(dash){
  renderBars('adminCategoryChart', dash.category_distribution, {limit: 8});
  renderBars('adminRatingChart', dash.rating_distribution);
  renderActivity(dash.activity);
  renderUserDonut(dash.user_status);
  renderHotBooks(dash.hot_books);
  renderChips('adminKeywordChart', dash.top_keywords);
  renderStatus('adminCacheStatus', dash.cache);
}

function adminSwitchTab(tab){
  const panes = {books:'adminBooks', users:'adminUsers', comments:'adminComments', settings:'adminSettings', graphAdmin:'adminGraphAdmin'};
  document.querySelectorAll('.admin-tab').forEach(x=>x.classList.toggle('active', x.dataset.adminTab===tab));
  document.querySelectorAll('.admin-pane').forEach(x=>x.classList.remove('active'));
  $(panes[tab] || 'adminBooks')?.classList.add('active');
  if(tab === 'books') adminLoadBooks();
  if(tab === 'users') adminLoadUsers();
  if(tab === 'comments') adminLoadComments();
  if(tab === 'settings') adminLoadSettings();
}

async function adminLoadBooks(){
  if(!isAdmin()) return;
  const q = $('adminBookSearch')?.value?.trim();
  const data = await api(q ? `/books?q=${encodeURIComponent(q)}&limit=80` : '/books/admin/export-json').catch(e=>({items:[], error:e.message}));
  if(data.error){ $('adminBookList').innerHTML = `<p class="meta">${data.error}</p>`; return; }
  $('adminBookList').innerHTML = `<table><thead><tr><th>ID</th><th>书名</th><th>作者</th><th>分类</th><th>评分</th><th>操作</th></tr></thead><tbody>${(data.items||[]).map(b=>`<tr><td>${b.id}</td><td>${b.title}</td><td>${(b.authors||[]).join('、')}</td><td>${b.category||''}</td><td>${b.avg_rating||0}</td><td><button onclick="adminEditBook(${b.id})">编辑</button><button class="danger-btn" onclick="adminDeleteBook(${b.id}, '${attr(b.title)}')">删除</button></td></tr>`).join('') || '<tr><td colspan="6">暂无图书</td></tr>'}</tbody></table>`;
}

async function adminEditBook(id){
  const b = await api(`/books/${id}`);
  $('adminBookId').value = b.id;
  $('adminBookTitle').value = b.title || '';
  $('adminBookAuthors').value = (b.authors||[]).join('，');
  $('adminBookCategory').value = b.category || '';
  $('adminBookTags').value = (b.tags||[]).join('，');
  $('adminBookPublisher').value = b.publisher || '';
  $('adminBookYear').value = b.publication_year || '';
  $('adminBookCover').value = b.cover_url && !String(b.cover_url).startsWith('data:') ? b.cover_url : '';
  $('adminBookDescription').value = b.description || '';
  adminSwitchTab('books');
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

async function adminDeleteBook(id, title){
  if(!confirm(`确认删除《${title}》？`)) return;
  await api(`/books/admin/${id}`, {method:'DELETE'});
  toast('图书已删除');
  await Promise.allSettled([adminLoadBooks(), loadAdmin()]);
}

async function adminReindex(){ const r = await api('/books/admin/reindex-search', {method:'POST'}); toast(`已重建索引：${r.indexed || 0} 本`); }

async function adminLoadUsers(){
  if(!isAdmin()) return;
  const q = $('adminUserSearch')?.value?.trim();
  const data = await api('/admin/users' + (q ? `?q=${encodeURIComponent(q)}` : '')).catch(e=>({items:[], error:e.message}));
  if(data.error){ $('adminUserList').innerHTML = `<p class="meta">${data.error}</p>`; return; }
  $('adminUserList').innerHTML = `<table><thead><tr><th>ID</th><th>用户</th><th>邮箱</th><th>角色</th><th>状态</th><th>操作</th></tr></thead><tbody>${(data.items||[]).map(u=>`<tr><td>${u.id}</td><td>${u.nickname||u.username}<br><span>${u.username}</span></td><td>${u.email}</td><td>${u.is_admin?'管理员':'用户'}</td><td><span class="${u.is_active?'status-ok':'status-bad'}">${u.is_active?'启用':'禁用'}</span></td><td><button onclick="adminToggleUser(${u.id}, ${u.is_active})">${u.is_active?'禁用':'启用'}</button></td></tr>`).join('') || '<tr><td colspan="6">暂无用户</td></tr>'}</tbody></table>`;
}

async function adminToggleUser(id, active){ await api(`/admin/users/${id}/status`, {method:'PUT', body:JSON.stringify({is_active:!active})}); toast('用户状态已更新'); adminLoadUsers(); }
async function adminExportUsers(){ const r=await api('/admin/users/export-csv'); await navigator.clipboard?.writeText(r.content).catch(()=>{}); toast('CSV已复制到剪贴板'); }

async function adminLoadComments(){
  if(!isAdmin()) return;
  const qs = [];
  if($('adminCommentBookId')?.value) qs.push(`book_id=${$('adminCommentBookId').value}`);
  if($('adminCommentUsername')?.value) qs.push(`username=${encodeURIComponent($('adminCommentUsername').value)}`);
  const data = await api('/ecosystem/admin/comments' + (qs.length ? `?${qs.join('&')}` : '')).catch(e=>({items:[], error:e.message}));
  if(data.error){ $('adminCommentList').innerHTML = `<p class="meta">${data.error}</p>`; return; }
  $('adminCommentList').innerHTML = `<table><thead><tr><th>ID</th><th>图书</th><th>用户</th><th>内容</th><th>状态</th><th>操作</th></tr></thead><tbody>${(data.items||[]).map(c=>`<tr><td>${c.id}</td><td>${c.book_title||c.book_id}</td><td>${c.nickname||c.username}</td><td>${c.content}</td><td>${c.is_pinned?'置顶':'普通'}</td><td><button onclick="adminPinComment(${c.id})">${c.is_pinned?'取消置顶':'置顶'}</button><button class="danger-btn" onclick="adminDeleteComment(${c.id})">删除</button></td></tr>`).join('') || '<tr><td colspan="6">暂无评论</td></tr>'}</tbody></table>`;
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
$('adminLoginPass').addEventListener('keydown', e=>{ if(e.key === 'Enter') adminLogin(); });
$('adminChatInput')?.addEventListener('keydown', e=>{ if(e.key === 'Enter') sendAdminChat(); });
loadAdmin();
