import { BrowserWindow } from 'electron';
import { setIpcMainHandle } from '#/code/core/common/ipcR';
import { IPC_WINDOW } from '#/constants';

setIpcMainHandle(IPC_WINDOW.WINDOW_DOUBLE_CLICK, (e) => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);
  if (!window) {
    fail(void 0, '找不到指定窗口');
    return;
  }

  if (window?.isMaximized()) {
    window.restore();
    ok();
    return;
  }

  window?.maximize();
  ok();
}));

setIpcMainHandle(IPC_WINDOW.WINDOW_MAX_SIZE, e => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);
  if (!window) {
    fail(void 0, '找不到指定窗口');
    return;
  }

  window?.maximize();
  ok();
}));

setIpcMainHandle(IPC_WINDOW.WINDOW_MIN_SIZE, e => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);
  if (!window) {
    fail(void 0, '找不到指定窗口');
    return;
  }

  window?.minimize();
  ok();
}));

setIpcMainHandle(IPC_WINDOW.WINDOW_REDUCTION, e => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);
  if (!window) {
    fail(void 0, '找不到指定窗口');
    return;
  }

  if (window?.isMaximized()) {
    window.restore();
    ok();
    return;
  }

  window?.maximize();
  ok();
}));

setIpcMainHandle(IPC_WINDOW.WINDOW_CLOSE, e => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);
  if (!window) {
    fail(void 0, '找不到指定窗口');
    return;
  }

  window?.close();
  ok();
}));
