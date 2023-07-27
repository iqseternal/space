
import { contextBridge } from 'electron';

type ExposeApiObj = Record<string | symbol, any>;

export function autoExpose<T extends ExposeApiObj>(exposeApiObj: Required<T>): void {
  if (process.contextIsolated) {
    for (const key in exposeApiObj) contextBridge.exposeInMainWorld(key, exposeApiObj[key]);
  }
  else {
    for (const key in (exposeApiObj as Required<ExposeApiObj>)) window[key] = exposeApiObj[key];
  }
}

