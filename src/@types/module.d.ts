
/// <reference types="vite/client" />
import { ipcR as ipcResponseFn } from '#/code/core/common/ipcR';
import type { PropType as VuePropType } from 'vue';


declare global {
  // 主进程
  var ipcR: typeof ipcResponseFn;

  // 渲染进程
  declare type PropType = VuePropType;
}
