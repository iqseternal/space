import { BrowserWindow, app } from 'electron';
import { setIpcMainHandle, sendToRenderer, IpcResponseOk } from '#/code/core/common/ipcR';
import { reloadApp } from '#code/core/common/app';
import { IPC_MAIN_WINDOW, IPC_RENDER_WINDOW } from '#/constants';
import { PAGES_WINDOW_SETTING, PAGES_WINDOW_MAIN } from '#/config/pages';

import { AppConfigService } from '#/code/service/AppConfigService';
import { UserConfigService } from '#/code/service/UserConfigService';
import { Printer } from '@suey/printer';
import { setupMainWindow, setupSettingWindow } from './setupService';

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_MAX_SIZE, (e, id) => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(id ?? e.frameId);
  if (!window) {
    fail(void 0, '找不到指定窗口');
    return;
  }
  window?.maximize();
  sendToRenderer(window, IPC_RENDER_WINDOW.WINDOW_STATUS, new IpcResponseOk(true, '最大化了'));
  ok();
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_MIN_SIZE, (e, id) => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(id ?? e.frameId);
  if (!window) {
    fail(void 0, '找不到指定窗口');
    return;
  }

  window?.minimize();
  ok();
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_REDUCTION, (e, id?: number) => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(id ?? e.frameId);
  if (!window) {
    fail(void 0, '找不到指定窗口');
    return;
  }

  if (window?.isMaximized()) {
    window.restore();
    sendToRenderer(window, IPC_RENDER_WINDOW.WINDOW_STATUS, new IpcResponseOk(false, '被还原了'));
    ok();
    return;
  }

  window?.maximize();
  sendToRenderer(window, IPC_RENDER_WINDOW.WINDOW_STATUS, new IpcResponseOk(true, '最大化了'));
  ok();
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, (e, able: boolean) => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);

  if (!window) {
    fail(false, '找不到指定窗口');
    return;
  }

  window.setResizable(able);
  ok(true, '窗口RESIZE更改成功');
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_RELAUNCH, () => ipcR((ok, fail) => {
  reloadApp();
  ok();
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_SET_SIZE, (e, width, height) => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);
  if (!window) {

    fail(false, '找不到指定窗口');
    return;
  }

  window.setMinimumSize(0, 0);
  window.setSize(width, height);

  ok(true);
}));

// 渲染进程改变窗口大小, 在此做了更改大小的时候, 窗口也会更随着自动定位到原来窗口的中心位置扩展
// 例如原本的窗口小, 但在正中间, 那么更改放大之后, 窗口的中心也会在屏幕的正中央
setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_RESET_CUSTOM_SIZE, (e, type) => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);
  if (!window) {
    reloadApp();
    fail(false, '找不到指定窗口');
    return;
  }

  const appConfigService = AppConfigService.getInstance();
  const userConfigService = UserConfigService.getInstance();

  const { width: userWidth, height: userHeight } = userConfigService.config.windows.mainWindow;
  const { width: appWidth, height: appHeight } = appConfigService.config.windows.mainWindow;

  const [width, height] = window.getSize();
  const [positionX, positionY] = window.getPosition();

  let targetWidth: number = 0, targetHeight: number = 0;
  let gapWidth: number = 0, gapHeight: number = 0;
  let targetPx: number = 0, targetPy: number = 0;

  if (!userWidth || !userHeight) targetWidth = appWidth, targetHeight = appHeight;
  else targetWidth = userWidth, targetHeight = userHeight;

  gapWidth = (targetWidth - width) * (targetWidth > width ? 1 : -1);
  gapHeight = (targetHeight - height) * (targetHeight > height ? 1 : -1);

  targetPx = positionX + gapWidth / 2 * -1;
  targetPy = positionY + gapHeight / 2 * -1;

  if (type === 'mainWindow') {
    const { minWidth, minHeight } = appConfigService.config.windows.mainWindow;
    window.setMinimumSize(minWidth, minHeight);
  }

  // 取消这是因为当前使用的标题栏在屏幕上方, 如果按中心改变位置, 可能出现看不到标题栏从而无法拖动的情况
  // window.setPosition(targetPx, targetPy);
  window.setSize(targetWidth, targetHeight);
  ok();
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_OPEN, (e, type) => ipcR(async (ok, fail) => {
  const settingWindow = await setupSettingWindow();
  settingWindow.open();
  ok(true);
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_CLOSE, (e, id?: number) => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(id ?? e.frameId);
  if (!window) {
    fail(false, '找不到指定窗口');
    return;
  }

  window?.close();
  ok(true);
}));


setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_SHOW, (e, show: boolean, id?: number) => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(id ?? e.frameId);
  if (!window) {
    fail(false, '找不到指定窗口');
    return;
  }

  if (show) window.show();
  else window.hide();

  ok(true);
  return;
}));
