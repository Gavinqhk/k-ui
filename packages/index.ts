import { App, Plugin } from 'vue'

import { ButtonPlugin } from './Button'

const KUIPlugin: Plugin = {
  install(app: App) {
    ButtonPlugin.install?.(app)
  }
}

export default KUIPlugin
