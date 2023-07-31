
import { contextBridge } from 'electron';

type ExposeApiObj = Record<string | symbol, any>;

export function autoExpose<T extends ExposeApiObj>(exposeApiObj: Required<T>): void {
  if (process.contextIsolated) {
    Object.keys(exposeApiObj).forEach(key => {
      contextBridge.exposeInMainWorld(key, exposeApiObj[key]);
    });
  }
  else {
    Object.keys(exposeApiObj).forEach(key => {
      window[key] = exposeApiObj[key];
    });
  }
}

