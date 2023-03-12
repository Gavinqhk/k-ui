import { App, Plugin } from 'vue';
import TableTable from './src/index.vue';

export const TableTablePlugin: Plugin = {
  install(app: App) {
    app.component('k-table-table', TableTable);
  },
};

export {
  TableTable,
};
