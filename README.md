# k-ui

想搭建一个基于Vite+Vue3+TS的组件库开发项目，主要想要的功能点是

1. 组件开发调试
2. md文档预览
3. 组件库发布npm
4. 打包部署文档站点

想要做到的就是能够一边开发组件一边预览调试。最后能打包库发布npm也能打包文档项目发布提供出去。

## 一、本地开发调试

本地开发调试还是比较简单的：

在空白目录执行下列命令：

```bash
yarn create vite
```

依次填写项目名称和选择框架为 vue-ts 后，将会自动完成项目的初始化，代码结构如下：

```bash
.
├── README.md
├── index.html
├── package.json
├── public
├── src
├── tsconfig.json
├── vite.config.ts
└── yarn.lock
```

在根目录下新建一个 /packages 目录，后续组件的开发都会在该目录进行。
并在根目录下新建一个 /docs 目录，后续组件文档的编写都会在该目录进行。

目录如下：

```bash
docs
├── Button
│   ├── index.md   // 文档说明md文件
│   └── demo.vue   // demo文件
packages
├── Button
│   ├── index.ts       // 模块导出文件
│   └── src
│       └── index.vue  // 组件本体
├── index.ts           // 组件库导出文件
└── list.json          // 组件列表
```

---

在packages/Button/src/index.vue中写组件代码

```html
<template>
  <button class="k-button" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineEmits(['click'])
</script>

<style lang="scss" scope>
  .k-button {

  }
</style>
```

---

在packages/Button/src/index.ts写install单个组件的代码

```js
import { App, Plugin } from 'vue'

import Button from './src/index.vue'

export const ButtonPlugin: Plugin = {
  install(app: App) {
    app.component('k-button', Button)
  }
}

export { Button }
```

---

packages/index.ts 整个库的入口文件。默认导出一个VuePlugin，并且注册了所有组件。同时也导出了不同组件。

```js
import { App, Plugin } from 'vue';

import { ButtonPlugin } from './Button';

const KUIPlugin: Plugin = {
  install(app: App) {
    ButtonPlugin.install?.(app);
  },
};

export default KUIPlugin;

export * from './Button';

```

---

packages/list.json 记录所有组件信息，用于自动生成router和packages/index.ts的install方法

```json
[
  {
    "compName": "Button",
    "compZhName": "按钮",
    "compDesc": "这是一个按钮",
    "compClassName": "button"
  }
]
```

---

完成上述目录之后，在src/main.ts引入组件，就可以使用了。

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import KUI from '../packages'

const app = createApp(App)
app.use(router).use(KUI).mount('#app')
```

在src/App.vue中加入

```html
<k-button>测试组件</k-button>
```

本地开发预览就简单完成了，后续还需要进行完善。

## 二、交互式文档

>交互式文档的思考：开发组件库如果开发组件库与文档编写和demo.vue开发分开两个项目这样会点繁琐。所以需要在开发组件库的项目中集成此功能。那么，文档基本都是用md文档来编写。需要做到编写文档并在vue项目中预览，那就需要用到vite-plugin-md插件来解析

配置如下

```js
import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

import Markdown from 'vite-plugin-md'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      packages: resolve(__dirname, '../packages'),
      docs: resolve(__dirname, '../docs')
    }
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown()
  ]
})
```

---

docs/Button/demo.vue

```html
<template>
  <div class="button-wrapper">
    <k-button @click="handleClickBtn('k_button1')">按钮1</k-button>
    <k-button @click="handleClickBtn('k_button2')">按钮2</k-button>
    <k-button @click="handleClickBtn('k_button3')">按钮3</k-button>
    <k-button @click="handleClickBtn('k_button4')">按钮4</k-button>
  </div>
</template>

<script lang="ts" setup>
const handleClickBtn = (test: string) => {
  console.log(test)
}
</script>
```

---

docs/Button/index.md

```md
# 按钮组件

<Preview name="demo"/>
```

最终md会编译成vue文件。

Preview组件是用来查看demo的组件。后续会说明。

---

## 三、代码预览

代码预览功能，就是上说Preview.vue组件

在 Vite 的[开发文档](https://cn.vitejs.dev/guide/assets.html#importing-asset-as-string)里有记载到，它支持在资源的末尾加上一个后缀来控制所引入资源的类型。比如可以通过 import xx from 'xx?raw' 以字符串形式引入 xx 文件。基于这个能力，我们可以在 ```<Preview />``` 组件中获取所需要展示的文件源码。

使用方法如下：

```html
<Preview name="demo"/>
````

代码如下：

```html
<template>
  <div class="kui-preview">
    <section class="demo-container">
      <component :is="com" />
    </section>
    <section class="code-container">
      <div :class="`source-code ${codeVisible ? 'show' : ''}`">
        <pre class="language-html"><code class="language-html">{{PreviewSourceCode}}</code></pre>
      </div>
      <div class="preview-bottom">
        <p @click="showSourceCode">查看代码</p>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { onMounted, shallowRef, nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'

// 代码高亮需要使用到prismjs这个库
import Prism from 'prismjs'
import '../assets/style/prism.css'

const props = defineProps({
  name: {
    require: true,
    type: String,
    default: ''
  }
})
const com = shallowRef()
const sourceCode = shallowRef('')
const codeVisible = ref(false)
const routeName = useRoute().name

// 通过import()动态获取从prop.name中传递过来的组件代码
import(`../../docs/${String(routeName)}/${props.name}.vue`).then(module => {
  com.value = module.default
})
const PreviewSourceCode = computed(() => {
  return sourceCode.value.replace(/'\.\.\/\.\.\/index'/g, `'@qhk/k-ui'`)
})
const showSourceCode = () => {
  codeVisible.value = !codeVisible.value
}
onMounted(async () => {
  sourceCode.value = (await import(`../../docs/${String(routeName)}/${props.name}.vue?raw`)).default
  // 需要等sourceCode更新到dom中，在调用highlightAll方法改变代码颜色
  await nextTick()
  Prism.highlightAll()
})
</script>
<style scoped lang="scss">
.source-code {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s;
  &.show {
    max-height: 500px;
    overflow: auto;
  }
}
.kui-preview {
  border: 4px;
  border: 1px dashed #e7e7e7;
  padding: 15px 15px 0;
  .demo-container {
    margin: 15px;
  }
}
.preview-bottom p {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-top: 1px dashed #e7e7e7;
  cursor: pointer;
}
</style>

```

## 四、命令行新建组件

命令行创建组件思考：主要是想偷懒。如果手动创建，需要添加packages/component，docs/component还需要修改packages/index.ts，src/router.ts

类似创建vue项目那样，通过命令行创建然后自动生成对应文件岂不是起飞。好的，为了偷懒所以下个脚本执行一下。

想做到命令行创建，就需要命令行交互，自然是用到inquirer。通过inquirer收集到的数据，再用脚本创建对应文件。
在创建对应文件时，需要有模版文件才知道需要创建什么文件。所以几个模版文件index.vue.tpl，index.ts.tpl，demo.vue.tpl，index.md.tpl，install.ts.tpl。

当有模版的时候，我们需要通过给模版传值并编译成我们需要的对应文件，需要用到handlebars.compile

处理文件的时候还需要fs文件读写系统。

## 五、打包组件库

## 遇到的问题

目前遇到的问题，就是组件库打包问题。
  
1. 如何打包通用组件库（umd，es模块打包等问题）
vite 配置 rollupOptions->input->format设置umd和es
2. 组件库如何做到按需加载（包括js，css这就需要每个组件另外单独打包）
按需加载实际上是每个组件单独打包并导出，css则需要在打包成功之后用脚本把css文件应用到js文件中
3. 目前打包css样式需要单独引入，如何做到自动引入
4. 组件库发布npm
发布组件库：npm login -> npm publish
需要注意的是package.json 注意配置main(umd方式应用时包管理自动读取该文件) module(es模式使用时包管理自动读取该文件)
若需要按需加载使用的话需要每个组件文件夹中配置package.json

多个库管理的话可以使用monorepo，类似vue。安装完vue之后可以使用vue/cli这是因为主包里面包含了多个子包。也可以单独引用子包。

任务：尝试使用monorepo改造组件库。包含1、组件库，2、cli工具，可命令交互式创建组件。等等
