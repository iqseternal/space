import { WindowService } from '#code/service/WindowService';
import { WallpaperService } from '#/code/service/WallpaperService';
import { ReptileService } from '#/code/service/ReptileService';
import { DownloadService } from '#/code/service/DownloadService';
import { AppDataService } from '#/code/service/AppDataService';
import { IpcResponseOk, sendToRenderer, setIpcMainHandle } from '#/code/core/common/ipcR';
import { CONFIG, IPC_MAIN_WINDOW, IPC_RENDER_DIALOG_WINDOW } from '#/constants';
import { AppConfigService } from '#/code/service/AppConfigService';
import { PrinterService } from '#/code/service/PrinterService';
import { PAGES_WINDOW_DIALOG, PAGES_WINDOW_MAIN, PAGES_WINDOW_SETTING } from '#/config';
import { UserConfigService } from '#/code/service/UserConfigService';
import { BrowserWindow, app } from 'electron';
import { Printer } from '@suey/printer';

import { setWindowCloseCaptionContextmenu, setWindowDevtoolsDetach, setWindowOpenHandler } from '#code/core/common/window';

export async function setupAppDataDownload() {
  const wallpaperSaveService = new AppDataService('userData', 'download');
  const downloadService = new DownloadService();
  return { wallpaperSaveService, downloadService };
}

export async function setupMainWindow() {
  PrinterService.printInfo('窗口构建');
  const appConfigService = AppConfigService.getInstance();

  const windowService = new WindowService(appConfigService.config.windows.mainWindow as Electron.BrowserWindowConstructorOptions, {
    url: PAGES_WINDOW_MAIN,
    autoShow: false
  });

  windowService.window.setMenu(null);
  setWindowCloseCaptionContextmenu(windowService.window);
  setWindowDevtoolsDetach(windowService.window);

  PrinterService.printInfo('主窗口ID, ', windowService.window.id);
  return windowService;
}

export async function setupSettingWindow() {
  PrinterService.printInfo('构建设置页面');

  const appConfigService = AppConfigService.getInstance();
  const windowService = new WindowService(appConfigService.config.windows.mediumPopupWindow as Electron.BrowserViewConstructorOptions, {
    url: PAGES_WINDOW_SETTING,
    autoShow: false
  });


  windowService.window.setResizable(false);
  windowService.window.setMenu(null);
  return windowService;
}

export interface DialogWindowOptions {
  type: typeof CONFIG.DIALOG[keyof typeof CONFIG.DIALOG]['NAME'];
}

export async function setupDialogWindow(options: DialogWindowOptions) {
  PrinterService.printInfo('构建弹窗');

  const appConfigService = AppConfigService.getInstance();
  const windowService = new WindowService(appConfigService.config.windows.smallPopupWindow as Electron.BrowserWindowConstructorOptions, {
    url: PAGES_WINDOW_DIALOG,
    autoShow: true
  });

  windowService.window.setResizable(false);
  windowService.window.setMenu(null);

  setWindowCloseCaptionContextmenu(windowService.window);
  // setWindowDevtoolsDetach(windowService.window);

  windowService.addOpenThenCb(() => {
    PrinterService.printWarn(`弹窗打开成功了`);

    sendToRenderer(windowService.window, IPC_RENDER_DIALOG_WINDOW.DIALOG_TYPE, new IpcResponseOk(options.type));
  });
  windowService.addOpenCatchCb(() => {
    PrinterService.printWarn(`弹窗打开失败了`);
  });

  return windowService;
}
