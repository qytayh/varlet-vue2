# 快速开始

### 介绍

这里为您介绍常见开发模式下接入组件库的最基本方式。

### 安装

#### CDN
`varlet.js` 包含组件库的所有样式和逻辑, 引入即可。

```html
<div id="app"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
<script src="https://cdn.jsdelivr.net/npm/@varlet-vue2/ui/umd/varlet.js"></script>
<script>
  const App = Vue.use({
    template: '<var-button>按钮</var-button>'
  })
  new Vue({
     render: h => h(App)
  }).$mount('#app')
</script>
```

#### Webpack/Vite

```shell
# 通过 npm、yarn 或 pnpm 安装

# npm
npm i @varlet-vue2/ui -S

# yarn
yarn add @varlet-vue2/ui

# pnpm
pnpm add @varlet-vue2/ui
```

```js
import App from './App.vue'
import Varlet from '@varlet-vue2/ui'
import Vue from 'vue'
import '@varlet-vue2/ui/es/style.js'

Vue.use(Varlet)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### 在线编辑组件

我们提供了网页版的组件编辑器，方便您对组件库的各个组件进行快速上手、在线编辑、分享给他人或是下载代码包本地运行。
您可以点击网页右上角的`{...}`图标或是[这里前往](https://varlet.gitee.io/varlet-ui-playground)