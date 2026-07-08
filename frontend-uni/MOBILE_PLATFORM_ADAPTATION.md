# Android / iOS / 微信小程序端适配说明

## 这次补丁做了什么

本补丁主要改动 `frontend-uni`，用于 HBuilderX 运行到 Android、iOS、微信小程序和 H5。

已完成：

1. `api/request.js` 统一管理 H5 / Android / iOS / 微信小程序接口地址。
2. Android、iOS、微信小程序默认访问电脑局域网后端地址。
3. H5 默认访问 `127.0.0.1`。
4. 首页重新排版，增加搜索、图谱、书架、AI 荐书、AI 小说工坊、连接诊断入口。
5. 新增 `pages/platform/platform.vue` 连接诊断页。
6. 新增 `pages/original/original.vue` 移动端 AI 小说工坊。
7. 个人中心改为移动端兴趣气泡画像。
8. 书架页、详情页、图书卡片样式优化。
9. 阅读器 WebView 适配 Android / iOS / 微信小程序。
10. 后端试读接口调整为有 EPUB 时优先使用 EPUB，避免错误优先打开无效 PDF。

## 后端启动

项目根目录：

```powershell
cd "E:\翻译漫画\book-main (14)\book-main"
.\.venv\Scripts\activate
$env:DATABASE_URL="mysql+pymysql://root:你的MySQL密码@localhost:3306/book_system?charset=utf8mb4"
$env:SEED_ON_STARTUP="false"
$env:CORS_ORIGINS="*"
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

必须使用：

```powershell
--host 0.0.0.0
```

否则手机和小程序无法访问电脑后端。

## 修改手机端后端地址

统一改：

```text
frontend-uni/api/request.js
```

找到：

```js
const LAN_ORIGIN = 'http://10.242.11.113:8000'
```

如果你的电脑 IP 变了，用 `ipconfig` 找有“默认网关”的 IPv4，然后替换。

手机浏览器先访问：

```text
http://你的电脑IPv4:8000/health
```

能打开后，再运行 App 或小程序。

## HBuilderX 运行

打开目录：

```text
E:\翻译漫画\book-main (14)\book-main\frontend-uni
```

运行：

```text
运行 → 运行到手机或模拟器 → Android App基座
运行 → 运行到手机或模拟器 → iOS App基座
运行 → 运行到小程序模拟器 → 微信开发者工具
```

微信开发者工具本地调试时勾选：

```text
不校验合法域名、web-view、TLS版本以及HTTPS证书
```

正式发布微信小程序时必须使用 HTTPS 域名，并在微信公众平台配置 request 合法域名和 web-view 业务域名。
