/**
 * ═══════════════════════════════════════════════════════
 * API 接口层 — 按四大模块组织 [ALL 共用]
 * 对应后端 app/api/v1/endpoints/
 * ═══════════════════════════════════════════════════════
 */

import { get, post, put, del } from '../utils/request.js';

export const api = {
  // ══ 模块一: 用户画像 (负责人: A) ══
  user: {
    register: (data) => post('/user/register', data),
    login: (data) => post('/user/login', data),
    getProfile: () => get('/user/profile'),
    getHistory: (limit = 50) => get(`/user/history?limit=${limit}`),
    addHistory: (data) => post('/user/history', data),
    addBookmark: (data) => post('/user/bookmark', data),
    removeBookmark: (bookId) => del(`/user/bookmark/${bookId}`),
    getBookmarks: () => get('/user/bookmarks'),
    rateBook: (data) => post('/user/rating', data),
    updateProgress: (data) => post('/user/progress', data),
    getProgress: () => get('/user/progress'),
    getStats: () => get('/user/stats'),
  },

  // ══ 模块二: 知识图谱 (负责人: B) ══
  graph: {
    queryPaths: (data) => post('/graph/paths', data),
    getVisualization: (bookId, depth = 2) => get(`/graph/visualize/${bookId}?depth=${depth}`),
    getStats: () => get('/graph/stats'),
    initConstraints: () => post('/graph/init'),
  },

  // ══ 模块三: 个性化推荐 (负责人: C) ══
  recommend: {
    home: (params = {}) => {
      const qs = Object.entries(params)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join('&');
      return get(`/recommend/home?${qs}`);
    },
    similar: (bookId, topN = 10) => get(`/recommend/similar/${bookId}?top_n=${topN}`),
    hot: (topN = 20) => get(`/recommend/hot?top_n=${topN}`),
    updateWeights: (data) => put('/recommend/weights', data),
  },

  // ══ 模块四: 阅读生态 (负责人: D) ══
  ecosystem: {
    getTrial: (bookId) => get(`/ecosystem/trial/${bookId}`),
    getTrialContent: (bookId) => get(`/ecosystem/trial/${bookId}/content`),
    getComments: (bookId, page = 1) => get(`/ecosystem/comments/${bookId}?page=${page}`),
    createComment: (data) => post('/ecosystem/comments', data),
    likeComment: (data) => post('/ecosystem/comments/like', data),
    pinComment: (commentId, isPinned = true) =>
      put(`/ecosystem/comments/${commentId}/pin?is_pinned=${isPinned}`),
    deleteComment: (commentId) => del(`/ecosystem/comments/${commentId}`),
    getPurchaseLinks: (bookId) => get(`/ecosystem/purchase/${bookId}`),
    getShelves: () => get('/ecosystem/shelves'),
    getShelfBooks: (shelfName) =>
      get(`/ecosystem/shelves/${encodeURIComponent(shelfName)}`),
    moveBook: (bookId, newShelf) =>
      put(`/ecosystem/shelves/move?book_id=${bookId}&new_shelf=${encodeURIComponent(newShelf)}`),
    getReadingStats: () => get('/ecosystem/stats'),
  },
};
