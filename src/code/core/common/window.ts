
import { BrowserWindow } from 'electron';
import { app, screen, Tray, Menu } from 'electron';

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
