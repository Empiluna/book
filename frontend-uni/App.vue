<script>
import { getPlatformLabel, ORIGIN } from './api/request.js'

export default {
  onLaunch: function () {
    console.log('[frontend-uni] app launch:', getPlatformLabel(), ORIGIN)
  },
  onShow: function () {
    console.log('[frontend-uni] app show')
  }
}
</script>

<style>
page {
  min-height: 100%;
  background: #f6f7fb;
  color: #17202a;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}
view, text, button, input, textarea, image, scroll-view, web-view {
  box-sizing: border-box;
}
button::after { border: none; }
.container {
  min-height: 100vh;
  padding: 24rpx;
  padding-bottom: calc(28rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 12% 0%, #dbeafe 0, transparent 34%),
    radial-gradient(circle at 86% 12%, #ede9fe 0, transparent 32%),
    #f8fafc;
}
.card {
  background: rgba(255,255,255,.94);
  border-radius: 28rpx;
  padding: 26rpx;
  margin-bottom: 22rpx;
  box-shadow: 0 14rpx 36rpx rgba(15, 23, 42, .08);
  border: 1rpx solid rgba(226,232,240,.72);
}
.row { display:flex; align-items:center; }
.between { display:flex; align-items:center; justify-content:space-between; }
.title {
  display: block;
  color: #111827;
  font-size: 36rpx;
  font-weight: 900;
  margin-bottom: 16rpx;
}
.sub-title {
  display:block;
  color:#111827;
  font-size:30rpx;
  font-weight:900;
  margin-bottom:12rpx;
}
.muted {
  display: block;
  color: #667085;
  font-size: 24rpx;
  line-height: 1.6;
}
.btn {
  background: linear-gradient(135deg, #7c3aed, #0ea5e9);
  color: #fff;
  border: 0;
  border-radius: 22rpx;
  font-size: 28rpx;
  font-weight: 800;
  padding: 0 28rpx;
  line-height: 78rpx;
}
.btn.secondary { background:#e2e8f0; color:#334155; }
.btn.danger { background:#fee2e2; color:#b42318; }
.btn.small { font-size:24rpx; line-height:62rpx; padding:0 20rpx; }
.input {
  width: 100%;
  height: 82rpx;
  padding: 0 24rpx;
  border: 1rpx solid #d0d5dd;
  border-radius: 20rpx;
  background: #fff;
  font-size: 28rpx;
  color: #17202a;
}
.textarea {
  width:100%; min-height:150rpx; padding:22rpx 24rpx;
  border:1rpx solid #d0d5dd; border-radius:20rpx;
  background:#fff; font-size:28rpx; color:#17202a; line-height:1.5;
}
.chips { display:flex; gap:12rpx; flex-wrap:wrap; }
.chip {
  display:inline-block; padding:10rpx 18rpx;
  border-radius:999rpx; background:#f2f4f7;
  color:#475467; font-size:23rpx; font-weight:800;
  margin:0 8rpx 10rpx 0;
}
.chip.active { background:#ede9fe; color:#5b21b6; }
.stat-grid { display:flex; gap:16rpx; flex-wrap:wrap; }
.stat-item { flex:1; min-width:145rpx; text-align:center; background:#fff; border-radius:22rpx; padding:20rpx 10rpx; border:1rpx solid #eef2f7; }
.stat-num { display:block; color:#7c3aed; font-size:38rpx; font-weight:900; }
.empty { text-align:center; color:#667085; padding:36rpx 20rpx; }
.safe-bottom { padding-bottom: env(safe-area-inset-bottom); }
</style>
