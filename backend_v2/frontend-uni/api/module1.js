// 模块一：用户画像 + 智能助手 API 封装
// 复制到 frontend-uni/api/module1.js

const BASE_URL = uni.getStorageSync('API_BASE_URL') || 'http://127.0.0.1:8000'

function getToken() {
  return uni.getStorageSync('token') || uni.getStorageSync('access_token') || ''
}

function request(path, options = {}) {
  const token = getToken()
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${path}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.header || {})
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(res.data)
        else reject({ statusCode: res.statusCode, data: res.data })
      },
      fail: reject
    })
  })
}

export const module1Api = {
  setBaseUrl(url) {
    uni.setStorageSync('API_BASE_URL', url)
  },
  register(data) {
    return request('/api/v1/user/register', { method: 'POST', data })
  },
  login(data) {
    return request('/api/v1/user/login', { method: 'POST', data })
  },
  me() {
    return request('/api/v1/user/me')
  },
  profile() {
    return request('/api/v1/user/profile')
  },
  stats() {
    return request('/api/v1/user/stats')
  },
  history(limit = 20) {
    return request(`/api/v1/user/history?limit=${limit}`)
  },
  bookmarks() {
    return request('/api/v1/user/bookmarks')
  },
  shelves() {
    return request('/api/v1/user/shelves')
  },
  progress(bookId) {
    const suffix = bookId ? `?book_id=${bookId}` : ''
    return request(`/api/v1/user/progress${suffix}`)
  },
  ratings() {
    return request('/api/v1/user/ratings')
  },
  chat(message, conversationId = 0) {
    return request('/api/v1/chat/send', {
      method: 'POST',
      data: { message, conversation_id: conversationId }
    })
  },
  chatHistory(conversationId = 0) {
    return request(`/api/v1/chat/history?conversation_id=${conversationId}`)
  }
}

export default module1Api
