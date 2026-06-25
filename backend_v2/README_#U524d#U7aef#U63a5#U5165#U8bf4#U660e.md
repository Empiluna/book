# 模块一前端豪华版补丁说明

本补丁用于“基于知识图谱的个性化荐书系统”的模块一：用户画像模块，以及智能问答助手前端入口。

## 一、包含内容

### 1. uni-app 正式接入文件

复制到项目已有 `frontend-uni/` 目录：

```text
frontend-uni/api/module1.js
frontend-uni/components/module1/LuxuryMetricCard.vue
frontend-uni/components/module1/PreferenceCloud.vue
frontend-uni/components/module1/ReadingRadar.vue
frontend-uni/components/module1/AIAssistantPanel.vue
frontend-uni/pages/module1/dashboard.vue
frontend-uni/pages/module1/chat.vue
frontend-uni/pages/module1/progress.vue
frontend-uni/pages/module1/pages-json-addition.md
```

需要手动把 `pages-json-addition.md` 里的页面配置追加到 `frontend-uni/pages.json` 的 pages 数组中。

### 2. 纯 H5 预览版本

复制到项目已有 `frontend/` 目录：

```text
frontend/module1-luxury/index.html
frontend/module1-luxury/style.css
frontend/module1-luxury/app.js
```

这个版本不依赖构建工具，可直接预览视觉效果，也可连接后端 API。

## 二、前端页面实现的功能

- 阅读画像驾驶舱：阅读时长、完成图书、评分记录、书架收藏等核心指标卡片。
- 兴趣标签星云：展示标签偏好权重。
- 阅读画像雷达：偏好、活跃、完成度、互动、探索五维展示。
- 偏好作者与高分图书池：对接用户画像数据。
- 阅读进度矩阵：集中展示每本书的页码和阅读百分比。
- 智能问答助手：支持功能问答、自然荐书、个人阅读问答、管理员帮助等交互。

## 三、运行前提

后端需要先启动：

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

H5 预览版运行：

```bash
cd frontend/module1-luxury
python -m http.server 5173
```

浏览器打开：

```text
http://127.0.0.1:5173
```

## 四、注意事项

1. 个人阅读问答、画像、书架、进度等接口需要登录 token。
2. token 默认从 localStorage / uni storage 中读取 `token` 或 `access_token`。
3. 后端地址默认是 `http://127.0.0.1:8000`，H5 预览版左侧可以修改后端地址。
4. 如果后端未启动，H5 预览版会显示模拟数据，不影响页面展示。
5. 这些文件是新增文件为主，不会主动覆盖你们已有页面；唯一需要手工修改的是 `frontend-uni/pages.json`。
