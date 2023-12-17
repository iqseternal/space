import { WindowService } from '#code/service/WindowService';
import { WallpaperService } from '#/code/service/WallpaperService';
import { ReptileService } from '#/code/service/ReptileService';
import { DownloadService } from '#/code/service/DownloadService';
import { AppDataService } from '#/code/service/AppDataService';
import { setIpcMainHandle } from '#/code/core/common/ipcR';
import { IPC_MAIN_WINDOW } from '#/constants';
import { AppConfigService } from '#/code/service/AppConfigService';
import { PrinterService } from '#/code/service/PrinterService';
import { PAGES_WINDOW_MAIN, PAGES_WINDOW_SETTING } from '#/config';
import { UserConfigService } from '#/code/service/UserConfigService';
import { BrowserWindow } from 'electron';
import { Printer } from '@suey/printer';

import { setWindowCloseCaptionContextmenu, setWindowDevtoolsDetach } from '#code/core/common/window';

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
  const windowService = new WindowService({width: 690, height: 580, titleBarStyle:'hidden'}, {
    url: PAGES_WINDOW_SETTING,
    autoShow: true
  });

  windowService.window.setResizable(false);
  windowService.window.setMenu(null);

  setWindowCloseCaptionContextmenu(windowService.window);

  PrinterService.printInfo('设置窗口ID, ', windowService.window.id);
  return windowService;
}
