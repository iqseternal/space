
/// <reference types="vite/client" />

import { ipcR as ipcResponseFn } from '#/code/core/common/ipcR';
import { PropType as VuePropType } from 'vue';

declare module '*.json' {
  const data: Record<string, any>
  export default data
}

declare global {
  var ipcR: typeof ipcResponseFn;


  declare type PropType = VuePropType;
}




