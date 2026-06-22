# 前端项目说明

## 技术选型

纯原生 HTML/CSS/JS，无框架依赖。打开 `index.html` 即可运行。

## 前端分工

| 成员 | 模块 | 负责文件 |
|------|------|---------|
| **A** | 模块一：用户画像 | `js/auth.js` `js/pages/login.js` `js/pages/profile.js`(阅读统计部分) |
| **B** | 模块二：知识图谱 | `js/pages/admin.js`(图谱管理) `js/pages/detail.js`(图谱可视化部分) |
| **C** | 模块三：个性化推荐 | `js/pages/home.js` `js/pages/detail.js`(相似推荐部分) |
| **D** | 模块四：阅读生态 | `js/components/comment.js` `js/pages/detail.js`(试读/购书/评论) `js/pages/profile.js`(书架部分) `js/pages/admin.js`(购书链接) |
| **ALL** | 共用 | `css/style.css` `js/api.js` `js/router.js` `js/components/navbar.js` `js/components/book-card.js` `js/components/toast.js` |

## 页面归属

| 页面 | 路由 | 负责人 | 说明 |
|------|------|--------|------|
| 首页 | `#/` | **C** | 推荐流 + 热门榜单 |
| 登录注册 | `#/login` | **A** | 用户认证 |
| 图书详情 | `#/book/:id` | **B+C+D** | 图谱/相似推荐/试读/评论/购书 |
| 个人中心 | `#/profile` | **A+D** | 阅读统计(A) + 书架进度(D) |
| 管理后台 | `#/admin` | **B+D** | 图谱管理(B) + 购书链接(D) |

## 目录结构

```
frontend/
├── index.html                  # SPA 入口 (含分工注释)
├── css/
│   └── style.css               # 全局样式 [ALL]
├── js/
│   ├── api.js                  # 后端 API 调用封装 [ALL]
│   ├── auth.js                 # 认证管理 [A]
│   ├── router.js               # Hash 路由 [ALL]
│   ├── pages/
│   │   ├── home.js             # 首页推荐流 [C]
│   │   ├── login.js            # 登录/注册 [A]
│   │   ├── detail.js           # 图书详情 [B+C+D]
│   │   ├── profile.js          # 个人中心 [A+D]
│   │   └── admin.js            # 管理后台 [B+D]
│   └── components/
│       ├── navbar.js           # 导航栏 [ALL]
│       ├── book-card.js        # 图书卡片/推荐项 [ALL]
│       ├── comment.js          # 评论区 [D]
│       └── toast.js            # 消息提示 [ALL]
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

## 前端对接后端

所有 API 调用集中在 `js/api.js`，已按四大模块组织好。示例：

```javascript
// 模块一: 用户 (A 的后端接口)
await api.user.login({ username, password });
await api.user.getProfile();

// 模块二: 图谱 (B 的后端接口)
await api.graph.queryPaths({ book_id: 101 });

// 模块三: 推荐 (C 的后端接口)
await api.recommend.home({ strategy: 'hybrid', top_n: 20 });

// 模块四: 生态 (D 的后端接口)
await api.ecosystem.getComments(bookId);
await api.ecosystem.getShelves();
```

## 当前状态

- ✅ 页面路由 + 导航栏
- ✅ 登录/注册 (A)
- ✅ 首页推荐流 (C)
- ✅ 图书详情 + 相似推荐 + 评论 (B+C+D)
- ✅ 个人中心 + 书架 + 阅读进度 (A+D)
- ✅ 管理后台 — 图谱统计、购书链接配置 (B+D)
- ⚠️ 图书封面目前使用渐变色占位（后端返回封面 URL 后自动显示）
- ⚠️ 搜索功能待模块二 ElasticSearch 集成后对接

## 约定

1. **CSS 变量**在 `:root` 中统一定义，不要硬编码颜色
2. **API 调用**统一走 `api.js`，不要在页面中直接 fetch
3. **认证状态**通过 `Auth.isLoggedIn()` 判断，不要直接读 localStorage
4. **导航栏**通过 `renderNavbar()` 模板渲染，不要手写
5. **修改共用文件**（api.js、style.css、router.js 等）前在群内同步
