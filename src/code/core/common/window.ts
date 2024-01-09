import type { IpcMainInvokeEvent, IpcMainEvent } from 'electron';
import { is } from '@electron-toolkit/utils';
import { printWarn } from '@suey/printer';
import { BrowserWindow, globalShortcut, app, screen, Tray, Menu, shell } from 'electron';
import { isNumber } from '@suey/pkg-utils';

/**
 * 设置浏览器窗口允许跨域的设置
 * @param window
 * @returns
 */
export const setWindowCross = (window: BrowserWindow): BrowserWindow => {
  window.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
    callback({ requestHeaders: { origin: '*', ...details.requestHeaders } });
  });
  window.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: { 'Access-Control-Allow-Origin': ['*'], ...details.responseHeaders }
    });
  });
  return window;
};

/**
 * 设置某个窗口的最大尺寸，当没有传递固定值的时候，默认为屏幕的最大尺寸大小
 * @param window
 * @param wMax
 * @param hMax
 * @returns
 */
export const setWindowMaxSize = (window: BrowserWindow, wMax?: number, hMax?: number): void => {
  if (wMax && hMax) {
    window.setMaximumSize(wMax, hMax);
    return;
  }

  app.whenReady().then(() => {
    const { width: maxWidth, height: maxHeight } = screen.getPrimaryDisplay().size;
    window.setMaximumSize(maxWidth, maxHeight);
  });
};


/**
 * 设置某个窗口的最小尺寸
 * @param window
 * @param wMin
 * @param hMin
 */
export const setWindowMinSize = (window: BrowserWindow, wMin: number, hMin: number): void => {
  window.setMinimumSize(wMin, hMin);
}


export const setWindowOpenHandler = (window: BrowserWindow): void => {
  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });
}

export const setWindowCaption = (window: BrowserWindow, icon: string, title: string): void => {
  window.setIcon(icon);
  window.setTitle(title);
}

export const setWindowCloseCaptionContextmenu = (window: BrowserWindow) => {
  window.hookWindowMessage(278, e => {
    window.setEnabled(false);
    setTimeout(() => window.setEnabled(true), 100);
    return true;
  });
}

export const setWindowDevtoolsDetach = (window: BrowserWindow) => {
  // if (is.dev)
  window.webContents.openDevTools({ mode: 'detach' });
}


export function getWindowFromIpcEvt(evt: IpcMainEvent | IpcMainInvokeEvent) {
  return BrowserWindow.fromWebContents(evt.sender);
}

export function getWindowFromId(id: number) {
  return BrowserWindow.fromId(id);
}

export function getWindowFrom(arg: number | IpcMainEvent | IpcMainInvokeEvent): BrowserWindow | null {
  if (isNumber(arg)) return getWindowFromId(arg);
  else return getWindowFromIpcEvt(arg);
}
