/**
 * ═══════════════════════════════════════════════════════
 * 登录/注册页
 * 路由: #/login
 * 对接: 模块一(A) 用户认证接口
 * ═══════════════════════════════════════════════════════
 */

async function loginPage() {
    Auth.redirectIfLoggedIn();

    return `
    <div class="auth-page">
        <div class="auth-card">
            <h2 id="authTitle">登录</h2>
            <form id="authForm" onsubmit="handleAuthSubmit(event)">
                <div class="form-group" id="emailGroup" style="display:none;">
                    <label>邮箱</label>
                    <input type="email" id="email" class="form-control" placeholder="your@email.com">
                </div>
                <div class="form-group">
                    <label>用户名</label>
                    <input type="text" id="username" class="form-control" placeholder="请输入用户名" required>
                </div>
                <div class="form-group">
                    <label>密码</label>
                    <input type="password" id="password" class="form-control" placeholder="请输入密码" required minlength="6">
                </div>
                <button type="submit" class="btn btn-primary" style="width:100%;">登录</button>
            </form>
            <div class="auth-toggle">
                <span id="toggleText">还没有账号？</span>
                <a href="#" id="toggleLink" onclick="toggleAuthMode(event)">去注册</a>
            </div>
        </div>
    </div>
    <script>
        // ── 切换登录/注册模式 ──
        let isLoginMode = true;

        window.toggleAuthMode = function(e) {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            document.getElementById('authTitle').textContent = isLoginMode ? '登录' : '注册';
            document.getElementById('emailGroup').style.display = isLoginMode ? 'none' : 'block';
            document.querySelector('#authForm button').textContent = isLoginMode ? '登录' : '注册';
            document.getElementById('toggleText').textContent = isLoginMode ? '还没有账号？' : '已有账号？';
            document.getElementById('toggleLink').textContent = isLoginMode ? '去注册' : '去登录';
            if (!isLoginMode) {
                document.getElementById('email').required = true;
            } else {
                document.getElementById('email').required = false;
            }
        };

        // ── 提交登录/注册 ──
        window.handleAuthSubmit = async function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            try {
                if (isLoginMode) {
                    await Auth.login(username, password);
                    Toast.show('登录成功', 'success');
                } else {
                    const email = document.getElementById('email').value.trim();
                    await Auth.register(username, email, password);
                    Toast.show('注册成功', 'success');
                }
                window.refreshNavbar();
                router.navigate('#/');
            } catch (err) {
                Toast.show(err.message, 'error');
            }
        };
    </script>`;
}
