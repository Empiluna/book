# 知书 uni-app 客户端

一套代码，编译出 **Android APK** / **iOS IPA** / **微信小程序** / **H5网页**。

## 前端分工

| 成员 | 模块 | 负责文件 |
|------|------|---------|
| **A** | 模块一：用户画像 | `utils/auth.js` `pages/login/login.vue` `pages/profile/profile.vue` |
| **B** | 模块二：知识图谱 | `pages/admin/admin.vue`(图谱tab) `pages/detail/detail.vue`(图谱数据) |
| **C** | 模块三：个性化推荐 | `pages/index/index.vue` `pages/detail/detail.vue`(相似推荐) |
| **D** | 模块四：阅读生态 | `components/comment-list.vue` `pages/detail/detail.vue`(试读/购书/评论) `pages/shelf/shelf.vue` `pages/admin/admin.vue`(购书tab) |
| **ALL** | 共用 | `api/index.js` `store/index.js` `utils/request.js` `components/book-card.vue` `manifest.json` `pages.json` `uni.scss` |

## 项目结构

```
frontend-uni/
├── manifest.json              # App 配置 (包名/权限/启动图)
├── pages.json                 # 页面路由 + 底部 Tab 栏
├── uni.scss                   # 全局样式变量
├── App.vue                    # 根组件 (生命周期)
├── main.js                    # Vue 入口
├── package.json               # 依赖配置
├── api/
│   └── index.js               # 四大模块 API 封装 [ALL]
├── utils/
│   ├── request.js             # uni.request 统一封装 [ALL]
│   └── auth.js                # 认证管理 [A]
├── store/
│   └── index.js               # 全局状态管理 [ALL]
├── components/
│   ├── book-card.vue          # 图书卡片 [ALL]
│   └── comment-list.vue       # 评论区 [D]
├── pages/
│   ├── index/index.vue        # 发现首页 [C]
│   ├── shelf/shelf.vue        # 我的书架 [D]
│   ├── profile/profile.vue    # 个人中心 [A]
│   ├── login/login.vue        # 登录/注册 [A]
│   ├── detail/detail.vue      # 图书详情 [B+C+D]
│   └── admin/admin.vue        # 管理后台 [B+D]
└── static/                    # 图标/图片资源
```

## 页面路由 + Tab 栏

```
┌──────────────────────────────────────┐
│              Tab Bar                  │
│  🏠 发现    📚 书架    👤 我的      │
│  (index)   (shelf)  (profile)       │
└──────────────────────────────────────┘
         │          │          │
    首页推荐   书架管理   个人中心
    个性化流   阅读进度   账号管理
    热门榜单   藏书展示   管理入口
```

子页面（无 Tab）:
- `detail?id=xxx` — 图书详情
- `login` — 登录/注册
- `admin` — 管理后台

## 启动方式

### 1. 使用 HBuilderX（推荐）

1. 下载 [HBuilderX](https://www.dcloud.io/hbuilderx.html)
2. `文件 → 导入 → 从本地目录导入` → 选择 `frontend-uni`
3. 点击 `运行 → 运行到浏览器` 即可 H5 预览
4. `运行 → 运行到手机或模拟器` 可在真机上调试

### 2. 使用 CLI

```bash
cd frontend-uni
npm install

# H5 开发模式
npm run dev:h5

# 微信小程序
npm run dev:mp-weixin

# 打包 App (需 HBuilderX 云打包或本地打包)
npm run build:app
```

## 对接后端

API 基础地址在 `utils/request.js` 中配置：

```javascript
// 本地开发
const API_BASE = 'http://localhost:8000/api/v1';

// 真机调试 (改为你电脑的局域网 IP)
// const API_BASE = 'http://192.168.1.xxx:8000/api/v1';
```

## 当前状态

- ✅ 底部 3 Tab 导航
- ✅ 首页推荐流 + 热门图书
- ✅ 书架管理 (Tab切换/统计)
- ✅ 登录/注册
- ✅ 图书详情 + 相似推荐 + 评论
- ✅ 管理后台 (图谱统计/购书链接)
- ⚠️ 封面使用渐变色占位，后端返回 cover_url 后自动显示
- ⚠️ Tab 图标需替换为实际 png (当前 `static/` 下)
- ⚠️ 搜索功能待对接 ElasticSearch

## 编译产物

| 平台 | 命令 | 输出 |
|------|------|------|
| Android | HBuilderX 云打包 | `.apk` |
| iOS | HBuilderX 云打包 (需开发者账号) | `.ipa` |
| 微信小程序 | `npm run build:mp-weixin` | `dist/build/mp-weixin` |
| H5 网页 | `npm run build:h5` | `dist/build/h5` |
