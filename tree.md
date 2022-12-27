D:\workspace\scenes
├─.browserslistrc
├─.eslintrc.js
├─.gitignore
├─.prettierrc.js
├─package-lock.json
├─package.json
├─README.md
├─tree.md
├─tsconfig.json
├─vue.config.js
├─src
|  ├─App.vue
|  ├─declaration.d.ts
|  ├─main.ts
|  ├─shims-vue.d.ts
|  ├─views  // 视图
|  |   ├─test
|  |   ├─MainPage
|  |   |    ├─index.vue
|  |   |    ├─material
|  |   |    |    ├─index.vue
|  |   |    |    └MenuItem.vue
|  |   |    ├─attribute
|  |   |    |     └index.vue
|  ├─store  // vuex
|  |   └index.ts
|  ├─router // vue-router
|  |   └index.ts
|  ├─modules  // 模型池
|  |    ├─port
|  |    |  ├─constants.ts
|  |    |  ├─index.ts
|  |    |  ├─mainPage
|  |    |  ├─common
|  |    |  |   ├─actionPort.ts
|  |    |  |   ├─attrs.ts
|  |    |  |   ├─conditionPort.ts
|  |    |  |   ├─index.ts
|  |    |  |   └relationPort.ts
|  |    ├─material
|  |    |    ├─constants.ts
|  |    |    ├─index.ts
|  |    |    ├─common
|  |    |    |   ├─BasicActionNode.vue
|  |    |    |   ├─BasicConditionNode.vue
|  |    |    |   ├─BasicNode.vue
|  |    |    |   ├─BasicRelationNode.vue
|  |    |    |   └register.ts
|  |    ├─edge
|  |    |  ├─constants.ts
|  |    |  ├─index.ts
|  |    |  ├─common
|  |    |  |   ├─basicEdge.ts
|  |    |  |   └register.ts
|  |    ├─attribute
|  |    |     ├─attrData.ts
|  |    |     ├─constants.ts
|  |    |     ├─index.ts
|  |    |     ├─mainPage
|  |    |     |    ├─attrDelayAction.vue
|  |    |     |    ├─attrEquipment.vue
|  |    |     |    ├─attrEquipmentAction.vue
|  |    |     |    ├─attrFence.vue
|  |    |     |    ├─attrMessageAction.vue
|  |    |     |    ├─attrTime.vue
|  |    |     |    ├─attrWeather.vue
|  |    |     |    └register.ts
|  ├─components // 全局组件
|  |     ├─class-fold.vue
|  |     ├─config.ts
|  |     ├─menuBar.vue
|  |     ├─nodeTheme
|  |     |     ├─condition.vue
|  |     |     ├─database.vue
|  |     |     ├─onlyIn.vue
|  |     |     └onlyOut.vue
|  |     ├─graphTools
|  |     |     ├─index.ts
|  |     |     ├─index.vue
|  |     |     ├─toolDisabled.vue
|  |     |     ├─toolFullScreen.vue
|  |     |     ├─toolSave.vue
|  |     |     └toolZoom.vue
|  |     ├─dialog
|  |     |   ├─condition.vue
|  |     |   └mysql.vue
|  ├─assets
|  |   ├─logo.png
|  |   ├─js // 公共方法
|  |   | ├─getInitHMS.ts
|  |   | ├─graph.ts
|  |   | ├─keyEvent.ts
|  |   | ├─material.ts
|  |   | └port.ts
|  |   ├─images
|  |   |   └tips.png
|  |   ├─css
|  |   |  └var.scss
|  |   ├─config // 项目有关配置
|  |   |   ├─constants.ts
|  |   |   ├─types
|  |   |   |   ├─graphTools.ts
|  |   |   |   ├─menu.ts
|  |   |   |   └ports.ts
|  |   |   ├─port
|  |   |   ├─connecting
|  |   |   |     ├─index.ts
|  |   |   |     ├─types.ts
|  |   |   |     └validateConnection.ts
|  ├─apis // 接口请求
|  |  ├─api.ts
|  |  ├─scene.ts
|  |  └types.ts
├─public
|   ├─favicon.ico
|   └index.html