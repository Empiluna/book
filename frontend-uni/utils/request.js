/**
 * ═══════════════════════════════════════════════════════
 * uni.request 封装 — [ALL 共用]
 * 自动附加 JWT Token、统一错误处理
 * ═══════════════════════════════════════════════════════
 */

const API_BASE = 'http://localhost:8000/api/v1';

// 如需部署到真机，改为局域网地址:
// const API_BASE = 'http://192.168.1.xxx:8000/api/v1';

export function request(method, path, data = null) {
  const token = uni.getStorageSync('access_token');
  const header = { 'Content-Type': 'application/json' };
  if (token) {
    header['Authorization'] = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: API_BASE + path,
      method,
      header,
      data: data || undefined,
      timeout: 15000,
      success(res) {
        if (res.statusCode === 401) {
          uni.removeStorageSync('access_token');
          uni.removeStorageSync('user_info');
          uni.reLaunch({ url: '/pages/login/login' });
          reject(new Error('登录已过期，请重新登录'));
          return;
        }
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          const msg = (res.data && res.data.detail) || `请求失败 (${res.statusCode})`;
          reject(new Error(msg));
        }
      },
      fail(err) {
        reject(new Error(`网络错误: ${err.errMsg || '请检查网络连接'}`));
      },
    });
  });
}

export const get = (path) => request('GET', path);
export const post = (path, data) => request('POST', path, data);
export const put = (path, data) => request('PUT', path, data);
export const del = (path) => request('DELETE', path);
