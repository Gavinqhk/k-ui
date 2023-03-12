import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style/reset.css'
import './assets/style/markdown.css'

import KUI from '../packages'

import Preview from '../src/components/Preview.vue'

const app = createApp(App)
app.component('Preview', Preview)
app.use(router).use(KUI).mount('#app')
