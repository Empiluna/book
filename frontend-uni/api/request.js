const BASE_URL = 'http://localhost:8000/api/v1'
export async function request(path, options = {}) {
  const token = uni.getStorageSync('token')
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + path,
      method: options.method || 'GET',
      data: options.data || {},
      header: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      success: (res) => res.statusCode >= 200 && res.statusCode < 300 ? resolve(res.data) : reject(res.data),
      fail: reject
    })
  })
}
