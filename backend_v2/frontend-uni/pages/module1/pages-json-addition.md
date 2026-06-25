# pages.json 增量配置

不要直接覆盖现有 `frontend-uni/pages.json`。请把下面 3 个页面对象追加到 pages 数组中：

```json
{
  "path": "pages/module1/dashboard",
  "style": {
    "navigationBarTitleText": "阅读画像驾驶舱",
    "navigationStyle": "custom"
  }
},
{
  "path": "pages/module1/chat",
  "style": {
    "navigationBarTitleText": "智能问答助手",
    "navigationStyle": "custom"
  }
},
{
  "path": "pages/module1/progress",
  "style": {
    "navigationBarTitleText": "阅读进度矩阵",
    "navigationStyle": "custom"
  }
}
```

建议在原有首页或“我的”页面增加入口：

```js
uni.navigateTo({ url: '/pages/module1/dashboard' })
```
