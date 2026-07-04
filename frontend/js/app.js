const API = '/api/v1';
let token = localStorage.getItem('token') || '';
let currentUser = JSON.parse(localStorage.getItem('user') || 'null');
let currentBooks = [];
let activeBook = null;
let shelfState = {};
let readerStartAt = null;
let readerBookId = null;
let graphBookOptions = [];
let graphBookOptionsLoaded = false;
let currentView = 'home';
let currentAppState = {view:'home'};
let applyingHistoryState = false;
let reviewEditingCommentId = null;

function headers(){ return token ? {'Authorization': `Bearer ${token}`, 'Content-Type':'application/json'} : {'Content-Type':'application/json'}; }
async function api(path, opts={}){
  const res = await fetch(API + path, {headers: headers(), ...opts});
  if(!res.ok){ let t = await res.text(); try{ t=JSON.parse(t).detail || t; }catch(e){} throw new Error(t || res.statusText); }
  return res.json();
}
function $(id){ return document.getElementById(id); }
function setTitle(t){ $('pageTitle').textContent = t; }
function toast(msg){ const el=document.createElement('div'); el.className='toast'; el.textContent=msg; document.body.appendChild(el); setTimeout(()=>el.remove(),2600); }
function isAdmin(){ return !!(currentUser && currentUser.is_admin); }
function isLoggedIn(){ return !!(token && currentUser); }
function updateAdminVisibility(){
  const adminNav = document.querySelector('[data-view="admin"]');
  if(adminNav) adminNav.classList.toggle('hidden', !isAdmin());
  if(!isAdmin() && $('admin')?.classList.contains('active')) activateView('home');
}
function updateUserBadge(){
  const loggedIn = isLoggedIn();
  if($('userBadge')){
    $('userBadge').textContent = loggedIn ? `${currentUser.nickname || currentUser.username}${currentUser.is_admin ? ' · 管理员' : ''}` : '未登录';
  }
  if($('loginBtn')) $('loginBtn').classList.toggle('hidden', loggedIn);
  if($('adminBtn')) $('adminBtn').classList.toggle('hidden', loggedIn);
  if($('logoutBtn')) $('logoutBtn').classList.toggle('hidden', !loggedIn);
  updateAdminVisibility();
}
function logout(){
  token = ''; currentUser = null;
  localStorage.removeItem('token'); localStorage.removeItem('user');
  updateUserBadge(); toast('已退出登录'); loadAll();
}
function attr(value){ return String(value ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function stat(label, value){ return `<div class="stat"><b>${value}</b><span>${label}</span></div>`; }
function isInShelf(bookId, shelf){ return !!(shelfState[bookId] && shelfState[bookId][shelf]); }
function shelfStatus(shelf){ return shelf === '在读' ? 'reading' : shelf === '已读' ? 'read' : 'want_to_read'; }
function shelfButton(bookId, shelf){
  const active = isInShelf(bookId, shelf);
  const text = active ? `取消${shelf.replace('加入','')}` : `加入${shelf}`;
  return `<button class="shelf-action ${active ? 'active' : ''}" data-book="${bookId}" data-shelf="${shelf}" onclick="toggleShelf(event, ${bookId}, '${shelf}')">${text}</button>`;
}
function refreshShelfButtons(bookId){
  document.querySelectorAll(`[data-book="${bookId}"][data-shelf]`).forEach(btn=>{
    const shelf = btn.dataset.shelf;
    const active = isInShelf(bookId, shelf);
    btn.classList.toggle('active', active);
    btn.textContent = active ? `取消${shelf}` : `加入${shelf}`;
  });
}
function stateUrl(state){
  if(state?.reader) return `#reader-${state.reader}`;
  if(state?.detail) return `#book-${state.detail}`;
  if(state?.view && state.view !== 'home') return `#${state.view}`;
  return location.pathname || '/';
}
function pushAppState(state, replace=false){
  currentAppState = {...state};
  const method = replace ? 'replaceState' : 'pushState';
  history[method](currentAppState, '', stateUrl(currentAppState));
}
function hideReaderModal(){
  $('readerModal')?.classList.add('hidden');
  if($('readerContent')) $('readerContent').innerHTML = '';
  readerStartAt = null;
  readerBookId = null;
}
function hideDetailModal(){
  $('detailModal')?.classList.add('hidden');
}
async function loadShelfState(){
  shelfState = {};
  if(!token) return shelfState;
  try{
    const data = await api('/ecosystem/shelves');
    for(const shelf of data.shelves || []){
      for(const item of shelf.books || []){
        const id = item.book?.id || item.book?.book_id;
        if(!id) continue;
        shelfState[id] = shelfState[id] || {};
        shelfState[id][shelf.name] = true;
      }
    }
  }catch(e){ shelfState = {}; }
  return shelfState;
}

function bookCard(b){
  const id = b.id || b.book_id;
  const tags = (b.tags||[]).slice(0,3).map(t=>`<span class="tag">${t}</span>`).join('');
  return `<article class="book-card" data-book-card="${id}" onclick="openDetail(${id})"><img class="cover" src="${b.cover_url||''}" onerror="this.src='' ; this.style.background='linear-gradient(135deg,#1e293b,#7c3aed)'"><div class="book-info"><div class="book-card-header"><h4 class="book-card-title" title="${attr(b.title)}">${b.title}</h4></div><p class="meta">${(b.authors||[]).join('、')||b.author||'未知作者'} · ${b.category||''} · ⭐${b.avg_rating||0}</p><div class="tags">${tags}</div>${b.reason?`<p class="reason">${b.reason}</p>`:''}<div class="card-actions">${shelfButton(id,'想读')}<button class="feedback-action negative" onclick="markNotInterested(event, ${id})">不感兴趣</button></div></div></article>`;
}
async function recordFeedback(bookId, eventType, source='frontend'){
  if(!bookId) return;
  try{
    await api('/recommend/feedback', {
      method:'POST',
      body:JSON.stringify({book_id:bookId, event_type:eventType, source})
    });
  }catch(e){
    console.warn('feedback failed', e);
  }
}
async function markNotInterested(event, bookId){
  event?.stopPropagation?.();
  await recordFeedback(bookId, 'not_interested', 'detail_or_card');
  document.querySelectorAll(`[data-book-card="${bookId}"]`).forEach(el=>el.classList.add('faded-out'));
  currentBooks = currentBooks.filter(b => String(b.id || b.book_id) !== String(bookId));
  setTimeout(()=>{
    document.querySelectorAll(`[data-book-card="${bookId}"]`).forEach(el=>el.remove());
  }, 180);
  closeDetail();
  toast('已减少类似推荐');
}
function recordExposure(items, source='home'){
  if(!Array.isArray(items)) return;
  items.slice(0, 20).forEach(b=>{
    const id = b.id || b.book_id;
    if(id) recordFeedback(id, 'exposure', source);
  });
}
function miniItem(b){ return `<div class="mini-item" onclick="openDetail(${b.id || b.book_id})"><div><b>${b.title}</b><br><span>${(b.authors||[]).join('、')||b.author||''} · ⭐ ${b.avg_rating||0}</span></div><span>${b.category||''}</span></div>`; }
function buildPurchaseChannels(book){
  const keyword = encodeURIComponent([book?.title, book?.author].filter(Boolean).join(' '));
  return [
    ['京东图书', `https://search.jd.com/Search?keyword=${keyword}`],
    ['当当网', `http://search.dangdang.com/?key=${keyword}`],
    ['淘宝', `https://s.taobao.com/search?q=${keyword}`],
    ['孔夫子旧书网', `https://search.kongfz.com/product_result/?key=${keyword}`],
  ].map(([platform, url]) => ({platform, url, action_text:'前往搜索'}));
}
function purchaseChannelsHtml(book, purchase){
  const channels = purchase.purchase_channels?.length ? purchase.purchase_channels : (book.purchase_channels?.length ? book.purchase_channels : buildPurchaseChannels(book));
  const rows = channels.map(c => `<a class="purchase-row" href="${attr(c.url)}" target="_blank" rel="noopener noreferrer" onclick="recordPurchaseClick(${book.id}, '${attr(c.platform)}')"><span class="purchase-platform">${c.platform}</span><span class="purchase-action">${c.action_text || '前往搜索'}</span></a>`).join('');
  return `<section class="purchase-section"><h3>购书渠道</h3><div class="purchase-list">${rows}</div><p class="purchase-tip">系统根据书名和作者自动生成购书搜索入口，实际价格、库存和版本信息请以第三方平台页面为准。</p></section>`;
}
function recordPurchaseClick(bookId, platform){ fetch(`${API}/ecosystem/purchase-click/${bookId}?channel=${encodeURIComponent(platform)}`, {method:'POST', headers:headers()}).catch(()=>{}); }

async function login(user='demo', pass='demo123', openAdmin=false){
  const data = await api('/user/login', {method:'POST', body: JSON.stringify({account:user, username_or_email:user, password:pass})});
  token = data.access_token; currentUser = data.user;
  localStorage.setItem('token', token); localStorage.setItem('user', JSON.stringify(currentUser));
  updateUserBadge(); toast('登录成功'); await loadAll();
  if(openAdmin && isAdmin()) activateView('admin');
}
async function loadMetrics(){
  const dash = token ? await api('/admin/dashboard').catch(()=>null) : null;
  const gs = await api('/graph/stats').catch(()=>({}));
  if($('mBooks')){
    $('mBooks').textContent = dash?.cards?.books ?? gs.books ?? '--';
  }
  if($('mComments')){
    $('mComments').textContent = dash?.cards?.comments ?? '--';
  }
}
async function loadRecommendations(){ await loadShelfState(); const data = await api('/recommend/home?limit=16'); currentBooks = data.items; $('recommendGrid').innerHTML = data.items.map(bookCard).join(''); recordExposure(data.items, 'home'); populateGraphBookSelect(); }
async function loadHot(){ const data = await api('/recommend/hot?limit=8'); $('hotList').innerHTML = data.items.map(miniItem).join(''); }
async function loadNew(){ const data = await api('/recommend/new?limit=8'); $('newList').innerHTML = data.items.map(miniItem).join(''); }
async function loadBooks(q=''){
  await loadShelfState();
  const data = await api('/books' + (q ? `?q=${encodeURIComponent(q)}&limit=40&mode=hybrid` : '?limit=40'));
  currentBooks = data.items;
  $('resultHint').textContent = `找到 ${data.total} 本相关图书 · ${data.search_backend}`;
  $('bookGrid').innerHTML = data.items.map(bookCard).join('');
  recordExposure(data.items, q ? 'search' : 'discover');
  populateGraphBookSelect();
}
async function loadOptions(){
  const data = await api('/books/meta/options');
  $('chips').innerHTML = [...data.categories.slice(0,8), ...data.tags.slice(0,12)].map(x=>`<button class="chip" onclick="searchByKeyword('${attr(x)}')">${x}</button>`).join('');
}
async function loadHotSearches(){
  const data = await api('/books/hot-searches?limit=10').catch(()=>({items:[]}));
  $('hotSearches').innerHTML = (data.items||[]).map(x=>`<button class="chip hot" onclick="searchByKeyword('${attr(x.keyword)}')">${x.keyword}${x.count?` · ${x.count}`:''}</button>`).join('');
}
function searchByKeyword(keyword){
  document.querySelector('[data-view="discover"]').click();
  $('globalSearch').value = keyword;
  loadBooks(keyword);
}

function pathTypeLabel(type){ return ({same_author:'同作者', same_tag:'同标签', same_series:'同系列', same_publisher:'同出版社', similar:'相似图书', multi_hop:'多跳语义', same_field:'同领域', same_audience:'同适读人群', same_keyword:'共同关键词', same_difficulty:'同阅读难度', topic_bridge:'主题桥接', next_read:'续读路径', prerequisite:'前置阅读'}[type] || type || '关联'); }
function recommendationExplainHtml(sourceBook, sim){
  const lines = [];
  for(const item of (sim.items || []).slice(0,5)){
    const paths = item.paths && item.paths.length ? item.paths : [];
    for(const p of paths.slice(0,4)){
      const via = (p.via || []).join('、') || pathTypeLabel(p.type);
      const line = p.path_text || `《${sourceBook.title}》 → ${pathTypeLabel(p.type)}：${via} → 《${item.title}》`;
      lines.push(`<div class="path-line"><span>${line}</span><em>权重 ${Number(p.weight||0).toFixed(2)}</em></div>`);
    }
  }
  const pathHtml = lines.length ? lines.join('') : '<p class="meta">暂无可解释路径，建议先同步知识图谱或补充图书标签。</p>';
  return `<div class="recommend-explain"><h3>知识图谱关联</h3><h4>推荐路径：</h4><div class="path-list">${pathHtml}</div><h4>推荐来源：</h4><div class="weight-list"><div><span>知识图谱</span><b>40%</b></div><div><span>协同过滤</span><b>40%</b></div><div><span>热门度</span><b>10%</b></div><div><span>新书</span><b>10%</b></div></div></div>`;
}
async function recordReadingAction(bookId, status='reading', source='detail'){
  if(!token) return;
  api(`/user/history/${bookId}?status=${encodeURIComponent(status)}&source=${encodeURIComponent(source)}`, {method:'POST'}).catch(()=>{});
}
function stars(value){
  const rating = Number(value || 0);
  return Array.from({length:5}, (_, i)=>`<span class="${i < Math.round(rating) ? 'on' : ''}">★</span>`).join('');
}
function reviewSummaryHtml(comments){
  const summary = comments.summary || {};
  const dist = summary.distribution || {};
  const max = Math.max(1, ...Object.values(dist).map(Number));
  const rows = [5,4,3,2,1].map(n=>`<div class="rating-bar"><span>${n}星</span><i><b style="width:${((Number(dist[n]||0)/max)*100).toFixed(0)}%"></b></i><em>${dist[n]||0}</em></div>`).join('');
  return `<div class="review-summary"><div class="review-score"><b>${Number(summary.avg_rating||0).toFixed(1)}</b><div class="stars">${stars(summary.avg_rating)}</div><span>${summary.total||0} 条书评 · ${summary.rating_count||0} 个评分</span></div><div class="rating-bars">${rows}</div></div>`;
}
function reviewCardHtml(c, bookId){
  const mine = currentUser && c.user_id === currentUser.id;
  const canManage = mine || isAdmin();
  return `<article class="review-card ${c.is_pinned ? 'pinned' : ''}">
    <div class="review-head"><div><b>${attr(c.nickname || c.username || '匿名用户')}</b>${c.is_pinned?'<span class="review-pin">置顶</span>':''}<div class="stars">${stars(c.rating)}</div></div><time>${(c.created_at||'').slice(0,10)}</time></div>
    <p>${attr(c.content || '')}</p>
    <div class="review-actions">
      <button class="ghost ${c.liked?'active':''}" onclick="likeComment(${c.id}, ${bookId})">❤ ${c.likes_count||0}</button>
      ${canManage ? `<button class="ghost" onclick="editComment(${c.id}, ${bookId})">编辑</button><button class="ghost danger" onclick="deleteComment(${c.id}, ${bookId})">删除</button>` : ''}
    </div>
  </article>`;
}
function reviewsHtml(bookId, comments){
  const items = comments.items || [];
  const list = items.length ? items.map(c=>reviewCardHtml(c, bookId)).join('') : '<div class="empty-review">还没有书评，来写第一条吧。</div>';
  return `<section class="reviews-section"><div class="section-title compact"><h3>书评社区</h3><span>读者评分、短评和精选讨论</span></div>${reviewSummaryHtml(comments)}<div class="review-compose" id="reviewCompose"><div><b id="reviewComposeTitle">写一条书评</b><span id="reviewComposeHint">分享读后感，也可以顺手给本书评分。</span></div><select id="reviewRating"><option value="5">5 星</option><option value="4">4 星</option><option value="3">3 星</option><option value="2">2 星</option><option value="1">1 星</option></select><textarea id="reviewContent" placeholder="这本书哪里打动了你？适合推荐给谁？"></textarea><div class="review-compose-actions"><button class="primary" id="reviewSubmitBtn" onclick="submitReview(${bookId})">发布书评</button><button class="ghost hidden" id="reviewCancelBtn" onclick="cancelReviewEdit()">取消编辑</button></div></div><div class="review-list">${list}</div></section>`;
}
async function openDetail(id, opts={}){
  const push = opts.push !== false;
  reviewEditingCommentId = null;
  const b = await api(`/books/${id}`); activeBook=b;
  await loadShelfState();
  recordFeedback(id, 'click', 'detail');
  const sim = await api(`/recommend/similar/${id}?limit=6`).catch(()=>({items:[]}));
  const comments = await api(`/ecosystem/comments/${id}`).catch(()=>({items:[]}));
  const purchase = await api(`/ecosystem/purchase-links/${id}`).catch(()=>({links:[]}));
  $('detailContent').innerHTML = `<div class="detail-head"><img class="detail-cover" src="${b.cover_url}"><div><span class="pill">${b.category||'图书'}</span><h2>${b.title}</h2><p class="meta">${(b.authors||[]).join('、')} · ${b.publisher||''} · ${b.publication_year||''} · <a href="javascript:void(0)" onclick="scrollToReviews()" class="rating-link">⭐ ${b.avg_rating} (${b.rating_count}人评分)</a></p><div class="tags">${(b.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div><p>${b.description||''}</p><div class="actions"><button class="primary" onclick="openReader(${b.id})">在线试读</button>${shelfButton(b.id,'想读')}<button onclick="scrollToReviews()">评分</button><button class="feedback-action negative" onclick="markNotInterested(event, ${b.id})">不感兴趣</button></div>${purchaseChannelsHtml(b, purchase)}</div></div><div class="detail-recommend-section"><h3>你可能也喜欢</h3><div class="mini-list">${sim.items.map(miniItem).join('')||'暂无推荐'}</div></div>${reviewsHtml(b.id, comments)}`;
  const myCommentId = comments.summary?.my_comment_id;
  if(myCommentId){
    const mine = (comments.items || []).find(c => c.id === myCommentId);
    enterReviewEdit(mine, false);
  }
  $('detailModal').classList.remove('hidden');
  if(push) pushAppState({view:currentView, detail:id});
}
function closeDetail(){
  if(currentAppState?.detail && !currentAppState?.reader) history.back();
  else hideDetailModal();
}
async function openReader(id, startPage=1, opts={}){
  const push = opts.push !== false;
  const data = await api(`/ecosystem/trial/${id}`);
  readerStartAt = Date.now(); readerBookId = id;
  recordReadingAction(id, 'reading', 'reader');
  let readerUrl = data.reader_url;
  readerUrl += (readerUrl.includes('?') ? '&' : '?') + `page=${encodeURIComponent(startPage || 1)}`;
  $('readerContent').innerHTML = `<iframe src="${readerUrl}" class="reader-frame" title="${data.book.title} 在线试读"></iframe>`;
  $('readerModal').classList.remove('hidden');
  if(push) pushAppState({view:currentView, detail:activeBook?.id, reader:id, page:startPage || 1});
}
function closeReader(){
  if(currentAppState?.reader) history.back();
  else hideReaderModal();
}
async function openReaderFromUrl(params=new URLSearchParams(location.search)){
  const readerId = Number(params.get('reader') || 0);
  if(!readerId) return;
  const startPage = Math.max(1, Number(params.get('page')) || 1);
  pushAppState({view:'home'}, true);
  try{
    await openDetail(readerId, {push:true});
    await openReader(readerId, startPage, {push:true});
  }catch(e){
    toast(e.message || '阅读器打开失败');
  }
}
async function saveProgress(id, percent){
  if(!token) return toast('请先登录');
  const minutes = readerStartAt && readerBookId === id ? Math.max(0, Math.round((Date.now() - readerStartAt) / 60000)) : 0;
  await api(`/user/progress/${id}`, {method:'POST', body:JSON.stringify({current_page:Math.max(1, Math.round(percent*3)), progress_percent:percent, reading_minutes:minutes, last_device:'Web'})});
  readerStartAt = Date.now();
  toast(minutes ? `阅读进度已保存，本次阅读 ${minutes} 分钟` : '阅读进度已保存');
  await Promise.allSettled([loadProfile(), loadShelves(), loadShelfState()]);
}
async function toggleShelf(event, id, shelf){
  event?.stopPropagation?.();
  if(!token) return toast('请先登录');
  const active = isInShelf(id, shelf);
  if(active){
    await api(`/ecosystem/shelves/book/${id}?shelf_name=${encodeURIComponent(shelf)}`, {method:'DELETE'});
    if(shelfState[id]) delete shelfState[id][shelf];
    toast(`已取消${shelf}`);
  }else{
    await api(`/ecosystem/shelves/book/${id}`, {method:'POST', body:JSON.stringify({shelf_name:shelf, reading_status:shelfStatus(shelf)})});
    shelfState[id] = shelfState[id] || {}; shelfState[id][shelf] = true;
    toast(`已加入${shelf}`);
  }
  refreshShelfButtons(id);
  await Promise.allSettled([loadShelves(), loadProfile(), loadHistory()]);
}
async function addShelf(id, shelf){ return toggleShelf(null, id, shelf); }
function scrollToReviews(){ const el=document.querySelector('#detailContent .reviews-section'); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); }
function resetReviewForm(){
  reviewEditingCommentId = null;
  if($('reviewComposeTitle')) $('reviewComposeTitle').textContent = '写一条书评';
  if($('reviewComposeHint')) $('reviewComposeHint').textContent = '分享读后感，也可以顺手给本书评分。';
  if($('reviewSubmitBtn')) $('reviewSubmitBtn').textContent = '发布书评';
  if($('reviewCancelBtn')) $('reviewCancelBtn').classList.add('hidden');
  if($('reviewContent')) $('reviewContent').value = '';
  if($('reviewRating')) $('reviewRating').value = '5';
}
function cancelReviewEdit(){
  resetReviewForm();
  $('reviewContent')?.focus();
}
function enterReviewEdit(comment, scroll=false){
  if(!comment) return;
  reviewEditingCommentId = comment.id;
  if($('reviewContent')) $('reviewContent').value = comment.content || '';
  if($('reviewRating')) $('reviewRating').value = String(Math.max(1, Math.min(5, Math.round(Number(comment.rating || 5)))));
  if($('reviewComposeTitle')) $('reviewComposeTitle').textContent = '编辑我的书评';
  if($('reviewComposeHint')) $('reviewComposeHint').textContent = '你已经写过书评，这里会更新原来的评论。';
  if($('reviewSubmitBtn')) $('reviewSubmitBtn').textContent = '提交修改';
  if($('reviewCancelBtn')) $('reviewCancelBtn').classList.remove('hidden');
  if(scroll){
    const compose = $('reviewCompose');
    if(compose) compose.scrollIntoView({behavior:'smooth', block:'start'});
    setTimeout(()=>$('reviewContent')?.focus(), 260);
  }
}
async function submitReview(id){
  if(!token) return toast('请先登录');
  const content = $('reviewContent')?.value.trim();
  const rating = Number($('reviewRating')?.value || 5);
  if(!content) return toast('请先写一点书评内容');
  if(reviewEditingCommentId){
    await api(`/ecosystem/comments/${reviewEditingCommentId}`, {method:'PUT', body:JSON.stringify({content, rating})});
    toast('书评已更新');
  }else{
    await api(`/ecosystem/comments/${id}`, {method:'POST', body:JSON.stringify({content, rating})});
    toast('评论已发布');
  }
  resetReviewForm();
  openDetail(id, {push:false}); loadProfile();
}
async function commentBook(id){ return submitReview(id); }
async function likeComment(commentId, bookId){
  if(!token) return toast('请先登录');
  await api(`/ecosystem/comments/${commentId}/like`, {method:'POST'});
  openDetail(bookId, {push:false});
}
async function editComment(commentId, bookId){
  if(!token) return toast('请先登录');
  const data = await api(`/ecosystem/comments/${bookId}`).catch(()=>({items:[]}));
  const comment = (data.items || []).find(c => c.id === commentId);
  if(!comment) return toast('没有找到这条书评');
  enterReviewEdit(comment, true);
}
async function deleteComment(commentId, bookId){
  if(!token) return toast('请先登录');
  if(!confirm('确认删除这条书评？')) return;
  await api(`/ecosystem/comments/${commentId}`, {method:'DELETE'});
  toast('书评已删除');
  openDetail(bookId, {push:false});
}

function graphTypeLabel(type){ return ({Profile:'画像',InterestCluster:'兴趣簇',SeedBook:'种子书',Book:'图书',Author:'作者',Tag:'标签',Publisher:'出版社',Series:'丛书/系列',Field:'领域',Audience:'适读人群',Difficulty:'阅读难度',Keyword:'关键词',Topic:'主题'}[type] || type || '节点'); }
function graphRelationLabel(label){ return ({INTEREST_SEED:'兴趣种子',PROFILE_CLUSTER:'兴趣簇',CLUSTER_RECOMMEND:'画像推荐',profile_cluster:'兴趣簇',PREFERS_TAG:'偏好标签',PREFERS_AUTHOR:'偏好作者',PREFERS_FIELD:'偏好领域',PROFILE_RECOMMEND:'画像推荐',LEADS_TO:'推出推荐',AUTHORED_BY:'作者',TAGGED_AS:'标签',PUBLISHED_BY:'出版社',BELONGS_TO_SERIES:'所属系列',SIMILAR_TO:'相似推荐',BELONGS_TO_FIELD:'领域',SUITABLE_FOR:'适读人群',HAS_DIFFICULTY:'阅读难度',HAS_KEYWORD:'关键词',HAS_TOPIC:'主题',NEXT_READ:'续读推荐',PREREQUISITE_OF:'前置阅读',same_author:'同作者',same_tag:'同标签',same_field:'同领域',same_audience:'同适读人群',topic_bridge:'主题桥接',same_keyword:'共同关键词',same_difficulty:'同阅读难度',similar:'相似推荐',multi_hop:'多跳语义'}[label] || label || '关联'); }
function graphColor(type){ return ({Profile:'#111827',InterestCluster:'#f97316',SeedBook:'#6366f1',Book:'#7c3aed',Author:'#0ea5e9',Tag:'#10b981',Publisher:'#f59e0b',Series:'#ef4444',Field:'#14b8a6',Audience:'#ec4899',Difficulty:'#8b5cf6',Keyword:'#22c55e',Topic:'#f97316'}[type] || '#64748b'); }
function graphLegendHtml(){ return ['Profile','InterestCluster','SeedBook','Book','Author','Tag','Field','Audience','Difficulty','Keyword','Topic'].map(t=>`<div class="legend-row"><i style="background:${graphColor(t)}"></i><span>${graphTypeLabel(t)}</span></div>`).join(''); }
function mergeGraphBookOptions(rows){
  const map = new Map((graphBookOptions || []).map(b => [String(b.id || b.book_id), b]));
  for(const b of rows || []){
    const id = b.id || b.book_id;
    if(id) map.set(String(id), b);
  }
  graphBookOptions = Array.from(map.values()).filter(b => b.id || b.book_id);
}
function populateGraphBookSelect(force=false){
  const sel = $('graphBookSelect'); if(!sel) return;
  mergeGraphBookOptions(currentBooks);
  const previous = sel.value;
  const rows = (graphBookOptions.length ? graphBookOptions : currentBooks).filter(b => b && (b.id || b.book_id));
  const currentValues = Array.from(sel.options || []).map(o => o.value);
  const firstRowId = rows[0] ? String(rows[0].id || rows[0].book_id) : '';
  const hasRealOptions = currentValues.some(v => v && v !== '__empty__');
  if(!force && hasRealOptions && previous && rows.length && currentValues.includes(firstRowId)) return;
  if(!rows.length){
    sel.innerHTML = '<option value="__empty__">暂无可选图书</option>';
    return;
  }
  sel.innerHTML = rows.slice(0,120).map(b=>`<option value="${b.id || b.book_id}">${attr(b.title || '未命名图书')}</option>`).join('');
  if(previous && previous !== '__empty__' && Array.from(sel.options).some(o=>o.value===previous)) sel.value = previous;
  else if(activeBook?.id && Array.from(sel.options).some(o=>o.value===String(activeBook.id))) sel.value = String(activeBook.id);
}
async function ensureGraphBookOptions(force=false){
  // 手动选择图书不能只依赖当前推荐列表。进入知识图谱页时主动拉取全量可选图书，
  // 避免下拉框只出现“默认图书”。
  if(!force && graphBookOptionsLoaded && graphBookOptions.length){
    populateGraphBookSelect(false);
    return graphBookOptions;
  }
  try{
    const data = await api('/books?limit=120&sort=hot');
    mergeGraphBookOptions(data.items || []);
    graphBookOptionsLoaded = true;
  }catch(e){
    mergeGraphBookOptions(currentBooks);
  }
  populateGraphBookSelect(true);
  return graphBookOptions;
}
async function onGraphModeChange(){
  const mode = $('graphMode')?.value || 'profile';
  const wrap = $('graphBookPickerWrap');
  if(wrap) wrap.classList.toggle('hidden', mode !== 'manual');
  if(mode === 'manual') await ensureGraphBookOptions();
  await loadGraph();
}

function graphExplainHtml(data){
  const center = (data.nodes || []).find(n => n.id === data.center) || (data.nodes || [])[0];
  const counts = (data.nodes || []).reduce((acc,n)=>{ acc[n.type]=(acc[n.type]||0)+1; return acc; }, {});
  const rels = [...new Set((data.edges || []).map(e=>graphRelationLabel(e.relation || e.label || e.type)))].filter(Boolean).slice(0,12);
  const title = data.mode === 'profile' ? '画像中心说明' : (['recent','high_rated'].includes(data.mode) ? '多种子图谱说明' : '图谱说明');
  const desc = data.mode === 'profile'
    ? '当前图谱以“我的阅读画像”为中心，先把分散行为归纳为兴趣簇，再从兴趣簇连接到推荐图书；作者、标签等原始证据放在右侧摘要中，不再全部堆到主图里。'
    : (['recent','high_rated'].includes(data.mode)
      ? '当前图谱不再只选一本中心书，而是选取多本代表性种子书作为起点，再沿作者、标签、主题、领域等语义关系生成推荐路径。'
      : '当前图谱以手动选定图书为中心，展示该图书的一跳/二跳语义关系和可解释推荐路径。');
  return `<div class="graph-side-card"><h4>${title}</h4><p><b>中心节点：</b>${center ? center.label : '我的阅读画像'}</p><p>${desc}</p><p><b>关系类型：</b>${rels.join('、') || '暂无关系'}</p><p><b>实体统计：</b>兴趣簇 ${counts.InterestCluster||0}，种子书 ${counts.SeedBook||0}，推荐书 ${counts.Book||0}，标签 ${counts.Tag||0}，领域 ${counts.Field||0}，人群 ${counts.Audience||0}，主题 ${counts.Topic||0}</p></div>`;
}
function pathCardsHtml(data){
  const rows = data.path_cards || [];
  if(!rows.length) return '<div class="graph-side-card"><h4>推荐路径</h4><p class="meta">暂无路径。可以先登录、评分、加入书架或同步知识图谱。</p></div>';
  return `<div class="graph-side-card"><h4>推荐路径</h4><div class="path-list compact">${rows.slice(0,8).map(p=>`<div class="path-line"><span>${p.path_text}</span><em>${graphRelationLabel(p.type)} · 权重 ${Number(p.weight||0).toFixed(2)}</em></div>`).join('')}</div></div>`;
}
function getKnowledgeGraphRoot(){
  return (
    document.getElementById('knowledgeGraphView') ||
    document.getElementById('graph')
  );
}

function getKnowledgeGraphMain(){
  const root = getKnowledgeGraphRoot();
  if(!root) return null;

  return (
    document.getElementById('knowledgeGraphMain') ||
    root.querySelector('.graph-canvas-card')
  );
}

function getKnowledgeGraphAside(){
  const root = getKnowledgeGraphRoot();
  if(!root) return null;

  return (
    document.getElementById('graphInfo') ||
    root.querySelector('.graph-info')
  );
}

function ensureGraphCanvas(){
  const graphRoot = getKnowledgeGraphRoot();
  const graphMain = getKnowledgeGraphMain();

  if(!graphMain) return;

  if(!document.getElementById('graphSvg')){
    graphMain.innerHTML = `
      <svg id="graphSvg" viewBox="0 0 1180 720"></svg>
    `;
  }

  if(graphRoot){
    graphRoot.querySelectorAll('.graph-toolbar, .graph-filter, .graph-controls').forEach(el => {
      el.style.display = '';
    });
  }
}

function renderGraphLocked(){
  const graphRoot = getKnowledgeGraphRoot();
  const graphMain = getKnowledgeGraphMain();
  const graphAside = getKnowledgeGraphAside();

  if(!graphMain){
    console.warn('没有找到知识图谱主区域，未登录锁定页没有渲染');
    return;
  }

  graphMain.innerHTML = `
    <div class="graph-locked-card">
      <div class="graph-locked-visual">
        <div class="locked-node center">我的<br>阅读画像</div>
        <div class="locked-node n1">兴趣</div>
        <div class="locked-node n2">图书</div>
        <div class="locked-node n3">作者</div>
        <div class="locked-node n4">标签</div>

        <span class="locked-line l1"></span>
        <span class="locked-line l2"></span>
        <span class="locked-line l3"></span>
        <span class="locked-line l4"></span>
      </div>

      <div class="graph-locked-content">
        <div class="graph-locked-icon">KG</div>
        <h3>登录后查看你的画像图谱</h3>
        <p>
          知识图谱会根据你的阅读历史、收藏、评分、搜索关键词和兴趣标签，
          生成属于你的个性化阅读关系图。
        </p>

        <div class="graph-locked-preview">
          <span>阅读画像</span>
          <i></i>
          <span>兴趣簇</span>
          <i></i>
          <span>推荐图书</span>
        </div>

        <button onclick="window.location.href='/login?role=user'">
          登录后查看图谱
        </button>
      </div>
    </div>
  `;

  if(graphAside){
    graphAside.innerHTML = `
      <div class="graph-locked-side">
        <h3>图谱功能已锁定</h3>
        <p>登录后可以查看：</p>
        <ul>
          <li>个人兴趣簇</li>
          <li>种子书关联</li>
          <li>推荐路径解释</li>
          <li>作者、标签、领域关系</li>
        </ul>
      </div>
    `;
  }

  if(graphRoot){
    graphRoot.querySelectorAll('.graph-toolbar, .graph-filter, .graph-controls').forEach(el => {
      el.style.display = 'none';
    });
  }
}
async function loadGraph(){
    if(!token){
    renderGraphLocked();
    return;
  }
  ensureGraphCanvas();
  const mode = $('graphMode')?.value || 'profile';
  const limit = Number($('graphNodeLimit')?.value || 20);
  if(mode === 'manual') await ensureGraphBookOptions();
  else populateGraphBookSelect(false);
  const manualId = $('graphBookSelect')?.value || activeBook?.id || currentBooks[0]?.id || '';
  if(mode === 'manual' && (!manualId || manualId === '__empty__')){
    toast('暂无可选中心图书，请先导入或初始化图书数据');
    return;
  }
  let path = `/graph/profile-graph?mode=${encodeURIComponent(mode)}&limit=${limit}&depth=2`;
  if(mode === 'manual') path += `&book_id=${manualId}`;
  const data = await api(path);
  $('graphTitle').textContent = data.title || (mode === 'profile' ? '我的画像图谱' : '中心图书图谱');
  $('graphSubtitle').textContent = mode === 'profile'
    ? '以用户画像为中心，综合多个兴趣种子进行知识图谱推理'
    : (['recent','high_rated'].includes(mode)
      ? '以多本代表性种子书为起点，展示“兴趣种子 → 语义关系 → 推荐图书”的解释路径'
      : '以手动选定图书为中心，展示“中心图书 → 语义关系 → 推荐图书”的解释路径');
  renderGraph(data);
  const summary = data.semantic_summary || {};
  const semanticHtml = Object.keys(summary).length ? `<div class="graph-side-card"><h4>${mode==='profile'?'画像摘要':'语义画像'}</h4>${Object.entries(summary).map(([k,v])=>`<p><b>${graphTypeLabel(k)}：</b>${(v||[]).slice(0,6).join('、') || '暂无'}</p>`).join('')}</div>` : '';
  $('graphInfo').innerHTML = `<div class="graph-side-card"><h4>图例说明</h4>${graphLegendHtml()}</div>` + graphExplainHtml(data) + semanticHtml + pathCardsHtml(data) + `<div class="graph-side-card"><h4>运行状态</h4><p>图谱后端：${data.backend}</p><p>节点 ${data.nodes.length} · 关系 ${data.edges.length}${data.trimmed?' · 已限制节点数量':''}</p></div>`;
}
function distributeYs(count, top=90, bottom=630){
  if(count <= 0) return [];
  if(count === 1) return [(top+bottom)/2];
  const step = (bottom-top)/(count-1);
  return Array.from({length:count}, (_,i)=>top+i*step);
}
function nodeLayer(n, centerId){
  if(n.id === centerId || n.type === 'Profile') return 'center';
  if(n.type === 'SeedBook' || n.type === 'InterestCluster') return 'seed';
  if(n.type === 'Book') return 'book';
  return 'semantic';
}
function renderGraph(data){
  const nodes = data.nodes || [], edges = data.edges || [];
  const svg=$('graphSvg');
  const W=1280,H=820;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  if(!nodes.length){ svg.innerHTML='<text x="590" y="360" text-anchor="middle" class="node-label">暂无图谱数据</text>'; return; }
  const centerId = data.center || nodes.find(n=>n.type==='Profile')?.id || nodes.find(n=>n.type==='Book')?.id || nodes[0].id;
  const centerNode = nodes.find(n=>n.id===centerId) || nodes[0];
  const pos={};
  pos[centerNode.id] = {x:110,y:H/2};

  const seedLayer = nodes.filter(n => n.id !== centerNode.id && n.type === 'SeedBook');
  const semanticLayer = nodes.filter(n => n.id !== centerNode.id && !['Book','SeedBook','Profile'].includes(n.type));
  const bookLayer = nodes.filter(n => n.id !== centerNode.id && n.type === 'Book');

  // 分层布局：中心/种子/语义关系/推荐图书。避免圆形布局导致的遮挡和截断。
  const seedXs = seedLayer.length > 6 ? [330, 470] : [390];
  seedLayer.forEach((n,i)=>{ const col=i%seedXs.length; const items=seedLayer.filter((_,j)=>j%seedXs.length===col); const idx=items.indexOf(n); const ys=distributeYs(items.length,80,740); pos[n.id]={x:seedXs[col], y:ys[idx]}; });

  const midXs = semanticLayer.length > 10 ? [650, 800] : [720];
  semanticLayer.forEach((n,i)=>{ const col=i%midXs.length; const items=semanticLayer.filter((_,j)=>j%midXs.length===col); const idx=items.indexOf(n); const ys=distributeYs(items.length,70,750); pos[n.id]={x:midXs[col], y:ys[idx]}; });

  const bookXs = bookLayer.length > 9 ? [1040, 1180] : [1100];
  bookLayer.forEach((n,i)=>{ const col=i%bookXs.length; const items=bookLayer.filter((_,j)=>j%bookXs.length===col); const idx=items.indexOf(n); const ys=distributeYs(items.length,78,742); pos[n.id]={x:bookXs[col], y:ys[idx]}; });

  // 图谱主画布只展示节点与连线，边上的关系文字统一放到右侧“路径解释/图谱说明”中。
  // 这样可以避免高分图书图谱、画像图谱中横线标签压住节点和标题。
  const line=edges.map(e=>{
    const a=pos[e.source],b=pos[e.target]; if(!a||!b)return'';
    return `<g><line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="rgba(71,85,105,.34)" stroke-width="${1.0+Math.min(e.weight||1,1.5)*.8}" marker-end="url(#arrow)"/></g>`;
  }).join('');
  const ns=nodes.map(n=>{
    const p=pos[n.id]; if(!p)return'';
    const color=graphColor(n.type);
    const layer=nodeLayer(n, centerNode.id);
    const radius=layer==='center'?42:(n.type==='SeedBook'?28:(n.type==='Book'?27:24));
    const raw = String(n.label||'');
    const label = layer==='center' ? raw.slice(0,12) : raw.slice(0,13);
    const labelY = p.y + radius + 20;
    return `<g class="node" data-title="${attr(raw)}"><circle cx="${p.x}" cy="${p.y}" r="${radius}" fill="${color}" opacity=".94"/><text class="node-type" x="${p.x}" y="${p.y+4}" text-anchor="middle">${graphTypeLabel(n.type)}</text><text class="node-label" x="${p.x}" y="${labelY}" text-anchor="middle">${label}</text></g>`;
  }).join('');
  svg.innerHTML=`<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(71,85,105,.38)"/></marker></defs>${line}${ns}`;
}

async function loadShelves(){
  if(!token){ $('shelfGrid').innerHTML='<div class="panel">请先登录查看书架。</div>'; return; }
  const data=await api('/ecosystem/shelves');
  $('shelfGrid').innerHTML=data.shelves.map(s=>`<div class="shelf"><h4>${s.name} <span class="tag">${s.count}</span></h4><div class="mini-list">${s.books.slice(0,6).map(x=>miniItem(x.book)).join('')||'<span class="meta">暂无图书</span>'}</div></div>`).join('');
}
function progressText(value){
  const n = Number(value || 0);
  if(n >= 100) return '100%';
  if(n <= 0) return '0%';
  return `${Math.round(n)}%`;
}
function formatReadAt(value){
  if(!value) return '';
  const raw = String(value);
  const withZone = /([zZ]|[+-]\d{2}:?\d{2})$/.test(raw) ? raw : raw + 'Z';
  const d = new Date(withZone);
  if(Number.isNaN(d.getTime())){
    return raw;
  }
  return d.toLocaleString('zh-CN', {
    timeZone:'Asia/Shanghai',
    hour12:false,
    year:'numeric',
    month:'2-digit',
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit'
  });
}
function progressBarHtml(value){
  const n = Math.max(0, Math.min(100, Number(value || 0)));
  return `<span class="history-progress"><i style="width:${n}%"></i></span>`;
}
async function continueReading(bookId, currentPage=1){
  openReader(bookId, currentPage || 1);
}
async function loadHistory(){
  if(!token){
    if($('historyList')) $('historyList').innerHTML='<span class="meta">请先登录查看阅读历史。</span>';
    return;
  }
  const data = await api('/user/history').catch(()=>({items:[]}));
  const statusText = {want_to_read:'想读', reading:'在读', read:'已读'};
  $('historyList').innerHTML = (data.items||[]).slice(0,12).map(h=>{
    const percent = Number(h.progress_percent || 0);
    const page = Number(h.current_page || 1);
    return `<div class="mini-item history-item" onclick="openDetail(${h.book.id})"><div class="history-main"><b>${h.book.title}</b><br><span>${(h.book.authors||[]).join('、')} · ${statusText[h.status]||h.status} · 已读 ${progressText(percent)} · 第 ${page} 页 · ${formatReadAt(h.read_at)}</span>${progressBarHtml(percent)}</div><button onclick="event.stopPropagation();continueReading(${h.book.id}, ${page})">继续阅读</button></div>`;
  }).join('') || '<span class="meta">暂无阅读历史。</span>';
}
async function loadProfile(){
  if(!token){
    // 未登录状态下，不再显示空白大框，改成引导型占位内容
    if($('profileStats')){
      $('profileStats').innerHTML = `
        <div class="guest-stat-card">
          <b>登录后生成</b>
          <span>阅读统计</span>
          <p>累计阅读、今日阅读、连续阅读天数会在这里展示。</p>
        </div>
        <div class="guest-stat-card">
          <b>30 天</b>
          <span>阅读趋势</span>
          <p>系统会根据你的阅读时长生成趋势图。</p>
        </div>
        <div class="guest-stat-card">
          <b>兴趣分析</b>
          <span>画像建模</span>
          <p>根据收藏、评分、搜索和阅读行为生成兴趣画像。</p>
        </div>
        <div class="guest-stat-card">
          <b>个性推荐</b>
          <span>荐书依据</span>
          <p>用知识图谱解释为什么推荐这些书。</p>
        </div>
      `;
    }

    if($('tagCloud')){
      $('tagCloud').innerHTML = `
        <div class="guest-profile-card">
          <div class="guest-profile-icon">KG</div>
          <div>
            <h4>登录后查看你的兴趣画像</h4>
            <p>系统会从阅读历史、书架、评分、评论和搜索行为中提取偏好标签、偏好作者和偏好领域。</p>
          </div>
        </div>

        <div class="guest-chip-wrap">
          <span class="guest-chip">偏好标签</span>
          <span class="guest-chip">偏好作者</span>
          <span class="guest-chip">偏好分类</span>
          <span class="guest-chip">阅读种子书</span>
          <span class="guest-chip">知识图谱推荐</span>
          <span class="guest-chip">阅读趋势</span>
        </div>
      `;
    }

    if($('profileBooks')){
      $('profileBooks').innerHTML = `
        <div class="guest-mini-card">
          <b>推荐种子书</b>
          <span>登录后会根据你的高分图书、收藏图书和最近阅读生成。</span>
        </div>
        <div class="guest-mini-card">
          <b>兴趣簇</b>
          <span>例如：人工智能、科幻、文学、历史、心理等。</span>
        </div>
      `;
    }

    if($('historyList')){
      $('historyList').innerHTML = `
        <div class="guest-history-card">
          <div>
            <b>阅读历史将在登录后显示</b>
            <span>这里会按图书去重，展示最近阅读、收藏、评分行为。</span>
          </div>
          <button onclick="window.location.href='/login?role=user'">去登录</button>
        </div>
        <div class="guest-history-timeline">
          <div><i></i><span>阅读图书</span><em>记录阅读进度</em></div>
          <div><i></i><span>收藏书籍</span><em>加入想读 / 在读 / 已读</em></div>
          <div><i></i><span>形成画像</span><em>生成推荐依据</em></div>
        </div>
      `;
    }

    drawGuestTrend();
    return;
  }

  const [stats, profile]=await Promise.all([api('/user/stats'), api('/user/profile')]);

  $('profileStats').innerHTML =
    stat('累计阅读分钟',stats.total_reading_minutes) +
    stat('已完成图书',stats.completed_books) +
    stat('在读图书',stats.reading_books) +
    stat('书架数量',stats.shelf_count);

  $('tagCloud').innerHTML = (profile.tag_preferences||[])
    .map(t=>`<span class="cloud" style="font-size:${12+18*t.weight}px">${t.name}</span>`)
    .join('');

  $('profileBooks').innerHTML = (profile.recent_books||[])
    .slice(0,5)
    .map(miniItem)
    .join('');

  drawTrend(stats.trend_30d||[]);
  loadHistory();
}
function drawGuestTrend(){
  const c = $('trendCanvas');
  if(!c) return;

  const ctx = c.getContext('2d');
  const W = c.width;
  const H = c.height;
  const padL = 42;
  const padR = 18;
  const padT = 28;
  const padB = 42;

  ctx.clearRect(0, 0, W, H);

  ctx.font = '14px Microsoft YaHei, Arial';
  ctx.fillStyle = 'rgba(15,23,42,.82)';
  ctx.fillText('登录后生成近30天阅读趋势', padL, 18);

  ctx.strokeStyle = 'rgba(148,163,184,.28)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padL, padT);
  ctx.lineTo(padL, H - padB);
  ctx.lineTo(W - padR, H - padB);
  ctx.stroke();

  const mock = [8, 16, 10, 22, 18, 30, 14, 26, 20, 34, 24, 18, 28, 36];
  const max = 40;
  const gap = 8;
  const bw = Math.max(12, (W - padL - padR) / mock.length - gap);

  mock.forEach((v, i) => {
    const h = (v / max) * (H - padT - padB - 8);
    const x = padL + i * (bw + gap);
    const y = H - padB - h;

    const grd = ctx.createLinearGradient(0, y, 0, H - padB);
    grd.addColorStop(0, 'rgba(124,58,237,.42)');
    grd.addColorStop(1, 'rgba(14,165,233,.22)');

    ctx.fillStyle = grd;
    ctx.fillRect(x, y, bw, h);
  });

  ctx.fillStyle = 'rgba(100,116,139,.82)';
  ctx.font = '12px Microsoft YaHei, Arial';
  ctx.fillText('开始阅读、收藏、评分后，这里会显示真实趋势。', padL, H - 12);
}
function drawTrend(rows){
  const c=$('trendCanvas'), ctx=c.getContext('2d');
  const W=c.width,H=c.height,padL=42,padR=18,padT=22,padB=42;
  ctx.clearRect(0,0,W,H);
  ctx.font='12px Microsoft YaHei, Arial';
  ctx.fillStyle='rgba(15,23,42,.82)';
  ctx.fillText('近30天阅读分钟趋势', padL, 16);
  ctx.strokeStyle='rgba(100,116,139,.35)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(padL,padT); ctx.lineTo(padL,H-padB); ctx.lineTo(W-padR,H-padB); ctx.stroke();
  const max=Math.max(...rows.map(x=>x.minutes||0),1);
  for(let i=0;i<=4;i++){
    const y=H-padB-(H-padT-padB)*i/4;
    ctx.strokeStyle='rgba(148,163,184,.18)'; ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(W-padR,y); ctx.stroke();
    ctx.fillStyle='rgba(100,116,139,.82)'; ctx.fillText(Math.round(max*i/4), 6, y+4);
  }
  const gap=3; const bw=Math.max(3,(W-padL-padR)/Math.max(rows.length,1)-gap);
  rows.forEach((r,i)=>{
    const h=((r.minutes||0)/max)*(H-padT-padB-6);
    const x=padL+i*(bw+gap), y=H-padB-h;
    const grd=ctx.createLinearGradient(0,y,0,H-padB); grd.addColorStop(0,'#7c3aed'); grd.addColorStop(1,'#38bdf8');
    ctx.fillStyle=grd; ctx.fillRect(x,y,bw,h);
    if(i%5===0 || i===rows.length-1){ ctx.fillStyle='rgba(100,116,139,.9)'; const d=(r.date||'').slice(5); ctx.save(); ctx.translate(x,H-padB+14); ctx.rotate(-0.5); ctx.fillText(d,0,0); ctx.restore(); }
  });
}
async function loadAdmin(){
  if(!token || !isAdmin()){
    $('adminStats').innerHTML='<p class="meta">请先以管理员登录。</p>';
    $('adminGraphStats').innerHTML='';
    ['adminBookList','adminUserList','adminCommentList','adminConfigList','adminGraphResult'].forEach(id=>{ if($(id)) $(id).innerHTML = ''; });
    return;
  }
  const dash=await api('/admin/dashboard').catch(e=>null); const gs=await api('/graph/stats').catch(e=>null);
  if(!dash){
    $('adminStats').innerHTML='<p class="meta">当前账号无管理员权限。</p>';
    $('adminGraphStats').innerHTML='';
    return;
  }
  $('adminStats').innerHTML=Object.entries(dash.cards).map(([k,v])=>stat(k,v)).join('');
  $('adminGraphStats').innerHTML=gs?Object.entries(gs).filter(([k,v])=>typeof v==='number').map(([k,v])=>stat(k,v)).join(''):'';
  await Promise.allSettled([adminLoadBooks(), adminLoadUsers(), adminLoadComments(), adminLoadSettings()]);
}
function adminSwitchTab(name){
  const panes = {books:'adminBooks', users:'adminUsers', comments:'adminComments', settings:'adminSettings', graphAdmin:'adminGraphAdmin'};
  document.querySelectorAll('.admin-tab').forEach(btn=>btn.classList.toggle('active', btn.dataset.adminTab === name));
  document.querySelectorAll('.admin-pane').forEach(pane=>pane.classList.toggle('active', pane.id === (panes[name] || 'adminBooks')));
  if(name === 'books') adminLoadBooks();
  if(name === 'users') adminLoadUsers();
  if(name === 'comments') adminLoadComments();
  if(name === 'settings') adminLoadSettings();
}
function adminSplit(value){ return String(value||'').split(/[,，、]/).map(s=>s.trim()).filter(Boolean); }
function adminJson(data){ return JSON.stringify(data, null, 2); }
async function adminLoadBooks(){
  if(!$('adminBookList') || !token) return;
  const q = $('adminBookSearch')?.value?.trim();
  const data = await api(q ? `/books?q=${encodeURIComponent(q)}&limit=80` : '/books/admin/export-json').catch(e=>({items:[], error:e.message}));
  if(data.error){ $('adminBookList').innerHTML = `<p class="meta">${data.error}</p>`; return; }
  $('adminBookList').innerHTML = `<table><thead><tr><th>ID</th><th>书名</th><th>作者</th><th>分类</th><th>评分</th><th>操作</th></tr></thead><tbody>${(data.items||[]).map(b=>`<tr><td>${b.id}</td><td><b>${b.title}</b><br><span>${b.publisher||''}</span></td><td>${(b.authors||[]).join('、')}</td><td>${b.category||''}</td><td>${b.avg_rating||0}</td><td><button onclick="adminEditBook(${b.id})">编辑</button><button class="danger-btn" onclick="adminDeleteBook(${b.id}, '${attr(b.title)}')">删除</button></td></tr>`).join('') || '<tr><td colspan="6">暂无图书</td></tr>'}</tbody></table>`;
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
  await Promise.allSettled([adminLoadBooks(), loadBooks(), loadMetrics()]);
}
async function adminDeleteBook(id, title){
  if(!confirm(`确认删除《${title}》？`)) return;
  await api(`/books/admin/${id}`, {method:'DELETE'});
  toast('图书已删除');
  await Promise.allSettled([adminLoadBooks(), loadBooks(), loadMetrics()]);
}
async function adminReindex(){ const r = await api('/books/admin/reindex-search', {method:'POST'}); toast(`已重建索引：${r.indexed || 0} 本`); }
async function adminLoadUsers(){
  if(!$('adminUserList') || !token) return;
  const q = $('adminUserSearch')?.value?.trim();
  const data = await api('/admin/users' + (q ? `?q=${encodeURIComponent(q)}` : '')).catch(e=>({items:[], error:e.message}));
  if(data.error){ $('adminUserList').innerHTML = `<p class="meta">${data.error}</p>`; return; }
  $('adminUserList').innerHTML = `<table><thead><tr><th>ID</th><th>用户</th><th>邮箱</th><th>角色</th><th>状态</th><th>操作</th></tr></thead><tbody>${(data.items||[]).map(u=>`<tr><td>${u.id}</td><td><b>${u.nickname||u.username}</b><br><span>${u.username}</span></td><td>${u.email}</td><td>${u.is_admin?'管理员':'用户'}</td><td><span class="${u.is_active?'status-ok':'status-bad'}">${u.is_active?'启用':'禁用'}</span></td><td><button onclick="adminToggleUser(${u.id}, ${u.is_active})">${u.is_active?'禁用':'启用'}</button><button onclick="adminToggleRole(${u.id}, ${u.is_admin})">${u.is_admin?'取消管理员':'设为管理员'}</button></td></tr>`).join('') || '<tr><td colspan="6">暂无用户</td></tr>'}</tbody></table>`;
}
async function adminToggleUser(id, active){ await api(`/admin/users/${id}/status`, {method:'PUT', body:JSON.stringify({is_active:!active})}); toast('用户状态已更新'); adminLoadUsers(); }
async function adminToggleRole(id, isAdmin){ await api(`/admin/users/${id}/role`, {method:'PUT', body:JSON.stringify({is_admin:!isAdmin})}); toast('用户角色已更新'); await Promise.allSettled([adminLoadUsers(), loadAdmin()]); }
async function adminExportUsers(){ const r=await api('/admin/users/export-csv'); await navigator.clipboard?.writeText(r.content).catch(()=>{}); toast('CSV已复制到剪贴板'); }
async function adminLoadComments(){
  if(!$('adminCommentList') || !token) return;
  const qs=[]; if($('adminCommentBookId')?.value) qs.push(`book_id=${$('adminCommentBookId').value}`); if($('adminCommentUsername')?.value) qs.push(`username=${encodeURIComponent($('adminCommentUsername').value)}`);
  const data = await api('/ecosystem/admin/comments' + (qs.length ? `?${qs.join('&')}` : '')).catch(e=>({items:[], error:e.message}));
  if(data.error){ $('adminCommentList').innerHTML = `<p class="meta">${data.error}</p>`; return; }
  $('adminCommentList').innerHTML = `<table><thead><tr><th>ID</th><th>图书</th><th>用户</th><th>内容</th><th>状态</th><th>操作</th></tr></thead><tbody>${(data.items||[]).map(c=>`<tr><td>${c.id}</td><td>${c.book_title||c.book_id}</td><td>${c.nickname||c.username}<br><span>⭐ ${c.rating||'-'} · 赞 ${c.likes_count||0}</span></td><td>${c.content}</td><td><span class="${c.is_pinned?'status-ok':''}">${c.is_pinned?'置顶':'普通'}</span></td><td><button onclick="adminPinComment(${c.id})">${c.is_pinned?'取消置顶':'置顶'}</button><button class="danger-btn" onclick="adminDeleteComment(${c.id})">删除</button></td></tr>`).join('') || '<tr><td colspan="6">暂无评论</td></tr>'}</tbody></table>`;
}
async function adminPinComment(id){ await api(`/ecosystem/admin/comments/${id}/pin`, {method:'POST'}); toast('置顶状态已更新'); adminLoadComments(); }
async function adminDeleteComment(id){ if(!confirm('确认删除这条评论？')) return; await api(`/ecosystem/admin/comments/${id}`, {method:'DELETE'}); toast('评论已删除'); await Promise.allSettled([adminLoadComments(), loadMetrics()]); }
async function adminLoadSettings(){
  if(!$('adminConfigList') || !token) return;
  const [weights, configs] = await Promise.all([api('/recommend/admin/weights').catch(()=>null), api('/admin/configs').catch(()=>({items:[]}))]);
  if(weights){ $('adminWeightKg').value=weights.kg; $('adminWeightCf').value=weights.cf; $('adminWeightHot').value=weights.hot; $('adminWeightNew').value=weights.new; }
  $('adminConfigList').innerHTML = `<table><thead><tr><th>键</th><th>值</th><th>说明</th></tr></thead><tbody>${(configs.items||[]).map(c=>`<tr onclick="adminFillConfig('${attr(c.key)}','${attr(c.value)}','${attr(c.description||'')}')"><td>${c.key}</td><td>${c.value}</td><td>${c.description||''}</td></tr>`).join('') || '<tr><td colspan="3">暂无配置</td></tr>'}</tbody></table>`;
}
function adminFillConfig(key, value, desc){ $('adminConfigKey').value=key; $('adminConfigValue').value=value; $('adminConfigDesc').value=desc; }
async function adminSaveWeights(){
  const payload = {kg:Number($('adminWeightKg').value), cf:Number($('adminWeightCf').value), hot:Number($('adminWeightHot').value), new:Number($('adminWeightNew').value)};
  await api('/recommend/admin/weights', {method:'PUT', body:JSON.stringify(payload)});
  toast('推荐权重已保存');
}
async function adminPrecomputeItemCf(){ const r=await api('/recommend/admin/precompute-itemcf', {method:'POST'}); toast(r.message || 'ItemCF已预计算'); }
async function adminSaveConfig(){
  const key=$('adminConfigKey').value.trim(); if(!key) return toast('请填写配置键');
  await api('/admin/configs', {method:'PUT', body:JSON.stringify({key, value:$('adminConfigValue').value, description:$('adminConfigDesc').value})});
  toast('配置已保存'); adminLoadSettings();
}
async function adminGraphInit(){ $('adminGraphResult').textContent=adminJson(await api('/graph/admin/init', {method:'POST'})); loadGraph(); }
async function adminGraphSync(){ $('adminGraphResult').textContent=adminJson(await api('/graph/admin/sync', {method:'POST'})); loadGraph(); }
async function adminGraphSemantic(){ $('adminGraphResult').textContent=adminJson(await api('/graph/admin/semantic/enrich', {method:'POST'})); loadGraph(); }
async function adminCreateRelation(){
  const payload={source_type:'Book', source_id:Number($('adminRelSource').value), relation_type:$('adminRelType').value.trim()||'SIMILAR_TO', target_type:'Book', target_id:Number($('adminRelTarget').value), weight:Number($('adminRelWeight').value||1)};
  if(!payload.source_id || !payload.target_id) return toast('请填写源/目标图书 ID');
  $('adminGraphResult').textContent=adminJson(await api('/graph/admin/relations', {method:'POST', body:JSON.stringify(payload)}));
  loadGraph();
}
async function adminRunCypher(){
  const cypher = $('adminCypher').value.trim(); if(!cypher) return toast('请填写 Cypher');
  $('adminGraphResult').textContent=adminJson(await api('/graph/admin/cypher', {method:'POST', body:JSON.stringify({cypher, params:{}})}));
}
function escapeHtml(value){
  return String(value ?? '')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}
let chatHistoryLocal = [];

function assistantMarkdown(text){
  return escapeHtml(text || '')
    .replace(/\n{2,}/g,'</p><p>')
    .replace(/\n/g,'<br>')
    .replace(/\*\*(.*?)\*\*/g,'<b>$1</b>');
}
function cleanAssistantAnswer(text){
  let s = String(text || '').trim();
  s = s.replace(
    /^\s*(book_rec|book_qa|function_qa|personal_qa|admin_help|kg_assist|out_of_scope)\s*[·|｜\-]\s*(LLM增强|本地回答|本地规则回答|规则回答|fallback|LLM|local)\s*[·|｜\-]\s*(user|admin|anonymous|guest)\s*\n*/i,
    ''
  );
  s = s.replace(/^\s*intent\s*[:：]\s*\w+\s*[,\n]\s*/i, '');
  return s.trim();
}
function chatBookCards(books){
  return (books || []).slice(0,4).map(b=>{
    const id = b.id || b.book_id;
    const authors = (b.authors || []).join('、') || b.author || '未知作者';
    if(!id) return '';
    return `
      <button class="chat-book" onclick="openDetail(${id});closeAssistant();">
        <span class="chat-book-title">${escapeHtml(b.title)}</span>
        <span>${escapeHtml(authors)} · ⭐ ${escapeHtml(b.avg_rating || 0)}</span>
        ${b.reason ? `<em>${escapeHtml(b.reason)}</em>` : ''}
      </button>
    `;
  }).join('');
}
function chatSuggestionChips(suggestions){
  return (suggestions || []).slice(0,4)
    .map(x=>`<button class="chat-chip" onclick="quickAsk(decodeURIComponent('${encodeURIComponent(x)}'))">${escapeHtml(x)}</button>`)
    .join('');
}
function openAssistant(){
  const modal = $('assistantModal');
  if(!modal) return;
  modal.classList.remove('hidden');
  renderChatMessages();
  setTimeout(()=>{
    const input = $('chatInput');
    if(input){
      autoResizeChatInput(input);
      input.focus();
    }
  }, 80);
}
function closeAssistant(){
  $('assistantModal')?.classList.add('hidden');
}
function closeAssistantOnBackdrop(event){
  if(event.target && event.target.id === 'assistantModal'){
    closeAssistant();
  }
}
function quickAsk(text){
  const input = $('chatInput');
  if(!input) return;
  input.value = text;
  autoResizeChatInput(input);
  sendChatMessage();
}
function handleChatKey(event){
  if(event.key === 'Enter' && !event.shiftKey){
    event.preventDefault();
    sendChatMessage();
  }
}
function autoResizeChatInput(el){
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 130) + 'px';
}
function renderChatWelcome(){
  return `
    <div class="chat-welcome">
      <div class="chat-welcome-logo">KG</div>
      <h2>你好，我是你的 AI 荐书助手</h2>
      <p>你可以问我图书推荐、系统功能、阅读记录、购书方式和知识图谱相关问题。</p>
      <div class="chat-suggestions">
        ${chatSuggestionChips(['推荐几本适合人工智能入门的书','我喜欢《三体》，还能看什么','怎么看我的阅读进度','怎么购买实体书'])}
      </div>
    </div>
  `;
}
function renderChatMessages(){
  const box = $('chatMessages');
  if(!box) return;

  if(chatHistoryLocal.length === 0){
    box.innerHTML = renderChatWelcome();
    return;
  }

  box.innerHTML = chatHistoryLocal.map(msg=>{
    if(msg.role === 'user'){
      return `
        <div class="chat-row user">
          <div class="chat-bubble user">${assistantMarkdown(msg.content)}</div>
          <div class="chat-avatar user">我</div>
        </div>
      `;
    }
    const body = msg.loading
      ? '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>'
      : `<div>${assistantMarkdown(msg.content)}</div>`;
    return `
      <div class="chat-row ai">
        <div class="chat-avatar ai">AI</div>
        <div class="chat-bubble ai">
          ${body}
          ${chatBookCards(msg.books)}
          ${msg.suggestions?.length ? `<div class="chat-suggestions">${chatSuggestionChips(msg.suggestions)}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  box.scrollTop = box.scrollHeight;
}
function clearAssistant(){
  chatHistoryLocal = [];
  renderChatMessages();
}
async function sendChatMessage(){
  const input = $('chatInput');
  if(!input) return;

  const message = input.value.trim();
  if(!message) return;

  input.value = '';
  input.style.height = 'auto';

  chatHistoryLocal.push({role:'user', content:message});
  chatHistoryLocal.push({
    role:'assistant',
    content:'正在检索图书库、用户画像和知识图谱',
    loading:true
  });
  renderChatMessages();

  try{
    const data = await api('/chat/send', {
      method:'POST',
      body:JSON.stringify({message})
    });
    const rawAnswer =
      data.answer ||
      data.reply ||
      data.response ||
      data.content ||
      data.message ||
      '暂时没有生成回答。';
    chatHistoryLocal[chatHistoryLocal.length - 1] = {
      role:'assistant',
      content:cleanAssistantAnswer(rawAnswer),
      books:data.books || [],
      suggestions:data.suggestions || []
    };
  }catch(e){
    chatHistoryLocal[chatHistoryLocal.length - 1] = {
      role:'assistant',
      content:cleanAssistantAnswer(e.message || '抱歉，智能助手暂时无法连接。请检查后端服务或 AI 问答接口是否正常。'),
      suggestions:['推荐几本人工智能入门书','怎么购买实体书？']
    };
  }

  renderChatMessages();
}
function sendChat(){
  return sendChatMessage();
}
window.addEventListener('message', event => {
  const data = event.data || {};
  if(data.type === 'reader-progress-saved'){
    Promise.allSettled([
      loadHistory(),
      loadShelves(),
      loadProfile(),
      loadShelfState()
    ]);
  }
});
function openAssistantLegacy(){
  const modal = $('assistantModal');
  if(modal){
    openAssistant();
  }else if($('assistant')){
    $('assistant').classList.toggle('hidden');
    setTimeout(()=>$('chatInput')?.focus(), 80);
  }
}
function updateSearchbarForView(view){ if($('topSearchbar')) $('topSearchbar').style.display = ['home','discover'].includes(view) ? 'flex' : 'none'; }
async function loadAll(){ await loadShelfState(); await Promise.allSettled([loadMetrics(), loadRecommendations(), loadHot(), loadNew(), loadBooks(), loadOptions(), loadHotSearches(), ensureGraphBookOptions(), loadGraph(), loadShelves(), loadProfile()]); }

function activateView(view, opts={}){
  const push = opts.push !== false;
  if(view === 'admin' && !isAdmin()){
    toast('请使用管理员账号登录');
    view = 'home';
  }
  currentView = view;
  const btn = document.querySelector(`[data-view="${view}"]`);
  document.querySelectorAll('.nav').forEach(x=>x.classList.remove('active'));
  btn?.classList.add('active');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  $(view)?.classList.add('active');
  setTitle(btn?.textContent || '首页');
  updateSearchbarForView(view);
  if(view==='graph') loadGraph();
  if(view==='shelf') loadShelves();
  if(view==='profile') loadProfile();
  if(view==='admin') loadAdmin();
  if(push) pushAppState({view});
}

async function applyAppState(state){
  applyingHistoryState = true;
  const next = state || {view:'home'};
  currentAppState = {...next};
  hideReaderModal();
  if(next.view) activateView(next.view, {push:false});
  if(next.detail){
    try{
      if(!activeBook || activeBook.id !== next.detail) await openDetail(next.detail, {push:false});
      else $('detailModal').classList.remove('hidden');
    }catch(e){ toast(e.message || '详情打开失败'); }
  }else{
    hideDetailModal();
  }
  if(next.reader){
    try{ await openReader(next.reader, next.page || 1, {push:false}); }
    catch(e){ toast(e.message || '阅读器打开失败'); }
  }
  applyingHistoryState = false;
}

document.querySelectorAll('.nav[data-view]').forEach(btn=>{
  btn.addEventListener('click', () => activateView(btn.dataset.view));
});
document.querySelectorAll('.admin-tab').forEach(btn=>btn.addEventListener('click',()=>{
  adminSwitchTab(btn.dataset.adminTab);
}));
$('adminBookForm')?.addEventListener('submit', adminSaveBook);
$('loginBtn').onclick=()=>{ window.location.href = '/login?mode=login&role=user'; };
$('adminBtn').onclick=()=>{ window.location.href = '/admin'; };
$('logoutBtn').onclick=()=>{ logout(); };
$('searchBtn').onclick=()=>{ searchByKeyword($('globalSearch').value); };
$('globalSearch').addEventListener('keydown', e=>{ if(e.key==='Enter') $('searchBtn').click(); });
renderChatMessages();
window.addEventListener('popstate', e => {
  applyAppState(e.state || {view:'home'});
});
const initialParams = new URLSearchParams(location.search);
pushAppState({view:'home'}, true);
updateUserBadge(); updateSearchbarForView('home'); loadAll(); openReaderFromUrl(initialParams);
