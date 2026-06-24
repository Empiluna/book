/**
 * ═══════════════════════════════════════════════════════
 * 智能问答助手 — 悬浮聊天组件 (ALL)
 * 跨模块共用，支持各模块业务场景的自然语言交互
 * ═══════════════════════════════════════════════════════
 */

const ChatWidget = {
    _open: false,
    _messages: [],
    _loading: false,

    /** 渲染悬浮按钮 */
    renderButton() {
        return `
        <div id="chat-fab" class="chat-fab" onclick="ChatWidget.toggle()" title="智能荐书助手">
            <span class="chat-fab-icon">💬</span>
        </div>`;
    },

    /** 渲染对话面板 */
    renderPanel() {
        const msgs = this._messages.length === 0
            ? this._renderWelcome()
            : this._messages.map(m => this._renderMessage(m)).join('');

        const loading = this._loading
            ? `<div class="chat-msg chat-msg-bot"><div class="chat-bubble bot"><span class="chat-typing">...</span></div></div>`
            : '';

        return `
        <div id="chat-panel" class="chat-panel">
            <div class="chat-header">
                <span>🤖 智能荐书助手</span>
                <div style="display:flex;gap:12px;">
                    <button class="chat-header-btn" onclick="ChatWidget.clearHistory()">清空</button>
                    <button class="chat-header-btn" onclick="ChatWidget.close()">✕</button>
                </div>
            </div>
            <div class="chat-body" id="chat-body">
                ${msgs}${loading}
            </div>
            <div class="chat-input-row">
                <input id="chat-input" class="chat-input" placeholder="输入问题，如: 推荐几本科幻小说..."
                    onkeydown="if(event.key==='Enter')ChatWidget.send()" />
                <button class="chat-send" onclick="ChatWidget.send()"
                    ${this._loading ? 'disabled' : ''}>发送</button>
            </div>
        </div>`;
    },

    _renderWelcome() {
        return `
        <div class="chat-msg chat-msg-bot">
            <div class="chat-bubble bot">
                <div style="margin-bottom:10px;">👋 你好！我是智能荐书助手，可以帮你：</div>
                <div class="chat-quick-actions">
                    <span onclick="ChatWidget.quickSend('推荐几本科幻小说')">📖 推荐图书</span>
                    <span onclick="ChatWidget.quickSend('怎么看我的阅读进度')">❓ 功能问答</span>
                    <span onclick="ChatWidget.quickSend('我收藏了哪些书')">📊 个人数据</span>
                    <span onclick="ChatWidget.quickSend('有哪些热门新书')">🔥 热门新书</span>
                </div>
            </div>
        </div>`;
    },

    _renderMessage(m) {
        const cls = m.role === 'user' ? 'user' : 'bot';
        let html = `<div class="chat-msg chat-msg-${cls}">
            <div class="chat-bubble ${cls}">${escapeHtml(m.content).replace(/\n/g, '<br>')}`;
        if (m.suggestedQuestions && m.suggestedQuestions.length) {
            html += `<div class="chat-quick-actions" style="margin-top:8px;">`;
            for (const q of m.suggestedQuestions) {
                html += `<span onclick="ChatWidget.quickSend('${escapeHtml(q)}')">${escapeHtml(q)}</span>`;
            }
            html += `</div>`;
        }
        html += `</div></div>`;
        return html;
    },

    /** 切换显示/隐藏 */
    toggle() {
        if (this._open) {
            this.close();
        } else {
            this.open();
        }
    },

    open() {
        this._open = true;
        document.getElementById('chat-fab').style.display = 'none';
        const wrap = document.getElementById('chat-widget-wrap');
        wrap.innerHTML = this.renderPanel();
        wrap.style.display = 'block';
        this._scrollBottom();
        // 加载历史
        if (Auth.isLoggedIn()) {
            api.chat.getHistory(30).then(res => {
                if (res && res.messages) {
                    this._messages = res.messages.map(m => ({
                        role: m.role,
                        content: m.content,
                        suggestedQuestions: null,
                    }));
                    wrap.innerHTML = this.renderPanel();
                    this._scrollBottom();
                }
            }).catch(() => {});
        }
    },

    close() {
        this._open = false;
        document.getElementById('chat-fab').style.display = 'flex';
        document.getElementById('chat-widget-wrap').style.display = 'none';
    },

    /** 发送消息 */
    async send() {
        const input = document.getElementById('chat-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text || this._loading) return;

        this._messages.push({ role: 'user', content: text });
        input.value = '';
        this._loading = true;
        this._rerender();
        this._scrollBottom();

        try {
            const res = await api.chat.send({ message: text });
            this._messages.push({
                role: 'assistant',
                content: res.content,
                suggestedQuestions: res.suggested_questions || null,
            });
        } catch (e) {
            this._messages.push({
                role: 'assistant',
                content: '抱歉，AI服务暂时不可用。请稍后重试或通过页面菜单使用系统功能。',
                suggestedQuestions: null,
            });
        }
        this._loading = false;
        this._rerender();
        this._scrollBottom();
    },

    /** 快捷提问 */
    quickSend(text) {
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = text;
            this.send();
        }
    },

    /** 清空历史 */
    async clearHistory() {
        try { await api.chat.deleteHistory(); } catch (e) {}
        this._messages = [];
        this._rerender();
    },

    _rerender() {
        const wrap = document.getElementById('chat-widget-wrap');
        if (wrap && this._open) {
            wrap.innerHTML = this.renderPanel();
        }
    },

    _scrollBottom() {
        setTimeout(() => {
            const body = document.getElementById('chat-body');
            if (body) body.scrollTop = body.scrollHeight;
        }, 50);
    },
};

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
