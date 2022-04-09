import { App, Plugin } from 'vue'

import { ButtonPlugin } from './Button'
import { InputPlugin } from './Input'

const KUIPlugin: Plugin = {
  install(app: App) {
    ButtonPlugin.install?.(app)
    InputPlugin.install?.(app)
  }
}

export default KUIPlugin
