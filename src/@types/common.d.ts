import type { BrowserWindow } from 'electron';


declare global {
  declare type BaseCb = () => void;
  declare type WindowCb = (window: BrowserWindow) => void;



};

export {};
