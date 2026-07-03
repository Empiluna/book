const LOCAL_ORIGIN = 'http://127.0.0.1:8000'
// 安卓真机、微信小程序开发工具连接电脑后端时，用电脑 ipconfig 里的 IPv4。
// 你当前电脑可先用这个：10.244.4.250
const LAN_ORIGIN = 'http://10.244.4.250:8000'
const PROD_ORIGIN = 'https://你的线上域名'

let ORIGIN = LOCAL_ORIGIN
// #ifdef APP-PLUS
ORIGIN = LAN_ORIGIN
// #endif
// #ifdef MP-WEIXIN
ORIGIN = LAN_ORIGIN
// #endif
// #ifdef H5
ORIGIN = LOCAL_ORIGIN
// #endif

const SERVER_ORIGIN = ORIGIN
const API_BASE = ORIGIN + '/api/v1'

function getToken() {
  return uni.getStorageSync('token') || ''
}

function getUser() {
  const raw = uni.getStorageSync('user')
  if (!raw) return null
  if (typeof raw === 'object') return raw
  try { return JSON.parse(raw) } catch (e) { return null }
}

function saveLogin(data) {
  if (data && data.access_token) uni.setStorageSync('token', data.access_token)
  if (data && data.user) uni.setStorageSync('user', data.user)
}

function logout() {
  uni.removeStorageSync('token')
  uni.removeStorageSync('user')
}

function toAbsoluteUrl(url) {
  if (!url) return ''
  if (url.indexOf('data:') === 0) return url
  if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) return url
  if (url.charAt(0) === '/') return ORIGIN + url
  return ORIGIN + '/' + url
}

function normalizeBook(book) {
  book = book || {}
  const authors = Array.isArray(book.authors) ? book.authors : []
  return Object.assign({}, book, {
    id: book.id || book.book_id,
    book_id: book.book_id || book.id,
    author: book.author || authors.join('、') || '未知作者',
    cover_url: toAbsoluteUrl(book.cover_url || book.cover || book.image_url || ''),
    tags: Array.isArray(book.tags) ? book.tags : [],
    avg_rating: book.avg_rating || 0,
    category: book.category || '图书'
  })
}

function normalizeBooks(list) {
  if (!Array.isArray(list)) return []
  return list.map(function (x) { return normalizeBook(x.book || x) })
}

function request(path, options) {
  options = options || {}
  const method = options.method || 'GET'
  const data = options.data || options.body || undefined
  const token = getToken()
  const header = options.header || {}
  header['Content-Type'] = 'application/json'
  if (token) header.Authorization = 'Bearer ' + token

  return new Promise(function (resolve, reject) {
    uni.request({
      url: API_BASE + path,
      method: method,
      data: data,
      header: header,
      success: function (res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data || {})
        } else {
          const msg = (res.data && (res.data.detail || res.data.message)) || ('请求失败：' + res.statusCode)
          reject(new Error(msg))
        }
      },
      fail: function (err) {
        reject(new Error(err.errMsg || '网络请求失败，请检查后端地址和防火墙'))
      }
    })
  })
}

function requireLogin() {
  if (!getToken()) {
    uni.showModal({
      title: '需要登录',
      content: '请先登录后使用该功能。',
      confirmText: '去登录',
      success: function (res) {
        if (res.confirm) uni.navigateTo({ url: '/pages/login/login' })
      }
    })
    return false
  }
  return true
}

function isAdmin() {
  const user = getUser()
  return !!(user && user.is_admin)
}

function formatDate(value) {
  if (!value) return ''
  return String(value).replace('T', ' ').replace('Z', '').slice(0, 16)
}

function showError(e, fallback) {
  uni.showToast({ title: (e && e.message) || fallback || '操作失败', icon: 'none' })
}

export {
  ORIGIN,
  SERVER_ORIGIN,
  API_BASE,
  request,
  toAbsoluteUrl,
  normalizeBook,
  normalizeBooks,
  getToken,
  getUser,
  saveLogin,
  logout,
  requireLogin,
  isAdmin,
  formatDate,
  showError
}
