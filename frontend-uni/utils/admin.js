export function isAdminUser(user = uni.getStorageSync('user')) {
  return Boolean(user && user.is_admin)
}

export function requireAdminPage() {
  if (isAdminUser()) return true
  uni.showToast({ title: '请使用管理员账号登录', icon: 'none' })
  setTimeout(() => {
    const token = uni.getStorageSync('token')
    uni.reLaunch({ url: token ? '/pages/profile/profile' : '/pages/login/login' })
  }, 500)
  return false
}
