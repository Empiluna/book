/**
 * ═══════════════════════════════════════════════════════
 * 管理后台 — 负责人: B + D
 *   B (模块二): 知识图谱管理 (实体导入、图谱统计、约束初始化)
 *   D (模块四): 购书链接配置、评论管理
 * 路由: #/admin
 * ═══════════════════════════════════════════════════════
 */

async function adminPage() {
    if (!Auth.requireAdmin()) return '';

    return `
    <div class="container">
        <h2>⚙️ 管理后台</h2>

        <!-- Tab 切换 -->
        <div class="admin-tabs" style="margin-top:1.5rem;">
            <button class="admin-tab active" onclick="switchAdminTab('graph')">🕸️ 知识图谱</button>
            <button class="admin-tab" onclick="switchAdminTab('comments')">💬 评论管理</button>
            <button class="admin-tab" onclick="switchAdminTab('purchase')">🛒 购书链接</button>
        </div>

        <div id="adminContent"></div>
    </div>

    <script>
        let currentAdminTab = 'graph';

        window.switchAdminTab = async function(tab) {
            currentAdminTab = tab;
            // 更新 tab 样式
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            event.target.classList.add('active');
            await loadAdminTab(tab);
        };

        async function loadAdminTab(tab) {
            const container = document.getElementById('adminContent');
            container.innerHTML = '<div class="spinner"></div>';

            switch (tab) {
                case 'graph':
                    container.innerHTML = await renderGraphAdmin();
                    break;
                case 'comments':
                    container.innerHTML = '<div class="empty-state"><p>评论管理 — 请在具体图书详情页操作</p></div>';
                    break;
                case 'purchase':
                    container.innerHTML = renderPurchaseAdmin();
                    break;
            }
        }

        async function renderGraphAdmin() {
            let stats = { books: 0, authors: 0, tags: 0, relations: 0 };
            try {
                stats = await api.graph.getStats();
            } catch (e) { /* Neo4j 可能未启动 */ }

            return `
                <div class="profile-stats" style="margin-top:1rem;">
                    <div class="stat-card card"><div class="num">${stats.books || 0}</div><div class="label">图书实体</div></div>
                    <div class="stat-card card"><div class="num">${stats.authors || 0}</div><div class="label">作者实体</div></div>
                    <div class="stat-card card"><div class="num">${stats.tags || 0}</div><div class="label">标签实体</div></div>
                    <div class="stat-card card"><div class="num">${stats.relations || 0}</div><div class="label">关系数量</div></div>
                </div>
                <div style="margin-top:1.5rem;">
                    <button class="btn btn-primary btn-sm" onclick="handleInitGraph()">初始化图谱约束</button>
                    <span style="font-size:0.8rem;color:#64748b;margin-left:0.5rem;">首次启动时执行</span>
                </div>
                <div style="margin-top:1rem;padding:1rem;background:#f1f5f9;border-radius:8px;">
                    <h4>添加实体关系</h4>
                    <p style="font-size:0.8rem;color:#64748b;">通过 Neo4j Browser 或 API 导入：</p>
                    <code>POST /api/v1/graph/entity</code>
                    <code style="margin-left:1rem;">POST /api/v1/graph/relation</code>
                </div>
            `;
        }

        function renderPurchaseAdmin() {
            return `
                <div class="card" style="margin-top:1rem;">
                    <h4>配置图书购书链接</h4>
                    <div class="form-group">
                        <label>图书 ID</label>
                        <input type="number" id="purchaseBookId" class="form-control" placeholder="输入图书 ID">
                    </div>
                    <div class="form-group">
                        <label>京东链接</label>
                        <input type="url" id="purchaseJd" class="form-control" placeholder="https://item.jd.com/...">
                    </div>
                    <div class="form-group">
                        <label>当当链接</label>
                        <input type="url" id="purchaseDd" class="form-control" placeholder="https://product.dangdang.com/...">
                    </div>
                    <div class="form-group">
                        <label>淘宝链接</label>
                        <input type="url" id="purchaseTb" class="form-control" placeholder="https://item.taobao.com/...">
                    </div>
                    <button class="btn btn-primary" onclick="handleSavePurchase()">保存购书链接</button>
                </div>
            `;
        }

        window.handleInitGraph = async function() {
            try {
                await api.graph.initConstraints();
                Toast.show('图谱约束已创建');
            } catch (err) { Toast.show(err.message, 'error'); }
        };

        window.handleSavePurchase = async function() {
            const bookId = parseInt(document.getElementById('purchaseBookId').value);
            if (!bookId) { Toast.show('请输入图书ID', 'error'); return; }
            try {
                // 注意: 这需要模块四的 API 端点支持
                await fetch(API_BASE + '/ecosystem/purchase', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + api.token },
                    body: JSON.stringify({
                        book_id: bookId,
                        url_jd: document.getElementById('purchaseJd').value || null,
                        url_dd: document.getElementById('purchaseDd').value || null,
                        url_tb: document.getElementById('purchaseTb').value || null,
                    })
                });
                Toast.show('购书链接已保存');
            } catch (err) { Toast.show(err.message, 'error'); }
        };

        // 初始加载
        loadAdminTab('graph');
    </script>`;
}
