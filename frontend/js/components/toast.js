/**
 * ═══════════════════════════════════════════════════════
 * Toast 消息提示组件
 * 用法: Toast.show('操作成功', 'success')
 * ═══════════════════════════════════════════════════════
 */

const Toast = {
    _container: null,

    _ensureContainer() {
        if (!this._container) {
            this._container = document.createElement('div');
            this._container.className = 'toast-container';
            document.body.appendChild(this._container);
        }
    },

    show(message, type = 'success', duration = 3000) {
        this._ensureContainer();
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        this._container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
};
