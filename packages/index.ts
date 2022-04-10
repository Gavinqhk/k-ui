/* eslint-disable */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from 'vue';

import {ButtonPlugin} from './Button'
import {InputPlugin} from './Input'
import {UploadPlugin} from './Upload'
import {ImgPlugin} from './Img'
import {TableTablePlugin} from './TableTable'
import {Input1Plugin} from './Input1'

const KUIPlugin: Plugin = {
  install(app: App) {
    ButtonPlugin.install?.(app);
InputPlugin.install?.(app);
UploadPlugin.install?.(app);
ImgPlugin.install?.(app);
TableTablePlugin.install?.(app);
Input1Plugin.install?.(app);
  },
};

export default KUIPlugin;

export * from './Button'
export * from './Input'
export * from './Upload'
export * from './Img'
export * from './TableTable'
export * from './Input1'