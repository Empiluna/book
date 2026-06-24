/**
 * ═══════════════════════════════════════════════════════
 * 简易 Hash 路由
 * 无框架依赖，通过 window.location.hash 实现页面切换
 * ═══════════════════════════════════════════════════════
 */

class Router {
    constructor() {
        this.routes = {};
        this.currentPage = null;
        window.addEventListener('hashchange', () => this.resolve());
    }

    /** 注册路由 */
    on(pattern, handler) {
        this.routes[pattern] = handler;
    }

    /** 导航到指定路径 */
    navigate(path) {
        window.location.hash = path;
    }

    /** 解析当前 hash 并执行对应 handler */
    async resolve() {
        const hash = window.location.hash || '#/';
        const [path, queryString] = hash.split('?');

        // 解析 query string 参数
        const queryParams = {};
        if (queryString) {
            queryString.split('&').forEach(pair => {
                const [k, v] = pair.split('=');
                queryParams[k] = v ? decodeURIComponent(v) : '';
            });
        }

        // 查找匹配的路由
        let handler = null;
        let params = { ...queryParams };

        for (const [pattern, h] of Object.entries(this.routes)) {
            const regex = this._patternToRegex(pattern);
            const match = path.match(regex);
            if (match) {
                handler = h;
                Object.assign(params, match.groups || {});
                break;
            }
        }

        if (handler) {
            // 更新导航栏激活状态
            this._updateNavActive(path);
            // 渲染页面到 #app 容器
            const app = document.getElementById('app');
            if (app) {
                try {
                    app.innerHTML = '<div class="spinner"></div>';
                    const html = await handler(params);
                    app.innerHTML = html;
                } catch (err) {
                    console.error('路由渲染错误:', err);
                    app.innerHTML = `<div class="empty-state">
                        <div class="icon">⚠️</div>
                        <p>页面加载失败: ${err.message}</p>
                    </div>`;
                }
            }
        } else {
            console.warn(`未匹配路由: ${path}`);
        }
    }

    /** 将路由模式转为正则 */
    _patternToRegex(pattern) {
        return new RegExp(
            '^' + pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '$'
        );
    }

    /** 更新导航栏的 active 样式 */
    _updateNavActive(path) {
        document.querySelectorAll('.navbar-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === path) {
                link.classList.add('active');
            }
        });
    }
}

// 全局路由实例
const router = new Router();
