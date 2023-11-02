import { BrowserWindow, app, screen } from 'electron';
import { setIpcMainHandle, sendToRenderer, IpcResponseOk } from '#/code/core/common/ipcR';
import { reloadApp } from '#code/core/common/app';
import { IPC_DEV } from '#/constants';
import { IPC_MAIN_WINDOW, IPC_RENDER_WINDOW } from '#/constants';
import { PAGES_WINDOW_SETTING, PAGES_WINDOW_MAIN } from '#/config/pages';
import { is } from '@electron-toolkit/utils';

import { AppConfigService } from '#/code/service/AppConfigService';
import { UserConfigService } from '#/code/service/UserConfigService';
import { PrinterService } from '#/code/service/PrinterService';

setIpcMainHandle(IPC_DEV.DEV_OPEN_TOOL, (e, status, options?) => ipcR((ok, fail) => {
  const window = BrowserWindow.fromId(e.frameId);
  if (!window) {
    fail(false, '找不到指定窗口');
    return;
  }

  if (status) {

    if (is.dev) {
      PrinterService.printInfo(`id: ${e.frameId} 打开了开发者工具`);
      window.webContents.openDevTools(options);
    }
    else {
      PrinterService.printError(`生产模式, 不允许打开开发者工具`);
      fail(false, '当前状态不允许打开开发者工具');
      return;
    }
  }
  else {
    PrinterService.printInfo(`id: ${e.frameId} 关闭了开发者工具`);
    window.webContents.closeDevTools();
  }

  ok(true, 'ok');
}));
