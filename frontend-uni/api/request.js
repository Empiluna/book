const LOCAL_ORIGIN = 'http://127.0.0.1:8000'

// Android 真机、iPhone 真机、微信开发者工具连接电脑后端时，用电脑 ipconfig 里“有默认网关”的 IPv4。
// 你之前可用的 WLAN 地址是 10.242.11.113；如果换了网络，只改这里即可。
const LAN_ORIGIN = 'http://192.168.139.11:8000'

// 后续部署到服务器后，把 USE_PROD 改为 true，并把 PROD_ORIGIN 改成 HTTPS 域名。
// 微信小程序正式预览/发布、iOS 正式打包都建议使用 HTTPS。
const PROD_ORIGIN = 'https://你的线上域名'
const USE_PROD = false

function systemInfo() {
  try { return uni.getSystemInfoSync() || {} } catch (e) { return {} }
}

function getPlatformName() {
  let name = 'h5'
  // #ifdef APP-PLUS
  const sys = systemInfo()
  name = (sys.platform === 'ios') ? 'ios' : 'android'
  // #endif
  // #ifdef MP-WEIXIN
  name = 'mp-weixin'
  // #endif
  // #ifdef H5
  name = 'h5'
  // #endif
  return name
}

function getPlatformLabel() {
  const map = {
    h5: '浏览器 H5',
    android: 'Android App',
    ios: 'iOS App',
    'mp-weixin': '微信小程序'
  }
  return map[getPlatformName()] || getPlatformName()
}

function resolveOrigin() {
  if (USE_PROD) return PROD_ORIGIN.replace(/\/$/, '')
  return getPlatformName() === 'h5' ? LOCAL_ORIGIN : LAN_ORIGIN
}

const ORIGIN = resolveOrigin()
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
    cover_url: toAbsoluteUrl(book.cover_thumb_url || book.cover_url || book.cover || book.image_url || ''),
    tags: Array.isArray(book.tags) ? book.tags : [],
    avg_rating: book.avg_rating || 0,
    category: book.category || '图书'
  })
}

function normalizeBooks(list) {
  if (!Array.isArray(list)) return []
  return list.map(function (x) { return normalizeBook(x.book || x) })
}

function makeRequestUrl(path) {
  if (!path) return API_BASE
  if (path.indexOf('http://') === 0 || path.indexOf('https://') === 0) return path
  if (path.indexOf('/api/v1') === 0) return ORIGIN + path
  if (path.charAt(0) !== '/') path = '/' + path
  return API_BASE + path
}

function request(path, options) {
  options = options || {}
  const method = options.method || 'GET'
  const data = options.data || options.body || undefined
  const token = getToken()
  const header = Object.assign({}, options.header || {})
  header['Content-Type'] = header['Content-Type'] || 'application/json'
  header['X-Client-Platform'] = getPlatformName()
  if (token) header.Authorization = 'Bearer ' + token

  return new Promise(function (resolve, reject) {
    uni.request({
      url: makeRequestUrl(path),
      method: method,
      data: data,
      header: header,
      timeout: options.timeout || 18000,
      success: function (res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data || {})
        } else {
          const msg = (res.data && (res.data.detail || res.data.message)) || ('请求失败：' + res.statusCode)
          reject(new Error(msg))
        }
      },
      fail: function (err) {
        reject(new Error((err && err.errMsg) || '网络请求失败，请检查后端地址和防火墙'))
      }
    })
  })
}

function healthCheck() {
  return new Promise(function (resolve, reject) {
    uni.request({
      url: ORIGIN + '/health',
      method: 'GET',
      timeout: 8000,
      success: function (res) {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(res.data || { ok: true })
        else reject(new Error('健康检查失败：' + res.statusCode))
      },
      fail: function (err) {
        reject(new Error((err && err.errMsg) || '无法连接后端'))
      }
    })
  })
}

function uploadFile(path, filePath, formData) {
  const token = getToken()
  const header = { 'X-Client-Platform': getPlatformName() }
  if (token) header.Authorization = 'Bearer ' + token
  return new Promise(function (resolve, reject) {
    uni.uploadFile({
      url: makeRequestUrl(path),
      filePath: filePath,
      name: 'file',
      formData: formData || {},
      header: header,
      success: function (res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(res.data || '{}')) } catch (e) { resolve(res.data || {}) }
        } else {
          reject(new Error('上传失败：' + res.statusCode))
        }
      },
      fail: function (err) {
        reject(new Error((err && err.errMsg) || '上传失败'))
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
  LOCAL_ORIGIN,
  LAN_ORIGIN,
  PROD_ORIGIN,
  USE_PROD,
  ORIGIN,
  SERVER_ORIGIN,
  API_BASE,
  getPlatformName,
  getPlatformLabel,
  systemInfo,
  request,
  healthCheck,
  uploadFile,
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
