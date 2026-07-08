const API = '/api/v1';
let token = localStorage.getItem('token') || '';
let currentUser = JSON.parse(localStorage.getItem('user') || 'null');
let currentBooks = [];
let activeBook = null;
let shelfState = {};
const SHELF_DISPLAY_ORDER = ['在读', '想读', '已读'];
function normalizeShelfName(name){
  const raw = String(name ?? '').trim();
  const map = {
    reading: '在读',
    read: '已读',
    want: '想读',
    want_to_read: '想读',
    wantToRead: '想读'
  };
  return map[raw] || raw;
}
function orderedShelves(shelves = []){
  const fixed = new Map(SHELF_DISPLAY_ORDER.map(name => [name, {name, count: 0, books: []}]));
  const extras = [];
  for(const rawShelf of shelves || []){
    const displayName = normalizeShelfName(rawShelf?.name || rawShelf?.shelf_name || rawShelf?.status);
    if(!displayName) continue;
    const books = Array.isArray(rawShelf?.books) ? rawShelf.books : [];
    const count = Number.isFinite(Number(rawShelf?.count)) ? Number(rawShelf.count) : books.length;
    const shelf = {...rawShelf, name: displayName, count, books};
    if(fixed.has(displayName)){
      fixed.set(displayName, shelf);
    }else{
      extras.push(shelf);
    }
  }
  return [...SHELF_DISPLAY_ORDER.map(name => fixed.get(name)), ...extras];
}
let readerStartAt = null;
let readerBookId = null;
let graphBookOptions = [];
let graphBookOptionsLoaded = false;
let currentGraphData = null;
let graphResponseCache = {};
let graphOriginalSectionHtml = null;
let originalAssistState = null;

function syncAuthFromStorage(){
  const storedToken = localStorage.getItem('token') || '';
  const storedUserRaw = localStorage.getItem('user') || 'null';
  let storedUser = null;
  try{ storedUser = JSON.parse(storedUserRaw); }catch(e){ storedUser = null; }
  token = storedToken;
  currentUser = storedUser;
  return {token, currentUser};
}
function headers(){
  syncAuthFromStorage();
  return token ? {'Authorization': `Bearer ${token}`, 'Content-Type':'application/json'} : {'Content-Type':'application/json'};
}
async function api(path, opts={}){
  const res = await fetch(API + path, {headers: headers(), ...opts});
  if(!res.ok){ let t = await res.text(); try{ t=JSON.parse(t).detail || t; }catch(e){} throw new Error(t || res.statusText); }
  return res.json();
}
function $(id){ return document.getElementById(id); }
function setTitle(t){ $('pageTitle').textContent = t; }
function toast(msg){ const el=document.createElement('div'); el.className='toast'; el.textContent=msg; document.body.appendChild(el); setTimeout(()=>el.remove(),2600); }
function isAdmin(){ return !!(currentUser && currentUser.is_admin); }
function isLoggedIn(){ syncAuthFromStorage(); return !!(token && currentUser); }
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
  if(typeof refreshOriginalWorkshopAccess === 'function') refreshOriginalWorkshopAccess();
}
function logout(){
  token = ''; currentUser = null;
  localStorage.removeItem('token'); localStorage.removeItem('user');
  updateUserBadge(); toast('已退出登录'); loadAll();
}
function attr(value){ return String(value ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function jsString(value){ return String(value ?? '').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,'\\n').replace(/\r/g,'\\r'); }
function stat(label, value){ return `<div class="stat"><b>${value}</b><span>${label}</span></div>`; }
function isInShelf(bookId, shelf){ return !!(shelfState[bookId] && shelfState[bookId][shelf]); }
function shelfStatus(shelf){ return shelf === '在读' ? 'reading' : shelf === '已读' ? 'read' : 'want_to_read'; }
function shelfButton(bookId, shelf){
  const active = isInShelf(bookId, shelf);
  const text = active ? `取消${shelf.replace('加入','')}` : `加入${shelf}`;
  return `<button class="shelf-action ${active ? 'active' : ''}" data-book="${bookId}" data-shelf="${shelf}" onclick="toggleShelf(event, ${bookId}, '${shelf}')">${text}</button>`;
}
function refreshShelfButtons(bookId){
  const selector = bookId ? `[data-book="${bookId}"][data-shelf]` : '[data-book][data-shelf]';
  document.querySelectorAll(selector).forEach(btn=>{
    const shelf = btn.dataset.shelf;
    const id = btn.dataset.book;
    const active = isInShelf(id, shelf);
    btn.classList.toggle('active', active);
    btn.textContent = active ? `取消${shelf}` : `加入${shelf}`;
  });
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

function uniqueTerms(items){
  const seen = new Set();
  const result = [];
  for(const item of items || []){
    const value = String(item || '').trim();
    if(!value || seen.has(value)) continue;
    seen.add(value);
    result.push(value);
  }
  return result;
}
function firstTagOf(b, fallback='图书'){
  const tags = uniqueTerms(b?.tags || []);
  return tags[0] || fallback;
}
function bookCard(b, eager=false, showReason=true){
  const id = b.id || b.book_id;
  const displayTags = uniqueTerms(b.tags || []).slice(0, 3);
  const tags = displayTags.map(t=>`<span class="tag">${attr(t)}</span>`).join('');
  const cover = b.cover_thumb_url || b.cover_url || '';
  const loading = eager ? 'eager' : 'lazy';
  const priority = eager ? ' fetchpriority="high"' : '';
  const authors = (b.authors||[]).join('、') || b.author || '未知作者';
  const rawTitle = b.title || '';
  const displayTitle = rawTitle.length > 7 ? rawTitle.slice(0,7) + '...' : rawTitle;
  const reasonHtml = showReason && b.reason ? `<p class="reason">${attr(b.reason)}</p>` : '';

  return `<article class="book-card" data-book-card="${id}" onclick="openDetail(${id})">
    <img class="cover" src="${attr(cover)}" loading="${loading}" decoding="async"${priority} width="96" height="140" onerror="this.src='' ; this.style.background='linear-gradient(135deg,#1e293b,#7c3aed)'">
    <div class="book-info">
      <div class="book-card-header">
        <h4 class="book-card-title" title="${attr(rawTitle)}">${attr(displayTitle)}</h4>
      </div>
      <p class="meta">${attr(authors)} · ⭐${b.avg_rating||0}</p>
      <div class="tags">${tags}</div>
      ${reasonHtml}
    </div>
    <div class="card-actions">
      <button class="detail-action" onclick="event.stopPropagation(); openDetail(${id})">查看详情</button>
      ${shelfButton(id,'想读')}
      <button class="feedback-action negative" onclick="markNotInterested(event, ${id})">不感兴趣</button>
    </div>
  </article>`;
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
  const ids = items.slice(0, 8).map(b => b.id || b.book_id).filter(Boolean);
  if(!ids.length) return;
  window.setTimeout(() => {
    ids.forEach(id => recordFeedback(id, 'exposure', source));
  }, 2000);
}
function miniItem(b){ return `<div class="mini-item" onclick="openDetail(${b.id || b.book_id})"><div><b>${attr(b.title || '')}</b><br><span>${attr((b.authors||[]).join('、')||b.author||'')} · ⭐ ${b.avg_rating||0}</span></div><span>${attr(firstTagOf(b, ''))}</span></div>`; }
function shelfMiniItem(item, shelfName){
  const b = item.book || item;
  const id = b.id || b.book_id;
  const cover = b.cover_thumb_url || b.cover_url || '';
  const authors = (b.authors||[]).join('、') || b.author || '';
  const tag = firstTagOf(b, '图书');
  return `<div class="mini-item shelf-mini-item shelf-book-card" onclick="openDetail(${id})">
    <img class="shelf-book-cover" src="${attr(cover)}" loading="lazy" decoding="async" alt="${attr(b.title || '')}" onerror="this.src=''; this.classList.add('empty-cover')">
    <div class="shelf-book-info">
      <b title="${attr(b.title || '')}">${attr(b.title || '未命名图书')}</b>
      <span>${attr(authors)} · ⭐ ${b.avg_rating||0}</span>
      <em>${attr(tag)}</em>
    </div>
    <div class="shelf-mini-actions">
      <button class="shelf-remove-btn" onclick="removeShelfBook(event, ${id}, '${jsString(shelfName)}')">删除</button>
    </div>
  </div>`;
}
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
  const ps = !dash ? await api('/public/stats').catch(()=>null) : null;
  if($('mBooks')){
    $('mBooks').textContent = dash?.cards?.books ?? gs.books ?? ps?.books ?? '--';
  }
  if($('mComments')){
    $('mComments').textContent = dash?.cards?.comments ?? ps?.comments ?? '--';
  }
}
async function loadRecommendations(force=false){
  const grid = $('recommendGrid');
  if(force && grid) grid.innerHTML = '<div class="detail-async-block">正在刷新推荐...</div>';
  const data = await api('/recommend/home?limit=16' + (force ? `&refresh=1&t=${Date.now()}` : ''));
  currentBooks = data.items || [];
  if(grid) grid.innerHTML = currentBooks.map(b => bookCard(b, true)).join('');
  refreshShelfButtons();
  recordExposure(currentBooks, force ? 'home_refresh' : 'home');
  populateGraphBookSelect();
}
async function loadHot(force=false){
  if(force && $('hotList')) $('hotList').innerHTML = '<span class="meta">正在刷新...</span>';
  const data = await api('/recommend/hot?limit=8' + (force ? `&refresh=1&t=${Date.now()}` : ''));
  $('hotList').innerHTML = data.items.map(miniItem).join('');
}
async function loadNew(force=false){
  if(force && $('newList')) $('newList').innerHTML = '<span class="meta">正在刷新...</span>';
  const data = await api('/recommend/new?limit=8' + (force ? `&refresh=1&t=${Date.now()}` : ''));
  $('newList').innerHTML = data.items.map(miniItem).join('');
}
function searchBackendLabel(backend){
  const labels = {
    'hybrid-semantic-search': '混合语义搜索',
    'hybrid-bm25-vector': '混合语义搜索',
    'semantic-vector': '语义搜索',
    'local-semantic-vector': '本地语义向量',
    'local-hashing-vector': '本地语义向量',
    'elasticsearch': '全文检索',
    'sql-fallback': '基础搜索'
  };
  return labels[backend] || backend || '搜索';
}
async function loadBooks(q=''){
  const data = await api('/books' + (q ? `?q=${encodeURIComponent(q)}&limit=40&mode=hybrid` : '?limit=40'));
  currentBooks = data.items;
  const backendLabel = searchBackendLabel(data.search_backend);
  const semanticHint = q ? (data.query_understanding?.natural_language ? ' · 已理解自然语言意图' : ' · 已融合关键词与语义') : '';
  $('resultHint').textContent = `找到 ${data.total} 本相关图书 · ${backendLabel}${semanticHint}`;
  $('bookGrid').innerHTML = data.items.map(b => bookCard(b, false, false)).join('');
  refreshShelfButtons();
  recordExposure(data.items, q ? 'search' : 'discover');
  populateGraphBookSelect();
}
async function loadOptions(){
  const data = await api('/books/meta/options');
  const chips = uniqueTerms(data.tags || []).slice(0, 24);
  $('chips').innerHTML = chips.map(x=>`<button class="chip" onclick="searchByKeyword('${attr(x)}')">${attr(x)}</button>`).join('');
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
  const starRating = Math.round(rating / 2);
  return Array.from({length:5}, (_, i)=>`<span class="${i < starRating ? 'on' : ''}">★</span>`).join('');
}
function reviewSummaryHtml(comments){
  const summary = comments.summary || {};
  const dist = summary.distribution || {};
  const max = Math.max(1, ...Object.values(dist).map(Number));
  const rows = [10,9,8,7,6,5,4,3,2,1].map(n=>`<div class="rating-bar"><span>${n}分</span><i><b style="width:${((Number(dist[n]||0)/max)*100).toFixed(0)}%"></b></i><em>${dist[n]||0}</em></div>`).join('');
  return `<div class="review-summary"><div class="review-score"><b>${Number(summary.avg_rating||0).toFixed(1)}</b><div class="stars">${stars(summary.avg_rating)}</div><span>${summary.total||0} 条书评 · ${summary.rating_count||0} 个评分</span></div><div class="rating-bars">${rows}</div></div>`;
}
function reviewCardHtml(c, bookId){
  const mine = currentUser && c.user_id === currentUser.id;
  return `<article class="review-card ${c.is_pinned ? 'pinned' : ''}">
    <div class="review-head"><div><b>${attr(c.nickname || c.username || '匿名用户')}</b>${c.is_pinned?'<span class="review-pin">置顶</span>':''}<div class="stars">${stars(c.rating)}</div></div><time>${(c.created_at||'').slice(0,10)}</time></div>
    <p>${attr(c.content || '')}</p>
    <div class="review-actions">
      <button class="ghost ${c.liked?'active':''}" onclick="likeComment(${c.id}, ${bookId})">❤ ${c.likes_count||0}</button>
      ${mine || isAdmin() ? `<button class="ghost" onclick="editComment(${c.id}, ${bookId}, '${attr(c.content)}', '${c.rating||''}')">编辑</button>` : ''}${isAdmin() ? `<button class="ghost danger" onclick="deleteComment(${c.id}, ${bookId})">删除</button>` : ''}
    </div>
  </article>`;
}
function reviewsHtml(bookId, comments){
  if(comments && comments.error){
    return `<section id="detailReviewsWrap" class="reviews-section"><div class="section-title compact"><h3>书评社区</h3><span>评论加载失败</span></div><div class="empty-review">评论加载失败：${attr(comments.error)}</div></section>`;
  }
  const items = comments.items || [];
  const list = items.length ? items.map(c=>reviewCardHtml(c, bookId)).join('') : '<div class="empty-review">还没有书评，来写第一条吧。</div>';
  const ratingOptions = [10,9,8,7,6,5,4,3,2,1].map(n=>`<option value="${n}">${n} 分</option>`).join('');
  return `<section class="reviews-section"><div class="section-title compact"><h3>书评社区</h3><span>读者评分、短评和精选讨论</span></div>${reviewSummaryHtml(comments)}<div class="review-compose"><div><b>写一条书评</b><span>分享读后感，也可以顺手给本书评分。</span></div><select id="reviewRating">${ratingOptions}</select><textarea id="reviewContent" placeholder="这本书哪里打动了你？适合推荐给谁？"></textarea><button class="primary" onclick="submitReview(${bookId})">发布书评</button></div><div class="review-list">${list}</div></section>`;
}
function reviewsHtml(bookId, comments){
  if(comments && comments.error){
    return `<section id="detailReviewsWrap" class="reviews-section"><div class="section-title compact"><h3>书评社区</h3><span>评论加载失败</span></div><div class="empty-review">评论加载失败：${attr(comments.error)}</div></section>`;
  }
  comments = comments || {items:[], summary:{}};
  const items = comments.items || [];
  const list = items.length ? items.map(c=>reviewCardHtml(c, bookId)).join('') : '<div class="empty-review">暂无评论，来写第一条吧。</div>';
  const ratingOptions = [10,9,8,7,6,5,4,3,2,1].map(n=>`<option value="${n}">${n} 分</option>`).join('');
  return `<section id="detailReviewsWrap" class="reviews-section"><div class="section-title compact"><h3>书评社区</h3><span>读者评分、短评和精选讨论</span></div>${reviewSummaryHtml(comments)}<div class="review-compose"><div><b>写一条书评</b><span>分享读后感，也可以顺手给本书评分。</span></div><select id="reviewRating">${ratingOptions}</select><textarea id="reviewContent" placeholder="这本书哪里打动了你？适合推荐给谁？"></textarea><button class="primary" onclick="submitReview(${bookId})">发布书评</button></div><div class="review-list">${list}</div></section>`;
}
async function openDetail(id){
  const b = await api(`/books/${id}`); activeBook=b;
  await loadShelfState();
  recordFeedback(id, 'click', 'detail');
  const sim = await api(`/recommend/similar/${id}?limit=6`).catch(()=>({items:[]}));
  const comments = await api(`/ecosystem/comments/${id}`).catch(()=>({items:[]}));
  const purchase = await api(`/ecosystem/purchase-links/${id}`).catch(()=>({links:[]}));
  $('detailContent').innerHTML = `<div class="detail-head"><img class="detail-cover" src="${b.cover_url}"><div><span class="pill">${attr(firstTagOf(b, '图书'))}</span><h2>${b.title}</h2><p class="meta">${(b.authors||[]).join('、')} · ${b.publisher||''} · ${b.publication_year||''} · <a href="javascript:void(0)" onclick="scrollToReviews()" class="rating-link">⭐ ${b.avg_rating} (${b.rating_count}人评分)</a></p><div class="tags">${(b.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div><p>${b.description||''}</p><div class="actions"><button class="primary" onclick="openReader(${b.id})">在线试读</button>${shelfButton(b.id,'想读')}<button onclick="scrollToReviews()">评分</button><button class="feedback-action negative" onclick="markNotInterested(event, ${b.id})">不感兴趣</button></div>${purchaseChannelsHtml(b, purchase)}</div></div><div class="detail-recommend-section"><h3>你可能也喜欢</h3><div class="mini-list">${sim.items.map(miniItem).join('')||'暂无推荐'}</div></div>${reviewsHtml(b.id, comments)}`;
  $('detailModal').classList.remove('hidden');
}
async function openDetail(id){
  const detail = $('detailContent');
  const modal = $('detailModal');
  if(detail){
    detail.innerHTML = '<div class="detail-loading">正在加载书籍详情...</div>';
  }
  modal?.classList.remove('hidden');
  try{
    const b = await api(`/books/${id}`);
    activeBook = b;
    recordFeedback(id, 'click', 'detail');
    loadShelfState().then(refreshShelfButtons).catch(()=>{});
    if(detail){
      detail.innerHTML = `
        <div class="detail-head">
          <img class="detail-cover" src="${b.cover_url || b.cover_thumb_url || ''}">
          <div>
            <span class="pill">${attr(firstTagOf(b, '图书'))}</span>
            <h2>${b.title}</h2>
            <p class="meta">${(b.authors||[]).join('、')} · ${b.publisher||''} · ${b.publication_year||''} · <a href="javascript:void(0)" onclick="scrollToReviews()" class="rating-link">⭐ ${b.avg_rating} (${b.rating_count}人评分)</a></p>
            <div class="tags">${(b.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
            <p>${b.description||''}</p>
            <div class="actions"><button class="primary" onclick="openReader(${b.id})">在线试读</button>${shelfButton(b.id,'想读')}<button onclick="scrollToReviews()">评分</button><button class="feedback-action negative" onclick="markNotInterested(event, ${b.id})">不感兴趣</button></div>
            <div id="detailPurchaseLinks" class="detail-async-block">购书链接加载中...</div>
          </div>
        </div>
        <div class="detail-recommend-section"><h3>你可能也喜欢</h3><div id="detailSimilarList" class="mini-list"><span class="meta">推荐加载中...</span></div></div>
        <div id="detailReviewsWrap"><div class="detail-async-block">评论加载中...</div></div>`;
      refreshShelfButtons();
    }
    const [simRes, commentsRes, purchaseRes] = await Promise.allSettled([
      api(`/recommend/similar/${id}?limit=6`),
      api(`/ecosystem/comments/${id}`),
      api(`/ecosystem/purchase-links/${id}`)
    ]);
    const sim = simRes.status === 'fulfilled' ? simRes.value : {items:[]};
    const comments = commentsRes.status === 'fulfilled' ? commentsRes.value : {items:[], error: commentsRes.reason?.message || '评论接口请求失败'};
    const purchase = purchaseRes.status === 'fulfilled' ? purchaseRes.value : {links:[]};
    if($('detailPurchaseLinks')) $('detailPurchaseLinks').outerHTML = purchaseChannelsHtml(b, purchase);
    if($('detailSimilarList')) $('detailSimilarList').innerHTML = sim.items.map(miniItem).join('') || '暂无推荐';
    if($('detailReviewsWrap')) $('detailReviewsWrap').outerHTML = reviewsHtml(b.id, comments);
  }catch(e){
    if(detail) detail.innerHTML = `<div class="detail-loading error">详情加载失败：${attr(e.message || '请稍后再试')}</div>`;
  }
}
function closeDetail(){ $('detailModal').classList.add('hidden'); }
async function openReader(id, startPage=1){
  const data = await api(`/ecosystem/trial/${id}`);
  readerStartAt = Date.now(); readerBookId = id;
  recordReadingAction(id, 'reading', 'reader');
  let readerUrl = data.reader_url;
  readerUrl += (readerUrl.includes('?') ? '&' : '?') + `page=${encodeURIComponent(startPage || 1)}`;
  $('readerContent').innerHTML = `<iframe src="${readerUrl}" class="reader-frame" title="${data.book.title} 在线试读"></iframe>`;
  $('readerModal').classList.remove('hidden');
}
function closeReader(){ $('readerModal').classList.add('hidden'); }
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
async function submitReview(id){
  if(!token) return toast('请先登录');
  const content = $('reviewContent')?.value.trim();
  const rating = Number($('reviewRating')?.value || 10);
  if(!content) return toast('请先写一点书评内容');
  await api(`/ecosystem/comments/${id}`, {method:'POST', body:JSON.stringify({content, rating})});
  toast('评论已发布');
  openDetail(id); loadProfile();
}
async function commentBook(id){ return submitReview(id); }
async function likeComment(commentId, bookId){
  if(!token) return toast('请先登录');
  await api(`/ecosystem/comments/${commentId}/like`, {method:'POST'});
  openDetail(bookId);
}
async function editComment(commentId, bookId, oldContent, oldRating){
  if(!token) return toast('请先登录');
  const content = prompt('编辑书评', oldContent || '');
  if(!content) return;
  const rating = Number(prompt('评分 1-10', oldRating || '10')) || null;
  await api(`/ecosystem/comments/${commentId}`, {method:'PUT', body:JSON.stringify({content, rating})});
  toast('书评已更新');
  openDetail(bookId);
}
async function deleteComment(commentId, bookId){
  if(!token) return toast('请先登录');
  if(!confirm('确认删除这条书评？')) return;
  await api(`/ecosystem/comments/${commentId}`, {method:'DELETE'});
  toast('书评已删除');
  openDetail(bookId);
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

  // If the user logs in after seeing the locked page, restore the original
  // graph title, toolbar, layout and SVG container before drawing the real graph.
  if(graphRoot && graphRoot.classList.contains('graph-section-locked') && graphOriginalSectionHtml){
    graphRoot.innerHTML = graphOriginalSectionHtml;
    graphRoot.classList.remove('graph-section-locked');
  }

  const graphMain = getKnowledgeGraphMain();

  if(!graphMain) return;

  if(!document.getElementById('graphSvg')){
    graphMain.innerHTML = `
      <svg id="graphSvg" viewBox="0 0 1180 720"></svg>
    `;
  }

  if(graphRoot){
    graphRoot.querySelectorAll('.section-title, .graph-toolbar, .graph-filter, .graph-controls, .graph-layout').forEach(el => {
      el.style.display = '';
    });
  }
}

function renderGraphLocked(){
  const graphRoot = getKnowledgeGraphRoot();

  if(!graphRoot){
    console.warn('没有找到知识图谱区域，未登录锁定页没有渲染');
    return;
  }

  if(!graphOriginalSectionHtml && !graphRoot.classList.contains('graph-section-locked')){
    graphOriginalSectionHtml = graphRoot.innerHTML;
  }

  graphRoot.classList.add('graph-section-locked');
  graphRoot.innerHTML = `
    <div class="panel glass graph-locked-full">
      <div class="graph-locked-full-head">
        <span>Knowledge Graph Locked</span>
        <h3>登录后查看完整画像图谱</h3>
        <p>
          当前未登录时，图谱模式、节点上限、应用和重绘图谱等控制项都会被锁定。
          登录后系统会根据你的阅读、收藏、评分和兴趣标签生成个人画像图谱。
        </p>
      </div>

      <div class="graph-locked-full-body">
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
            <div class="graph-locked-icon">知</div>
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

        <aside class="graph-locked-side">
          <h3>图谱功能已锁定</h3>
          <p>登录后可以查看：</p>
          <ul>
            <li>个人兴趣簇</li>
            <li>种子书关联</li>
            <li>推荐路径解释</li>
            <li>作者、标签、领域关系</li>
          </ul>
        </aside>
      </div>
    </div>
  `;
}
async function loadGraph(){
  syncAuthFromStorage();
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
  if($('graphInfo')) $('graphInfo').innerHTML = '<div class="graph-side-card"><h4>图谱加载中</h4><p class="meta">正在生成节点和推荐路径...</p></div>';
  if($('graphSvg') && !graphResponseCache[path]) $('graphSvg').innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#64748b">图谱加载中...</text>';
  const data = graphResponseCache[path] || await api(path);
  graphResponseCache[path] = data;
  $('graphTitle').textContent = data.title || (mode === 'profile' ? '我的画像图谱' : '中心图书图谱');
  $('graphSubtitle').textContent = mode === 'profile'
    ? '以用户画像为中心，综合多个兴趣种子进行知识图谱推理'
    : (['recent','high_rated'].includes(mode)
      ? '以多本代表性种子书为起点，展示“兴趣种子 → 语义关系 → 推荐图书”的解释路径'
      : '以手动选定图书为中心，展示“中心图书 → 语义关系 → 推荐图书”的解释路径');
  renderGraph(data);
  const summary = data.semantic_summary || {};
  const semanticHtml = Object.keys(summary).length ? `<div class="graph-side-card"><h4>${mode==='profile'?'画像摘要':'语义画像'}</h4>${Object.entries(summary).map(([k,v])=>`<p><b>${graphTypeLabel(k)}：</b>${(v||[]).slice(0,6).join('、') || '暂无'}</p>`).join('')}</div>` : '';
  $('graphInfo').innerHTML = `<div class="graph-side-card"><h4>图例说明</h4>${graphLegendHtml()}</div>` + graphExplainHtml(data) + semanticHtml;
}
function distributeYs(count, top=90, bottom=760){
  if(count <= 0) return [];
  if(count === 1) return [(top+bottom)/2];

  const step = (bottom-top)/(count-1);
  return Array.from({length:count}, (_,i)=>top+i*step);
}

function graphCurvePath(a, b){
  const dx = Math.max(80, Math.abs(b.x - a.x));
  const c1x = a.x + dx * 0.42;
  const c2x = b.x - dx * 0.42;
  return `M ${a.x} ${a.y} C ${c1x} ${a.y}, ${c2x} ${b.y}, ${b.x} ${b.y}`;
}
function graphNodeBookId(n){
  if(!n) return null;

  if(n.book_id !== undefined && n.book_id !== null && n.book_id !== ''){
    return Number(n.book_id);
  }

  const rawId = String(n.id || '');
  const match = rawId.match(/^(Book|SeedBook|RecBook):(\d+)$/);
  if(match) return Number(match[2]);

  return null;
}
function openGraphBookNode(event, bookId){
  event?.stopPropagation?.();

  if(!bookId || Number.isNaN(Number(bookId))){
    toast('该节点不是图书节点，暂无详情页可跳转');
    return;
  }

  openDetail(Number(bookId));
}
function showGraphNodeInfo(nodeId){
  if(!currentGraphData) return;

  const node = (currentGraphData.nodes || []).find(n => String(n.id) === String(nodeId));
  if(!node) return;

  const relatedEdges = (currentGraphData.edges || []).filter(e =>
    String(e.source) === String(nodeId) || String(e.target) === String(nodeId)
  );
  const relatedNodeIds = new Set();
  relatedEdges.forEach(e => {
    relatedNodeIds.add(String(e.source));
    relatedNodeIds.add(String(e.target));
  });

  const relatedNodes = (currentGraphData.nodes || [])
    .filter(n => relatedNodeIds.has(String(n.id)) && String(n.id) !== String(nodeId))
    .slice(0, 8);

  const html = `
    <div class="graph-side-card graph-node-focus-card">
      <h4>当前节点</h4>
      <p><b>名称：</b>${attr(node.label || '未命名节点')}</p>
      <p><b>类型：</b>${graphTypeLabel(node.type)}</p>
      <p><b>关联数：</b>${relatedEdges.length}</p>
      ${
        relatedNodes.length
          ? `<p><b>相关节点：</b>${relatedNodes.map(n => attr(n.label || '')).join('、')}</p>`
          : `<p class="meta">暂无直接关联节点</p>`
      }
    </div>
  `;

  const info = $('graphInfo');
  if(info){
    const old = info.querySelector('.graph-node-focus-card');
    if(old) old.remove();
    info.insertAdjacentHTML('afterbegin', html);
  }

  document.querySelectorAll('#graphSvg .node').forEach(el => {
    const id = el.getAttribute('data-node-id');
    el.classList.toggle('is-focus-node', String(id) === String(nodeId));
    el.classList.toggle('is-related-node', relatedNodeIds.has(String(id)) && String(id) !== String(nodeId));
  });

  document.querySelectorAll('#graphSvg .edge').forEach(el => {
    const source = el.getAttribute('data-source');
    const target = el.getAttribute('data-target');
    el.classList.toggle('is-focus-edge', String(source) === String(nodeId) || String(target) === String(nodeId));
  });
}
function nodeLayer(n, centerId){
  if(n.id === centerId || n.type === 'Profile') return 'center';
  if(n.type === 'SeedBook' || n.type === 'InterestCluster') return 'seed';
  if(n.type === 'Book') return 'book';
  return 'semantic';
}
function renderGraphLegacy(data){
  currentGraphData = data;
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
    return `<g class="edge" data-source="${attr(e.source)}" data-target="${attr(e.target)}"><line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="rgba(71,85,105,.30)" stroke-width="${1.0+Math.min(e.weight||1,1.5)*.8}" marker-end="url(#arrow)"/></g>`;
  }).join('');
  const ns=nodes.map(n=>{
    const p=pos[n.id];
    if(!p) return '';

    const color=graphColor(n.type);
    const layer=nodeLayer(n, centerNode.id);
    const radius=layer==='center'?42:(n.type==='SeedBook'?28:(n.type==='Book'?27:24));
    const raw = String(n.label||'');
    const label = layer==='center' ? raw.slice(0,12) : raw.slice(0,13);
    const labelY = p.y + radius + 20;

    const bookId = graphNodeBookId(n);
    const clickable = !!bookId;
    const clickAttr = clickable ? `onclick="openGraphBookNode(event, ${bookId})"` : `onclick="showGraphNodeInfo('${attr(jsString(n.id))}')"`;
    const nodeClass = clickable ? 'graph-book-node' : 'graph-semantic-node';
    const hint = clickable ? '点击查看图书详情' : '语义节点';

    return `
      <g class="node ${nodeClass}"
         data-node-id="${attr(n.id)}"
         data-title="${attr(raw)}"
         ${clickAttr}>
        <title>${attr(raw)} · ${attr(graphTypeLabel(n.type))} · ${hint}</title>
        <circle cx="${p.x}" cy="${p.y}" r="${radius}" fill="${color}" opacity=".94"/>
        <text class="node-type" x="${p.x}" y="${p.y+4}" text-anchor="middle">${graphTypeLabel(n.type)}</text>
        <text class="node-label" x="${p.x}" y="${labelY}" text-anchor="middle">${attr(label)}</text>
        ${clickable ? `<text class="node-click-hint" x="${p.x}" y="${labelY + 17}" text-anchor="middle">点击查看</text>` : ''}
      </g>`;
  }).join('');
  svg.innerHTML=`<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(71,85,105,.38)"/></marker></defs>${line}${ns}`;
}

function renderGraph(data){
  currentGraphData = data;
  const nodes = data.nodes || [], edges = data.edges || [];
  const svg = $('graphSvg');
  const W = 1500, H = 900;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  if(!nodes.length){
    svg.innerHTML='<text x="750" y="430" text-anchor="middle" class="node-label">暂无图谱数据</text>';
    return;
  }

  const centerId = data.center || nodes.find(n=>n.type==='Profile')?.id || nodes.find(n=>n.type==='Book')?.id || nodes[0].id;
  const centerNode = nodes.find(n=>n.id===centerId) || nodes[0];
  const pos = {};
  pos[centerNode.id] = {x:190, y:H/2};

  const seedLayer = nodes.filter(n => n.id !== centerNode.id && n.type === 'SeedBook');
  const semanticLayer = nodes.filter(n => n.id !== centerNode.id && !['Book','SeedBook','Profile'].includes(n.type));
  const bookLayer = nodes.filter(n => n.id !== centerNode.id && n.type === 'Book');

  const seedXs = seedLayer.length > 5 ? [520, 650] : [610];
  seedLayer.forEach((n,i)=>{
    const col = i % seedXs.length;
    const items = seedLayer.filter((_,j)=>j % seedXs.length === col);
    const idx = items.indexOf(n);
    const ys = distributeYs(items.length, 105, 795);
    pos[n.id] = {x:seedXs[col], y:ys[idx]};
  });

  const midXs = semanticLayer.length > 9 ? [830, 980] : [900];
  semanticLayer.forEach((n,i)=>{
    const col = i % midXs.length;
    const items = semanticLayer.filter((_,j)=>j % midXs.length === col);
    const idx = items.indexOf(n);
    const ys = distributeYs(items.length, 95, 805);
    pos[n.id] = {x:midXs[col], y:ys[idx]};
  });

  const bookXs = bookLayer.length > 8 ? [1250, 1390] : [1320];
  bookLayer.forEach((n,i)=>{
    const col = i % bookXs.length;
    const items = bookLayer.filter((_,j)=>j % bookXs.length === col);
    const idx = items.indexOf(n);
    const ys = distributeYs(items.length, 100, 800);
    pos[n.id] = {x:bookXs[col], y:ys[idx]};
  });

  const line = edges.map(e=>{
    const a = pos[e.source], b = pos[e.target];
    if(!a || !b) return '';

    const isMain = String(e.source) === String(centerNode.id) || String(e.target) === String(centerNode.id);
    const width = isMain ? 2.8 : (1.5 + Math.min(e.weight || 1, 1.5) * .55);

    return `
      <g class="edge" data-source="${attr(e.source)}" data-target="${attr(e.target)}">
        <path class="edge-path ${isMain ? 'main-edge' : ''}"
              d="${graphCurvePath(a,b)}"
              stroke-width="${width}"
              marker-end="url(#arrow)"/>
      </g>`;
  }).join('');

  const ns = nodes.map(n=>{
    const p = pos[n.id];
    if(!p) return '';

    const color = graphColor(n.type);
    const layer = nodeLayer(n, centerNode.id);
    const radius =
      layer === 'center' ? 48 :
      n.type === 'SeedBook' ? 32 :
      n.type === 'Book' ? 31 :
      n.type === 'InterestCluster' ? 32 :
      27;
    const raw = String(n.label || '');
    const label = raw.slice(0, 14);
    const labelY = p.y + radius + 22;

    const bookId = graphNodeBookId(n);
    const clickable = !!bookId;
    const clickAttr = clickable ? `onclick="openGraphBookNode(event, ${bookId})"` : `onclick="showGraphNodeInfo('${attr(jsString(n.id))}')"`;
    const nodeClass = clickable ? 'graph-book-node' : 'graph-semantic-node';
    const hint = clickable ? '点击查看图书详情' : '语义节点';

    return `
      <g class="node ${nodeClass}"
         data-node-id="${attr(n.id)}"
         data-title="${attr(raw)}"
         ${clickAttr}>
        <title>${attr(raw)} · ${attr(graphTypeLabel(n.type))} · ${hint}</title>
        <circle class="node-halo" cx="${p.x}" cy="${p.y}" r="${radius + 14}" fill="${color}"/>
        <circle class="node-core" cx="${p.x}" cy="${p.y}" r="${radius}" fill="${color}" opacity=".96"/>
        <text class="node-type" x="${p.x}" y="${p.y+4}" text-anchor="middle">${graphTypeLabel(n.type)}</text>
        <text class="node-label" x="${p.x}" y="${labelY}" text-anchor="middle">${attr(label)}</text>
        ${clickable ? `<text class="node-click-hint" x="${p.x}" y="${labelY + 18}" text-anchor="middle">点击查看</text>` : ''}
      </g>`;
  }).join('');

  svg.innerHTML = `
    <defs>
      <pattern id="graphGrid" width="34" height="34" patternUnits="userSpaceOnUse">
        <path d="M 34 0 L 0 0 0 34" fill="none" stroke="rgba(148,163,184,.18)" stroke-width="1"/>
      </pattern>
      <radialGradient id="graphGlow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="rgba(124,58,237,.16)"/>
        <stop offset="100%" stop-color="rgba(124,58,237,0)"/>
      </radialGradient>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(100,116,139,.46)"/>
      </marker>
    </defs>
    <rect class="graph-bg-grid" x="0" y="0" width="${W}" height="${H}" fill="url(#graphGrid)"/>
    <circle cx="260" cy="140" r="210" fill="url(#graphGlow)" opacity=".75"/>
    <circle cx="1240" cy="180" r="260" fill="url(#graphGlow)" opacity=".48"/>
    ${line}
    ${ns}
  `;
}

function uniquePreviewBooks(...groups){
  const seen = new Set();
  const result = [];
  groups.flat().forEach(book => {
    const id = book?.id || book?.book_id;
    if(!id || seen.has(String(id))) return;
    seen.add(String(id));
    result.push(book);
  });
  return result;
}
function guestShelfBookCard(book, badge='热门推荐'){
  const id = book.id || book.book_id;
  const authors = (book.authors || []).join('、') || book.author || '未知作者';
  const tags = uniqueTerms(book.tags || []).slice(0, 3).map(t => `<span class="tag">${attr(t)}</span>`).join('');
  const rating = Number(book.avg_rating || 0).toFixed(1).replace('.0','');
  const cover = book.cover_thumb_url || book.cover_url || '';
  return `
    <article class="guest-book-card" onclick="openDetail(${id})">
      <div class="guest-cover-wrap">
        <img class="guest-cover" src="${cover}" loading="lazy" decoding="async" alt="${attr(book.title || '')}" onerror="this.style.display='none';this.parentElement.classList.add('no-cover')">
        <span>${badge}</span>
      </div>
      <div class="guest-book-body">
        <h4 title="${attr(book.title || '')}">${book.title || '未命名图书'}</h4>
        <p class="guest-meta">${attr(authors)} · ⭐ ${rating || 0}</p>
        <div class="tags">${tags}</div>
        <div class="guest-card-actions">
          <button onclick="event.stopPropagation(); window.location.href='/login?v=shelf'">登录后加入书架</button>
          <button class="ghost" onclick="event.stopPropagation(); openReader(${id})">在线试读</button>
        </div>
      </div>
    </article>`;
}
function guestShelfSection(title, desc, books, badge){
  if(!books.length) return '';
  return `
    <section class="guest-shelf-section">
      <div class="guest-section-head">
        <div>
          <h4>${title}</h4>
        </div>
        <button class="ghost" onclick="activateView('search')">查看更多</button>
      </div>
      <div class="guest-book-grid">${books.map(b => guestShelfBookCard(b, badge)).join('')}</div>
    </section>`;
}
async function loadGuestShelfPreview(){
  const grid = $('shelfGrid');
  if(!grid) return;
  grid.classList.add('guest-shelf-grid');
  grid.innerHTML = `
    <div class="guest-shelf-hero">
      <div class="guest-shelf-copy">
        <span class="pill">Guest Preview</span>
        <h3>登录后管理私人书架</h3>
        <div class="guest-shelf-actions">
          <button class="primary" onclick="window.location.href='/login?v=shelf'">登录 / 注册</button>
          <button class="ghost" onclick="activateView('search')">发现图书</button>
        </div>
      </div>
      <div class="guest-shelf-stats">
        ${stat('热门','0')}
        ${stat('高分','0')}
        ${stat('分类','3')}
      </div>
    </div>
    <div class="guest-loading">正在为你加载热门和高分图书...</div>`;

  try{
    const [hotRes, ratingRes] = await Promise.allSettled([
      api('/recommend/hot?limit=8'),
      api('/books?sort=rating&limit=8')
    ]);
    const hot = hotRes.status === 'fulfilled' ? (hotRes.value.items || hotRes.value.books || hotRes.value.data || []) : [];
    const rated = ratingRes.status === 'fulfilled' ? (ratingRes.value.items || ratingRes.value.books || ratingRes.value.data || []) : [];
    const hotBooks = uniquePreviewBooks(hot).slice(0, 6);
    const ratedBooks = uniquePreviewBooks(rated, hot).filter(b => !hotBooks.some(x => String(x.id || x.book_id) === String(b.id || b.book_id))).slice(0, 6);
    const fallback = uniquePreviewBooks(hotBooks, ratedBooks).slice(0, 6);

    grid.innerHTML = `
      <div class="guest-shelf-hero">
        <div class="guest-shelf-copy">
          <span class="pill">Guest Preview</span>
          <h3>登录后解锁完整书架</h3>
          <div class="guest-shelf-actions">
            <button class="primary" onclick="window.location.href='/login?v=shelf'">登录后查看书架</button>
          </div>
        </div>
        <div class="guest-shelf-stats">
          ${stat('热门', hotBooks.length || fallback.length)}
          ${stat('高分', ratedBooks.length || fallback.length)}
          ${stat('分类', 3)}
        </div>
      </div>
      ${guestShelfSection('热门图书推荐', '先看看系统里近期热度较高、适合加入书架的图书。', hotBooks.length ? hotBooks : fallback, '热门推荐')}
      ${guestShelfSection('高分图书精选', '根据评分排序展示的优质图书，适合登录后沉淀到个人书架。', ratedBooks.length ? ratedBooks : fallback, '高分图书')}
    `;
  }catch(e){
    grid.innerHTML = `
      <div class="guest-shelf-hero">
        <div class="guest-shelf-copy">
          <span class="pill">Guest Preview</span>
          <h3>登录后查看个人书架</h3>
          <div class="guest-shelf-actions">
            <button class="primary" onclick="window.location.href='/login?v=shelf'">登录 / 注册</button>
            <button class="ghost" onclick="activateView('home')">返回首页</button>
          </div>
        </div>
      </div>`;
  }
}
async function loadShelves(){
  const grid = $('shelfGrid');
  if(!grid) return;
  syncAuthFromStorage();
  if(!token){
    await loadGuestShelfPreview();
    return;
  }
  grid.classList.remove('guest-shelf-grid');
  const data = await api('/ecosystem/shelves');
  const shelves = orderedShelves(data.shelves || []);
  grid.innerHTML = shelves.map(s => `
    <div class="shelf">
      <h4>${attr(s.name)} <span class="tag">${s.count}</span></h4>
      <div class="mini-list shelf-book-list">
        ${(s.books || []).map(x => shelfMiniItem(x, s.name)).join('') || '<span class="meta">暂无图书</span>'}
      </div>
    </div>
  `).join('');
}
async function loadOriginalFile(event){
  const file = event.target.files && event.target.files[0];
  if(!file) return;
  if(file.size > 1024 * 1024){
    toast('文稿文件请控制在 1MB 以内');
    event.target.value = '';
    return;
  }
  const text = await file.text();
  if($('originalReference')) $('originalReference').value = text;
  else if($('originalText')) $('originalText').value = text;
  if($('originalTitle') && !$('originalTitle').value.trim()){
    $('originalTitle').value = file.name.replace(/\.(txt|md|markdown|text)$/i, '').slice(0, 128);
  }
  originalAssistState = null;
  renderOriginalAssist(null);
}
function setupOriginalWorkshop(){
  const panel = document.querySelector('#original .original-panel');
  if(!panel) return;

  if(panel.dataset.mode !== 'novel'){
    panel.dataset.mode = 'novel';
    panel.innerHTML = `
      <div class="original-workshop">
        <div class="original-grid">
          <div class="original-editor original-card">
            <div class="original-card-head">
              <h4>创作信息</h4>
              <span>填写基础设定后再生成</span>
            </div>

            <div class="original-form-grid">
              <label>作品标题
                <input data-original-field id="originalTitle" placeholder="例如：星海来信" maxlength="128" />
              </label>
              <label>题材方向
                <input data-original-field id="originalGenre" placeholder="例如：科幻、悬疑、成长、奇幻" maxlength="64" />
              </label>
              <label>要求字数
                <select data-original-field id="originalWordCount">
                  <option value="800">短篇 600-1000 字</option>
                  <option value="1500" selected>标准短篇 1000-2000 字</option>
                  <option value="3000">中篇片段 2000-4000 字</option>
                  <option value="6000">长篇章节 4000-8000 字</option>
                  <option value="10000">长篇扩写 8000-12000 字</option>
                </select>
              </label>
              <label>上传参考文档
                <input data-original-field id="originalFile" type="file" accept=".txt,.md,.markdown,.text" onchange="loadOriginalFile(event)" />
              </label>
            </div>

            <label>参考文档
              <textarea data-original-field id="originalReference" rows="7" placeholder="上传或粘贴参考设定、人物关系、世界观、故事片段等，可为空。"></textarea>
            </label>
            <label>具体需求
              <textarea data-original-field id="originalRequirement" rows="6" placeholder="例如：主角是一名图书管理员，发现旧书可以通往不同星球；风格温柔但有悬念，结尾留下续作空间。"></textarea>
            </label>

            <div class="original-actions">
              <button class="primary" data-original-field onclick="generateOriginalNovel()">生成小说</button>
              <button data-original-field onclick="saveOriginalWork()">保存到我的书架</button>
            </div>
          </div>

          <div class="original-result">
            <div class="original-card">
              <div class="original-card-head">
                <h4>AI 辅助结果</h4>
                <span>简介、标签和排版建议</span>
              </div>
              <div id="originalAssistResult" class="original-empty">填写创作信息后点击生成小说，生成结果会在这里展示。</div>
              <div id="originalSaveProgress" class="original-save-progress hidden"><span></span><div><i></i></div></div>
            </div>

            <div class="original-card original-generated-box">
              <div class="original-card-head">
                <h4>生成正文</h4>
                <span>可手动修改后保存</span>
              </div>
              <textarea data-original-field id="originalText" rows="13" placeholder="点击生成小说后，正文会出现在这里；也可以手动修改后保存。"></textarea>
            </div>

            <div class="original-card">
              <div id="originalLibrary" class="original-library"></div>
            </div>
          </div>
        </div>

        <div class="original-lock-mask hidden">
          <div class="original-lock-card">
            <div class="original-lock-icon">🔒</div>
            <h4>登录后解锁 AI 创作</h4>
            <p>登录后才能生成小说、保存作品到我的书架，并继续在线阅读和管理个人原创作品。</p>
            <button class="primary" onclick="window.location.href='/login?mode=login&role=user'">去登录</button>
          </div>
        </div>
      </div>`;
  }

  refreshOriginalWorkshopAccess();
  renderOriginalAssist(originalAssistState);
  loadOriginalLibrary();
}

function refreshOriginalWorkshopAccess(){
  const panel = document.querySelector('#original .original-panel');
  if(!panel) return;
  syncAuthFromStorage();
  const locked = !token;
  panel.classList.toggle('original-locked', locked);
  panel.querySelectorAll('[data-original-field]').forEach(el => {
    el.disabled = locked;
  });
  const mask = panel.querySelector('.original-lock-mask');
  if(mask) mask.classList.toggle('hidden', !locked);
}

function originalGeneratePayload(){
  syncAuthFromStorage();
  const title = $('originalTitle')?.value.trim() || '';
  const genre = $('originalGenre')?.value.trim() || '';
  const requirement = $('originalRequirement')?.value.trim() || '';
  const reference_text = $('originalReference')?.value.trim() || '';
  const allowedWordCounts = new Set([800, 1500, 3000, 6000, 10000]);
  const selectedWordCount = Number($('originalWordCount')?.value || 1500);
  const word_count = allowedWordCounts.has(selectedWordCount) ? selectedWordCount : 1500;
  if(!token) throw new Error('请先登录后再使用原创工坊');
  if(!title) throw new Error('请填写作品标题');
  if(!genre) throw new Error('请填写题材方向');
  if(!requirement) throw new Error('请填写具体需求');
  return {title, genre, requirement, reference_text: reference_text || null, word_count};
}
function originalPayload(){
  syncAuthFromStorage();
  const title = $('originalTitle')?.value.trim() || '';
  const genre = $('originalGenre')?.value.trim() || '';
  const manuscript = $('originalText')?.value.trim() || '';
  if(!token) throw new Error('请先登录后再使用原创工坊');
  if(manuscript.length < 20) throw new Error('文稿正文至少需要 20 个字');
  return {title:title || null, genre:genre || null, manuscript};
}
function renderOriginalAssist(assist){
  const box = $('originalAssistResult');
  if(!box) return;
  if(!assist){
    box.textContent = '上传或粘贴文稿后，点击生成即可看到简介、标签和排版建议。';
    return;
  }
  const tags = (assist.tags || []).map(t=>`<span class="tag">${attr(t)}</span>`).join('');
  const layout = (assist.layout_suggestions || []).map(x=>`<li>${attr(x)}</li>`).join('');
  box.innerHTML = `
    <div class="original-assist-card">
      <div class="original-assist-head">
        <span class="pill">${attr(assist.category || '用户原创')}</span>
        <h4>${attr(assist.title || $('originalTitle')?.value || '未命名原创作品')}</h4>
      </div>
      <p>${attr(assist.summary || '暂无简介')}</p>
      <div class="tags">${tags}</div>
      <h5>排版建议</h5>
      <ul>${layout || '<li>建议先生成辅助结果后再保存作品。</li>'}</ul>
      ${assist.polished_opening ? `<h5>润色开头</h5><blockquote>${attr(assist.polished_opening)}</blockquote>` : ''}
      <div class="original-save-tip">保存后会进入“原创作品”书架，并可在详情页在线阅读。</div>
    </div>`;
}
async function loadOriginalLibrary(){
  const box = $('originalLibrary');
  if(!box) return;
  syncAuthFromStorage();
  if(!token){
    box.innerHTML = '<div class="original-library-empty">登录后可以在这里查看已保存的 AI 小说。</div>';
    return;
  }
  try{
    const data = await api('/chat/original/mine');
    const items = data.items || [];
    box.innerHTML = `
      <div class="original-library-head"><h4>我的AI小说</h4><span>${items.length} 篇</span></div>
      <div class="original-library-list">
        ${items.map(x=>{
          const b = x.book || {};
          return `<button class="original-library-item" onclick="openDetail(${b.id})"><b>${attr(b.title || '未命名作品')}</b><span>${attr((b.authors||[]).join('、') || b.author || '我')}</span></button>`;
        }).join('') || '<div class="original-library-empty">还没有保存 AI 小说。</div>'}
      </div>`;
  }catch(e){
    box.innerHTML = '<div class="original-library-empty">暂时无法加载 AI 小说列表。</div>';
  }
}
function setOriginalSaveProgress(percent, text){
  const box = $('originalSaveProgress');
  if(!box) return;
  box.classList.remove('hidden');
  const label = box.querySelector('span');
  const bar = box.querySelector('i');
  if(label) label.textContent = text || `保存中 ${percent}%`;
  if(bar) bar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
}
function hideOriginalSaveProgress(delay=900){
  const box = $('originalSaveProgress');
  if(!box) return;
  setTimeout(()=>box.classList.add('hidden'), delay);
}
async function analyzeOriginal(){
  try{
    const payload = originalPayload();
    $('originalAssistResult').innerHTML = '<div class="original-empty">AI 正在分析文稿，生成简介、标签和排版建议...</div>';
    const data = await api('/chat/original/assist', {method:'POST', body:JSON.stringify(payload)});
    originalAssistState = data.assist;
    renderOriginalAssist(originalAssistState);
    toast('文稿分析完成');
  }catch(e){
    renderOriginalAssist(null);
    toast(e.message || '文稿分析失败');
  }
}
async function generateOriginalNovel(){
  try{
    const payload = originalGeneratePayload();
    $('originalAssistResult').innerHTML = '<div class="original-empty">AI 正在生成小说，请稍等。字数越多，等待时间越长...</div>';
    const data = await api('/chat/original/generate', {method:'POST', body:JSON.stringify(payload)});
    if($('originalText')) $('originalText').value = data.manuscript || '';
    originalAssistState = data.assist;
    renderOriginalAssist(originalAssistState);
    toast('小说生成完成');
  }catch(e){
    toast(e.message || '生成小说失败');
  }
}
async function saveOriginalWork(){
  try{
    const payload = originalPayload();
    const assist = originalAssistState || {};
    setOriginalSaveProgress(15, '正在准备作品信息...');
    await new Promise(resolve=>setTimeout(resolve, 120));
    setOriginalSaveProgress(45, '正在保存到书架...');
    const data = await api('/chat/original/save', {
      method:'POST',
      body:JSON.stringify({
        ...payload,
        summary: assist.summary || null,
        tags: assist.tags || [],
        layout_suggestions: assist.layout_suggestions || [],
        save_to_shelf: true
      })
    });
    setOriginalSaveProgress(82, '正在刷新我的AI小说...');
    originalAssistState = data.assist;
    renderOriginalAssist(originalAssistState);
    toast('原创作品已保存到书架');
    await Promise.allSettled([loadShelfState(), loadShelves(), loadProfile(), loadOriginalLibrary()]);
    setOriginalSaveProgress(100, '保存成功');
    hideOriginalSaveProgress();
    if(data.book?.id) openDetail(data.book.id);
  }catch(e){
    setOriginalSaveProgress(100, '保存失败');
    hideOriginalSaveProgress(1400);
    toast(e.message || '保存原创作品失败');
  }
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
function interestBubbleSize(weight, index=0){
  const n = Math.max(0.18, Math.min(1.6, Number(weight || 0)));
  return Math.round(58 + n * 66 + (index === 0 ? 14 : 0));
}
function interestBubbleFontSize(size, index=0){
  const base = Math.round(size * (index === 0 ? 0.28 : 0.25));
  return Math.max(15, Math.min(index === 0 ? 42 : 34, base));
}
function renderInterestProfile(profile){
  const box = $('tagCloud');
  if(!box) return;
  const tags = (profile.tag_preferences || []).slice(0, 14);
  if(!tags.length){
    box.innerHTML = '<div class="interest-bubble-box"><span class="meta">继续阅读后会生成兴趣标签</span></div>';
    return;
  }
  box.innerHTML = `
    <div class="interest-bubble-box">
      ${tags.map((t, idx)=>{
        const size = interestBubbleSize(t.weight, idx);
        const fontSize = interestBubbleFontSize(size, idx);
        return `<span class="interest-bubble ${idx === 0 ? 'primary' : ''}" style="--bubble-size:${size}px;--bubble-font:${fontSize}px;font-size:${fontSize}px">${attr(t.name)}</span>`;
      }).join('')}
    </div>`;
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
          <div class="guest-profile-icon">知</div>
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
  renderInterestProfile(profile);
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
  $('adminBookList').innerHTML = `<table><thead><tr><th>ID</th><th>书名</th><th>作者</th><th>标签</th><th>评分</th><th>操作</th></tr></thead><tbody>${(data.items||[]).map(b=>`<tr><td>${b.id}</td><td><b>${b.title}</b><br><span>${b.publisher||''}</span></td><td>${(b.authors||[]).join('、')}</td><td>${uniqueTerms(b.tags || [b.category]).slice(0,3).join('、')}</td><td>${b.avg_rating||0}</td><td><button onclick="adminEditBook(${b.id})">编辑</button><button class="danger-btn" onclick="adminDeleteBook(${b.id}, '${attr(b.title)}')">删除</button></td></tr>`).join('') || '<tr><td colspan="6">暂无图书</td></tr>'}</tbody></table>`;
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
  // Strip <think>...</think> blocks from reasoning models (MiniMax, DeepSeek, etc.)
  s = s.replace(/<think[\s\S]*?<\/think>/gi, '');
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
      <div class="chat-welcome-logo">知</div>
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
async function loadShelves(){
  const grid = $('shelfGrid');
  if(!grid) return;
  syncAuthFromStorage();
  if(!token){
    await loadGuestShelfPreview();
    return;
  }
  grid.classList.remove('guest-shelf-grid');
  const data = await api('/ecosystem/shelves');
  const shelves = orderedShelves(data.shelves || []);
  grid.innerHTML = shelves.map(s => `
    <div class="shelf">
      <h4>${attr(s.name)} <span class="tag">${s.count}</span></h4>
      <div class="mini-list shelf-book-list">
        ${(s.books || []).map(x => shelfMiniItem(x, s.name)).join('') || '<span class="meta">暂无图书</span>'}
      </div>
    </div>
  `).join('');
}
async function removeShelfBook(event, bookId, shelfName){
  event?.stopPropagation?.();
  if(!token) return toast('请先登录');
  if(!confirm(`确定从「${shelfName}」删除这本书吗？`)) return;
  await api(`/ecosystem/shelves/book/${bookId}?shelf_name=${encodeURIComponent(shelfName)}`, {method:'DELETE'});
  if(shelfState[bookId]) delete shelfState[bookId][shelfName];
  toast('已从书架删除');
  await Promise.allSettled([loadShelves(), loadShelfState(), loadProfile(), loadOriginalLibrary()]);
}
async function loadAll(){
  setupOriginalWorkshop();
  const shelfReady = token ? loadShelfState().then(refreshShelfButtons).catch(()=>{}) : Promise.resolve();
  await Promise.allSettled([
    loadMetrics(),
    loadRecommendations(),
    loadHot(),
    loadNew(),
    loadBooks(),
    loadOptions(),
    loadHotSearches()
  ]);
  shelfReady.then(refreshShelfButtons).catch(()=>{});
}

function activateView(view){
  if(view === 'admin' && !isAdmin()){
    toast('请使用管理员账号登录');
    view = 'home';
  }
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
  if(view==='original') setupOriginalWorkshop();
  if(view==='admin') loadAdmin();
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
updateUserBadge(); updateSearchbarForView('home'); loadAll();
