/**
 * ═══════════════════════════════════════════════════════
 * 评论区组件 — 负责人: D (模块四: 阅读生态)
 * 列表渲染、发表评论、点赞、置顶、删除
 * ═══════════════════════════════════════════════════════
 */

/**
 * 渲染单条评论
 */
function renderCommentItem(comment) {
    const isPinned = comment.is_pinned ? ' comment-pinned' : '';
    const pinnedBadge = comment.is_pinned ? ' 📌置顶' : '';
    const time = comment.created_at ? new Date(comment.created_at).toLocaleDateString() : '';

    return `
    <div class="comment-item${isPinned}" id="comment-${comment.id}">
        <div class="comment-header">
            <span class="comment-user">${comment.username || '用户' + comment.user_id}${pinnedBadge}</span>
            <span class="comment-time">${time}</span>
        </div>
        <div class="comment-body">${escapeHtml(comment.content)}</div>
        <div class="comment-actions">
            <button onclick="handleLikeComment(${comment.id})">
                👍 ${comment.likes_count || 0}
            </button>
            ${Auth.isAdmin() ? `
                <button onclick="handlePinComment(${comment.id}, ${!comment.is_pinned})">
                    ${comment.is_pinned ? '取消置顶' : '📌 置顶'}
                </button>
                <button onclick="handleDeleteComment(${comment.id})" style="color:#ef4444;">
                    🗑 删除
                </button>
            ` : ''}
        </div>
    </div>`;
}

/**
 * 渲染评论列表
 */
function renderCommentList(comments) {
    if (!comments || comments.length === 0) {
        return `<div class="empty-state"><p>暂无评论，来说两句吧</p></div>`;
    }
    return `<div class="comment-list">${comments.map(renderCommentItem).join('')}</div>`;
}

/**
 * 渲染评论输入框
 */
function renderCommentForm(bookId) {
    if (!Auth.isLoggedIn()) {
        return `<p class="text-center mt-2"><a href="#/login">登录</a>后即可发表评论</p>`;
    }
    return `
    <div class="card mb-2" style="margin-top: 1rem;">
        <h4>发表评论</h4>
        <div class="form-group">
            <textarea id="commentContent" class="form-control" placeholder="写下你对这本书的看法...（支持 Markdown 简单格式）"></textarea>
        </div>
        <button class="btn btn-primary" onclick="handleCreateComment(${bookId})">发布评论</button>
    </div>`;
}

// ── 操作函数（页面中调用） ──

async function handleCreateComment(bookId) {
    const content = document.getElementById('commentContent')?.value?.trim();
    if (!content) { Toast.show('请输入评论内容', 'error'); return; }
    try {
        await api.ecosystem.createComment({ book_id: bookId, content });
        Toast.show('评论发布成功');
        router.resolve(); // 刷新当前页面
    } catch (err) {
        Toast.show(err.message, 'error');
    }
}

async function handleLikeComment(commentId) {
    try {
        const result = await api.ecosystem.likeComment({ comment_id: commentId });
        Toast.show(result.liked ? '已点赞' : '已取消点赞');
        router.resolve();
    } catch (err) {
        Toast.show(err.message, 'error');
    }
}

async function handlePinComment(commentId, isPinned) {
    try {
        await api.ecosystem.pinComment(commentId, isPinned);
        Toast.show(isPinned ? '已置顶' : '已取消置顶');
        router.resolve();
    } catch (err) {
        Toast.show(err.message, 'error');
    }
}

async function handleDeleteComment(commentId) {
    if (!confirm('确定删除这条评论吗？')) return;
    try {
        await api.ecosystem.deleteComment(commentId);
        Toast.show('评论已删除');
        router.resolve();
    } catch (err) {
        Toast.show(err.message, 'error');
    }
}

/** HTML 转义，防 XSS */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
