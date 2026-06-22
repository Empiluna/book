<script>
/**
 * App.vue — uni-app 根组件
 * 全局生命周期: onLaunch / onShow / onHide
 */
export default {
  onLaunch() {
    console.log('📖 知书 App 启动');
    // 检查登录状态
    const token = uni.getStorageSync('access_token');
    if (token) {
      console.log('用户已登录');
    }
  },
  onShow() {
    console.log('App 显示');
  },
  onHide() {
    console.log('App 隐藏');
  },
};
</script>

<style lang="scss">
/* 全局样式已在 uni.scss 中定义 */
</style>
