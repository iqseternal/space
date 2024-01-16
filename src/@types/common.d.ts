import type { BrowserWindow } from 'electron';


declare global {
  /** 基本回调函数 */
  declare type BaseCb = () => void;
  /** 主进程对于窗口的回调函数 */
  declare type WindowCb = (window: BrowserWindow) => void;



};

export {};
