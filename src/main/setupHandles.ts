import { BrowserWindow } from 'electron';
import { setIpcMainHandle, sendToRenderer, IpcResponseOk } from '#/code/core/common/ipcR';
import { IPC_MAIN_WINDOW, IPC_RENDER_WINDOW } from '#/constants';

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
