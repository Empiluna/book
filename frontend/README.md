# 前端项目说明

## 技术选型

纯原生 HTML/CSS/JS，无框架依赖。打开 `index.html` 即可运行。

## 目录结构

```
frontend/
├── index.html                  # SPA 入口
├── css/
│   └── style.css               # 全局样式 (CSS 变量 + 组件样式)
├── js/
│   ├── api.js                  # ⭐ 后端 API 调用封装 (所有接口已预定义)
│   ├── auth.js                 # 认证管理 (Token 存储/登录/登出)
│   ├── router.js               # Hash 路由 (页面切换)
│   ├── pages/
│   │   ├── home.js             # 首页 — 推荐流 + 热门
│   │   ├── login.js            # 登录/注册
│   │   ├── detail.js           # 图书详情 + 相似推荐 + 评论
│   │   ├── profile.js          # 个人中心 — 书架/进度/统计
│   │   └── admin.js            # 管理后台
│   └── components/
│       ├── navbar.js           # 导航栏 (响应登录状态)
│       ├── book-card.js        # 图书卡片/推荐列表项/网格
│       ├── comment.js          # 评论区 (列表/发布/点赞/置顶)
│       └── toast.js            # 消息提示
└── README.md
```

## 启动方式

### 方式1: 直接用浏览器打开

双击 `frontend/index.html` 即可（需先启动后端）。

### 方式2: 用 Python 静态服务器

```bash
cd frontend
python -m http.server 3000
# 访问 http://localhost:3000
```

### 方式3: 用 VS Code Live Server

右键 `index.html` → Open with Live Server

## 页面路由

| Hash | 页面 | 需要登录 | 对接模块 |
|------|------|---------|---------|
| `#/` | 首页推荐流 | 否（登录后有个性化） | 模块三 |
| `#/login` | 登录/注册 | 否 | 模块一 |
| `#/book/:id` | 图书详情 | 否 | 模块二/三/四 |
| `#/profile` | 个人中心 | 是 | 模块一/四 |
| `#/admin` | 管理后台 | 是（管理员） | 模块二/四 |

## 前端对接后端

所有 API 调用集中在 `js/api.js`，已按四大模块组织好。示例：

```javascript
// 模块一: 用户
await api.user.login({ username, password });
await api.user.getProfile();

// 模块二: 图谱
await api.graph.queryPaths({ book_id: 101 });

// 模块三: 推荐
await api.recommend.home({ strategy: 'hybrid', top_n: 20 });

// 模块四: 生态
await api.ecosystem.getComments(bookId);
```

## 当前状态

- ✅ 页面路由 + 导航栏
- ✅ 登录/注册
- ✅ 首页推荐流
- ✅ 图书详情 + 相似推荐 + 评论
- ✅ 个人中心 + 书架 + 阅读进度
- ✅ 管理后台（图谱统计、购书链接配置）
- ⚠️ 图书封面目前使用渐变色占位（后端返回封面 URL 后自动显示）
- ⚠️ 搜索功能待模块二 ElasticSearch 集成后对接

## 约定

1. **CSS 变量**在 `:root` 中统一定义，不要硬编码颜色
2. **API 封装**统一走 `api.js`，不要在页面中直接 fetch
3. **认证状态**通过 `Auth.isLoggedIn()` 判断，不要直接读 localStorage
4. **导航栏**通过 `renderNavbar()` 模板渲染，不要手写
