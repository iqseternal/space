
import { WindowService } from '#code/service/WindowService';
import { WallpaperService } from '#/code/service/WallpaperService';

import { ReptileService } from '#/code/service/ReptileService';
import { DownloadService } from '#/code/service/DownloadService';
import { AppDataService } from '#/code/service/AppDataService';

import { setIpcMainHandle } from '#/code/core/common/ipcR';

import { IPC_WALLPAPER, IPC_WINDOW } from '#/constants';

import { AppConfigService } from '#/code/service/AppConfigService';
import { PrinterService } from '#/code/service/PrinterService';
import { PAGES_WINDOW_MAIN } from '#/config';
import { UserConfigService } from '#/code/service/UserConfigService';
import { BrowserWindow } from 'electron';

export const setupService = async () => {
  // const { wallpaperService, reptileService } = await setupWallpaperAndPuppeteer();
  const { wallpaperSaveService, downloadService } = await setupAppDataDownload();

  const { windowService } = await setupWindowService();

  const appDataService = new AppDataService('userData', 'profile');

  return { windowService };
}

export async function setupWindowService() {
  PrinterService.printInfo('窗口构建');
  const appConfigService = AppConfigService.getInstance();

  const windowService = new WindowService(appConfigService.config.windows.mainWindow);

  windowService.window.setMenu(null);
  windowService.window.hookWindowMessage(278, e => {
    windowService.window.setEnabled(false);
    setTimeout(() => windowService.window.setEnabled(true), 100);
    return true;
  });
  // windowService.window.setEnabled(false);
  // windowService.window.setMaximizable(false);
  // windowService.window.setResizable(false);


  windowService.open(PAGES_WINDOW_MAIN);

  setIpcMainHandle(IPC_WINDOW.OPEN_WINDOW, (_, path: string) => ipcR((ok, fail) => {
    const window = new WindowService({});

    window.open(PAGES_WINDOW_MAIN);

    ok('ok');
  }));


  return { windowService };
}

export async function setupAppDataDownload() {
  const wallpaperSaveService = new AppDataService('userData', 'download');

  const downloadService = new DownloadService();

  setIpcMainHandle(IPC_WALLPAPER.DOWNLOAD_WALLPAPER, (_, source: Source) => ipcR((ok, fail) => {
    wallpaperSaveService.saveFile(source).then(ok).catch(fail);
  }));

  return { wallpaperSaveService, downloadService };
}

export async function setupWallpaperAndPuppeteer() {
  PrinterService.printInfo('构建壁纸和爬取服务');
  const reptileService = new ReptileService();
  const wallpaperService = new WallpaperService();

  setIpcMainHandle(IPC_WALLPAPER.GET_WALLPAPER, (_) => ipcR((ok, fail) => {
    wallpaperService.getWallpaper().then(res => {
      ok(res);
    }).catch(err => {
      fail(err, '壁纸设置失败了');
    });
  }));

  setIpcMainHandle(IPC_WALLPAPER.SET_WALLPAPER, (_, source: Source) => ipcR((ok, fail) => {
    wallpaperService.setWallpaper(source).then(ok).catch(fail);
  }));

  setIpcMainHandle(IPC_WALLPAPER.MORE_WALLPAPER, (_) => ipcR((ok, fail) => {
    reptileService.obtainImg().then(ok).catch(fail);
  }));

  return { wallpaperService, reptileService };
}
