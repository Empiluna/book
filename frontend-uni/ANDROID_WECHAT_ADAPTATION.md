# Android 与微信小程序适配说明

## 1. 后端地址配置

多端接口地址集中在：

```text
frontend-uni/api/request.js
```

默认配置：

```js
const LOCAL_ORIGIN = 'http://127.0.0.1:8000'
const LAN_ORIGIN = 'http://10.242.11.113:8000'
```

- H5 运行：使用 `127.0.0.1`。
- Android 真机 / 微信小程序：使用 `LAN_ORIGIN`。
- 如果你的电脑 IPv4 不是 `10.242.11.113`，请用 `ipconfig` 查到真实 IPv4 后替换。

## 2. Android 真机运行

后端启动时要允许局域网访问：

```powershell
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

手机和电脑必须在同一个 Wi-Fi。手机浏览器先测试：

```text
http://你的电脑IPv4:8000/health
```

能打开后，再用 HBuilderX：

```text
运行 → 运行到手机或模拟器 → Android App基座
```

## 3. 微信小程序运行

微信开发者工具需要开启服务端口：

```text
设置 → 安全设置 → 服务端口
```

本地开发阶段可关闭合法域名校验，`manifest.json` 已设置：

```json
"urlCheck": false
```

真机预览或正式发布时，微信要求后端接口和 web-view 页面使用已备案的 HTTPS 域名，不能长期使用 `http://局域网IP:8000`。

## 4. 已适配内容

- `api/request.js`：按 H5 / Android / 微信小程序自动切换后端地址。
- 静态资源地址自动补全：封面、PDF、EPUB、reader_url 等 `/xxx` 地址会转换成完整地址。
- `pages/reader/reader.vue`：Android / 微信小程序 WebView 使用局域网后端地址打开阅读器。
- `frontend/reader.html`：支持从 URL 参数读取 token，移动端 WebView 保存阅读进度时可以带登录态。
- `manifest.json`：补充 Android 网络权限、微信小程序编译设置。
- `pages/profile/profile.vue`：去掉小程序不推荐的 `span` 标签。
- `pages/admin/admin.vue`：管理入口布局改成 flex，更适合微信小程序。

## 5. 常见问题

### Android 请求失败

检查：

1. 手机和电脑是否同一 Wi-Fi。
2. 后端是否用 `--host 0.0.0.0` 启动。
3. Windows 防火墙是否放行 Python / 8000 端口。
4. `LAN_ORIGIN` 是否是电脑真实 IPv4。

### 微信小程序请求失败

开发工具里先关闭合法域名校验。真机预览/发布需要 HTTPS 域名。

### 阅读器打不开

阅读器是 WebView 页面。微信小程序正式环境需要配置 web-view 业务域名；Android 真机需要能访问：

```text
http://你的电脑IPv4:8000/static/reader.html?book_id=1
```
