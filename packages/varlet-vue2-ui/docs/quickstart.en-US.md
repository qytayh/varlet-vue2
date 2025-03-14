# Quickstart

### Intro

Here are the most basic ways to access component libraries in common development patterns.

### Install

#### CDN
`varlet.js` contain all the styles and logic of the component library, and you can import them.

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
  }).$mount('#app');
</script>
```

#### Webpack/Vite

```shell
# Install with npm, yarn or pnpm

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

### Components Playground

We provide a web version of the component editor,
which is convenient for you to quickly get started with each component of the component library,
edit it online, share it with others, or download the code package to run locally.
You can click the `{...}` icon in the upper right corner of the page or [go here](https://varlet.gitee.io/varlet-ui-playground)