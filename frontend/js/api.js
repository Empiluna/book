/**
 * ═══════════════════════════════════════════════════════
 * API 请求封装
 * 所有后端调用统一通过此模块，自动处理 JWT、错误、JSON 解析
 * ═══════════════════════════════════════════════════════
 */

const API_BASE = 'http://localhost:8000/api/v1';

class ApiClient {
    constructor() {
        this.token = localStorage.getItem('access_token');
    }

    // ── Token 管理 ──
    setToken(token) {
        this.token = token;
        localStorage.setItem('access_token', token);
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_info');
    }

    // ── 通用请求 ──
    async request(method, path, body = null) {
        const headers = { 'Content-Type': 'application/json' };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const options = { method, headers };
        if (body && method !== 'GET') {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE}${path}`, options);

        if (response.status === 401) {
            // Token 过期 → 跳转登录
            this.clearToken();
            window.location.hash = '#/login';
            throw new Error('登录已过期，请重新登录');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || `请求失败 (${response.status})`);
        }

        return data;
    }

    get(path) { return this.request('GET', path); }
    post(path, body) { return this.request('POST', path, body); }
    put(path, body) { return this.request('PUT', path, body); }
    delete(path) { return this.request('DELETE', path); }

    // ═══════════════════════════════════════════
    // 模块一：用户画像 (负责人: A)
    // ═══════════════════════════════════════════
    user = {
        register: (data) => this.post('/user/register', data),
        login: (data) => this.post('/user/login', data),
        getProfile: () => this.get('/user/profile'),
        getHistory: (limit = 50) => this.get(`/user/history?limit=${limit}`),
        addHistory: (data) => this.post('/user/history', data),
        addBookmark: (data) => this.post('/user/bookmark', data),
        removeBookmark: (bookId) => this.delete(`/user/bookmark/${bookId}`),
        getBookmarks: () => this.get('/user/bookmarks'),
        rateBook: (data) => this.post('/user/rating', data),
        updateProgress: (data) => this.post('/user/progress', data),
        getProgress: () => this.get('/user/progress'),
        getStats: () => this.get('/user/stats'),
    };

    // ═══════════════════════════════════════════
    // 模块二：知识图谱 (负责人: B)
    // ═══════════════════════════════════════════
    graph = {
        queryPaths: (data) => this.post('/graph/paths', data),
        getVisualization: (bookId, depth = 2) => this.get(`/graph/visualize/${bookId}?depth=${depth}`),
        getStats: () => this.get('/graph/stats'),
        initConstraints: () => this.post('/graph/init'),
    };

    // ═══════════════════════════════════════════
    // 模块三：个性化推荐 (负责人: C)
    // ═══════════════════════════════════════════
    recommend = {
        home: (params = {}) => {
            const query = new URLSearchParams(params).toString();
            return this.get(`/recommend/home?${query}`);
        },
        similar: (bookId, topN = 10) =>
            this.get(`/recommend/similar/${bookId}?top_n=${topN}`),
        hot: (topN = 20) => this.get(`/recommend/hot?top_n=${topN}`),
        updateWeights: (data) => this.put('/recommend/weights', data),
    };

    // ═══════════════════════════════════════════
    // 模块四：阅读生态 (负责人: D)
    // ═══════════════════════════════════════════
    ecosystem = {
        getTrial: (bookId) => this.get(`/ecosystem/trial/${bookId}`),
        getTrialContent: (bookId) => this.get(`/ecosystem/trial/${bookId}/content`),
        getComments: (bookId, page = 1) => this.get(`/ecosystem/comments/${bookId}?page=${page}`),
        createComment: (data) => this.post('/ecosystem/comments', data),
        likeComment: (data) => this.post('/ecosystem/comments/like', data),
        pinComment: (commentId, isPinned = true) =>
            this.put(`/ecosystem/comments/${commentId}/pin?is_pinned=${isPinned}`),
        deleteComment: (commentId) => this.delete(`/ecosystem/comments/${commentId}`),
        getPurchaseLinks: (bookId) => this.get(`/ecosystem/purchase/${bookId}`),
        getShelves: () => this.get('/ecosystem/shelves'),
        getShelfBooks: (shelfName) => this.get(`/ecosystem/shelves/${encodeURIComponent(shelfName)}`),
        moveBook: (bookId, newShelf) =>
            this.put(`/ecosystem/shelves/move?book_id=${bookId}&new_shelf=${encodeURIComponent(newShelf)}`),
        getReadingStats: () => this.get('/ecosystem/stats'),
    };
}

// 全局单例
const api = new ApiClient();
