import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/reset.css'

import KUI from '../packages'
// import KUI from '@qhk/k_ui'

createApp(App).use(router).use(KUI).mount('#app')
