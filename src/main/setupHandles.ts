import { BrowserWindow, app } from 'electron';
import { setIpcMainHandle, sendToRenderer, IpcResponseOk } from '#/code/core/common/ipcR';
import { reloadApp } from '#code/core/common/app';
import { IPC_MAIN_WINDOW, IPC_RENDER_WINDOW } from '#/constants';

import { AppConfigService } from '#/code/service/AppConfigService';
import { UserConfigService } from '#/code/service/UserConfigService';

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_MAX_SIZE, e => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);
  if (!window) {
    fail(void 0, '找不到指定窗口');
    return;
  }
  window?.maximize();
  sendToRenderer(window, IPC_RENDER_WINDOW.WINDOW_STATUS, new IpcResponseOk(true, '最大化了'));
  ok();
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_MIN_SIZE, e => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);
  if (!window) {
    fail(void 0, '找不到指定窗口');
    return;
  }

  window?.minimize();
  ok();
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_REDUCTION, e => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);
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

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_CLOSE, e => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);
  if (!window) {
    fail(void 0, '找不到指定窗口');
    return;
  }

  window?.close();
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

  window.setSize(width, height);

  ok(true);
}));


setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_RESET_CUSTOM_SIZE, (e) => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);
  if (!window) {
    reloadApp();
    fail(false, '找不到指定窗口');
    return;
  }

  const appConfigService = AppConfigService.getInstance();
  const userConfigService = UserConfigService.getInstance();
  const { width, height } = userConfigService.config.windows.mainWindow;

  if (!window || !height) {
    const { width: aWidth, height: aHeight } = appConfigService.config.windows.mainWindow;
    window.setSize(aWidth, aHeight);
    ok();
    return;
  }

  window.setSize(width as unknown as number, height as unknown as number);
  ok();
}));
