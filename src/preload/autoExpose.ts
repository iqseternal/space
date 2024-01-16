/**
 * ==========================================
 * preload 文件 自动注入 的 Api封装
 * ==========================================
 */
import { contextBridge } from 'electron';

export type ExposeApiObj = Record<string | symbol, any>;

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

