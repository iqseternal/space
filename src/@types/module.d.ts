
/// <reference types="vite/client" />

import { ipcR as ipcResponseFn } from '#/code/core/common/ipcR';

declare module '*.json' {
  const data: Record<string, any>
  export default data
}

declare global {
  var ipcR: typeof ipcResponseFn;
}




