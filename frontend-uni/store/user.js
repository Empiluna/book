import { request } from '../api/request.js'

export async function login(account, password) {
  const res = await request('/user/login', {
    method: 'POST',
    data: {
      account,
      username_or_email: account,
      password,
      role: 'user'
    }
  })
  uni.setStorageSync('token', res.access_token)
  uni.setStorageSync('user', res.user)
  return res
}

export function logout() {
  uni.removeStorageSync('token')
  uni.removeStorageSync('user')
}

export function getUser() {
  return uni.getStorageSync('user') || null
}
