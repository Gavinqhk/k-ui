import { App, Plugin } from 'vue';
import Input1 from './src/index.vue';

export const Input1Plugin: Plugin = {
  install(app: App) {
    app.component('k-input1', Input1);
  },
};

export {
  Input1,
};
