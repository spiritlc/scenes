
# 基于 x6 的场景编排工具


[![](https://img.shields.io/badge/git-sceneChoreography-brightgreen?logo=gitlab)](gitlab-url)
[![](https://img.shields.io/badge/node->=14.0.0-brightgreen?logo=Node.js)]()


- [基于 x6 的场景编排工具](#基于-x6-的场景编排工具)
  - [安装](#安装)
  - [使用说明](#使用说明)
    - [项目结构](#项目结构)
    - [贡献者](#贡献者)

## 安装

这个项目使用 [node](http://nodejs.org) 和 [npm](https://npmjs.com)。请确保你本地安装了它们。

```sh
$ npm install
```

## 使用说明

```sh
$ npm run serve
```

### 项目结构
```
D:\workspace\scenes
├─src
|  ├─App.vue
|  ├─declaration.d.ts
|  ├─main.ts
|  ├─shims-vue.d.ts
|  ├─views                  // 视图
|  ├─store                  // vuex
|  ├─router                 // vue-router
|  |   └index.ts
|  ├─modules                // 模型池
|  |    ├─port                  // 链接桩模型
|  |    ├─material              // 物料模型
|  |    ├─edge                  // 连线模型
|  |    ├─attribute             // 属性模型
|  ├─components             // 全局组件
|  ├─assets
|  |   ├─logo.png
|  |   ├─js                 // 公共方法
|  |   ├─images             // 图片资源
|  |   ├─css
|  |   ├─config             // 项目有关配置
|  ├─apis // 接口请求
├─public
|   ├─favicon.ico
|   └index.html
```


### 贡献者



[gitlab-image]: https://git.haier.net/assets/favicon-72a2cad5025aa931d6ea56c3201d1f18e68a8cd39788c7c80d5b2b82aa5143ef.png
[gitlab-url]: https://git.haier.net/iot/haigeek/front_project/sceneChoreography