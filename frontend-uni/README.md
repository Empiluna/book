# frontend-uni 多端正式工程

本目录已按详细设计文档实现 uni-app 多端前端结构，可编译为 H5、Android、iOS 与微信小程序。

## 已实现页面
- `pages/index` 首页推荐流、热门/新书、推荐理由卡片
- `pages/search` ElasticSearch/SQL搜索、分类与标签筛选
- `pages/detail` 图书详情、相似推荐、书架、评分、试读入口
- `pages/reader` PDF/EPUB在线试读 WebView 阅读器，接入 `/static/reader.html`
- `pages/shelf` 默认书架与自定义书架展示
- `pages/chat` 智能问答助手，调用 LLM/降级问答接口
- `pages/profile` 阅读统计、兴趣标签、个人资料
- `admin/*` 管理端页面：图书、用户、评论、图谱、设置

## 运行
```bash
npm install
npm run dev:h5
# 或使用 HBuilderX 运行到微信小程序 / Android / iOS
```

默认后端地址在 `api/request.js` 中配置为 `http://localhost:8000/api/v1`。
