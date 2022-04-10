import { App, Plugin } from 'vue';
import Img from './src/index.vue';

export const ImgPlugin: Plugin = {
  install(app: App) {
    app.component('k-img', Img);
  },
};

export {
  Img,
};
