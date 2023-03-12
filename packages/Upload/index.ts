import { App, Plugin } from 'vue';
import Upload from './src/index.vue';

export const UploadPlugin: Plugin = {
  install(app: App) {
    app.component('k-upload', Upload);
  },
};

export {
  Upload,
};
