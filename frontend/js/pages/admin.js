/**
 * ═══════════════════════════════════════════════════════
 * 管理后台 — B + D
 *   B: 知识图谱管理 (统计、初始化、实体关系创建)
 *   D: 购书链接配置、评论管理入口
 * ═══════════════════════════════════════════════════════
 */

async function adminPage() {
    if (!Auth.requireAdmin()) return '';

    return `
    <div class="container">
        <h2>⚙️ 管理后台</h2>
        <div class="admin-tabs" style="margin-top:1.5rem;display:flex;gap:0;border-bottom:2px solid #e2e8f0;">
            <button class="admin-tab active" onclick="switchAdminTab('graph')">🕸️ 知识图谱</button>
            <button class="admin-tab" onclick="switchAdminTab('purchase')">🛒 购书链接</button>
        </div>
        <div id="adminContent"></div>
    </div>
    <script>
        var currentAdminTab = 'graph';
        window.switchAdminTab = async function(tab) {
            currentAdminTab = tab;
            document.querySelectorAll('.admin-tab').forEach(function(t) { t.classList.remove('active'); });
            if (event && event.target) event.target.classList.add('active');
            await loadAdminTab(tab);
        };
        async function loadAdminTab(tab) {
            var c = document.getElementById('adminContent');
            c.innerHTML = '<div class="spinner"></div>';
            if (tab === 'graph') {
                var stats = {};
                try { stats = await api.graph.getStats(); } catch(e) {}
                c.innerHTML = renderGraphTab(stats);
            } else {
                c.innerHTML = renderPurchaseTab();
            }
        }
        function renderGraphTab(stats) {
            return '<div class="profile-stats" style="margin-top:1rem;">' +
                '<div class="stat-card card"><div class="num">'+(stats.books||0)+'</div><div class="label">图书实体</div></div>' +
                '<div class="stat-card card"><div class="num">'+(stats.authors||0)+'</div><div class="label">作者实体</div></div>' +
                '<div class="stat-card card"><div class="num">'+(stats.tags||0)+'</div><div class="label">标签实体</div></div>' +
                '<div class="stat-card card"><div class="num">'+(stats.relations||0)+'</div><div class="label">关系数量</div></div>' +
            '</div>' +
            '<div style="margin-top:1.5rem;">' +
                '<button class="btn btn-primary btn-sm" onclick="initGraph()">初始化图谱约束</button>' +
                '<span style="font-size:0.8rem;color:#64748b;margin-left:0.5rem;">首次启动时执行</span>' +
            '</div>' +
            '<div style="margin-top:1.5rem;" class="card"><h4>创建实体</h4>' +
                '<div class="form-group"><label>类型</label><select id="entityType" class="form-control"><option>Book</option><option>Author</option><option>Tag</option><option>Publisher</option><option>Series</option></select></div>' +
                '<div class="form-group"><label>名称</label><input id="entityName" class="form-control" placeholder="实体名称"></div>' +
                '<div class="form-group"><label>ID (与MySQL对应)</label><input id="entityId" type="number" class="form-control" placeholder="实体ID"></div>' +
                '<button class="btn btn-primary btn-sm" onclick="createEntity()">创建</button>' +
            '</div>' +
            '<div style="margin-top:1rem;" class="card"><h4>创建关系</h4>' +
                '<div class="form-group"><label>源类型</label><input id="relSrcType" class="form-control" placeholder="Book" value="Book"></div>' +
                '<div class="form-group"><label>源ID</label><input id="relSrcId" type="number" class="form-control"></div>' +
                '<div class="form-group"><label>关系</label><input id="relName" class="form-control" placeholder="AUTHORED_BY"></div>' +
                '<div class="form-group"><label>目标类型</label><input id="relTgtType" class="form-control" placeholder="Author" value="Author"></div>' +
                '<div class="form-group"><label>目标ID</label><input id="relTgtId" type="number" class="form-control"></div>' +
                '<button class="btn btn-primary btn-sm" onclick="createRelation()">创建关系</button>' +
            '</div>';
        }
        function renderPurchaseTab() {
            return '<div class="card" style="margin-top:1rem;"><h4>配置图书购书链接</h4>' +
                '<div class="form-group"><label>图书 ID</label><input type="number" id="pid" class="form-control" placeholder="输入图书 ID"></div>' +
                '<div class="form-group"><label>京东链接</label><input type="url" id="pjd" class="form-control"></div>' +
                '<div class="form-group"><label>当当链接</label><input type="url" id="pdd" class="form-control"></div>' +
                '<div class="form-group"><label>淘宝链接</label><input type="url" id="ptb" class="form-control"></div>' +
                '<button class="btn btn-primary" onclick="savePurchase()">保存</button></div>';
        }
        window.initGraph = async function() {
            try { await api.graph.initConstraints(); Toast.show('图谱约束已创建'); }
            catch(e) { Toast.show(e.message, 'error'); }
        };
        window.createEntity = async function() {
            var t = document.getElementById('entityType').value;
            var n = document.getElementById('entityName').value.trim();
            var id = parseInt(document.getElementById('entityId').value);
            if (!n || !id) { Toast.show('请填写完整信息', 'error'); return; }
            try { await api.graph.createEntity({entity_type:t, entity_name:n, properties:{id:id}}); Toast.show('实体已创建'); }
            catch(e) { Toast.show(e.message, 'error'); }
        };
        window.createRelation = async function() {
            var st = document.getElementById('relSrcType').value.trim();
            var si = parseInt(document.getElementById('relSrcId').value);
            var rn = document.getElementById('relName').value.trim();
            var tt = document.getElementById('relTgtType').value.trim();
            var ti = parseInt(document.getElementById('relTgtId').value);
            if (!st||!si||!rn||!tt||!ti) { Toast.show('请填写完整信息', 'error'); return; }
            try { await api.graph.createRelation({source_type:st, source_id:si, relation:rn, target_type:tt, target_id:ti}); Toast.show('关系已创建'); }
            catch(e) { Toast.show(e.message, 'error'); }
        };
        window.savePurchase = async function() {
            var bid = parseInt(document.getElementById('pid').value);
            if (!bid) { Toast.show('请输入图书ID', 'error'); return; }
            try {
                await api.ecosystem.updatePurchaseLinks({
                    book_id: bid,
                    url_jd: document.getElementById('pjd').value || null,
                    url_dd: document.getElementById('pdd').value || null,
                    url_tb: document.getElementById('ptb').value || null,
                });
                Toast.show('购书链接已保存');
            } catch(e) { Toast.show(e.message, 'error'); }
        };
        loadAdminTab('graph');
    </script>`;
}
