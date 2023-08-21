
import { WindowService } from '#code/service/WindowService';
import { WallpaperService } from '#/code/_customService/WallpaperService';

import { ReptileService } from '#/code/_customService/ReptileService';
import { DownloadService } from '#/code/service/DownloadService';
import { AppDataService } from '#/code/service/AppDataService';

import { setupIcpMainHandle } from './setupHandle';

import { IPC_WALLPAPER, IPC_WINDOW } from '#/constants';

import appConfig from '../../app.config.json';
import { PAGES_WINDOW_MAIN } from '#/config';

export const setupService = async () => {
  const { wallpaperService, reptileService } = await setupWallpaperAndPuppeteer();
  const { wallpaperSaveService, downloadService } = await setupAppDataDownload();

  const { windowService } = await setupWindowService();

  const appDataService = new AppDataService('userData', 'profile');

  return { windowService, reptileService };
}

export async function setupWindowService() {
  const windowService = new WindowService(appConfig.windows.mainWindow);

  windowService.open(PAGES_WINDOW_MAIN);

  setupIcpMainHandle(IPC_WINDOW.OPEN_WINDOW, (_) => ipcR((ok, fail) => {
    const window = new WindowService({});

    window.open(PAGES_WINDOW_MAIN);

    ok('ok');
  }));

  return { windowService };
}

export async function setupAppDataDownload() {
  const wallpaperSaveService = new AppDataService('userData', 'download');

  const downloadService = new DownloadService();

  setupIcpMainHandle(IPC_WALLPAPER.DOWNLOAD_WALLPAPER, (_, source: Source): Promise<string> => {

    return wallpaperSaveService.saveFile(source);
  });

  return { wallpaperSaveService, downloadService };
}

export async function setupWallpaperAndPuppeteer() {
  const reptileService = new ReptileService();
  const wallpaperService = new WallpaperService();

  setupIcpMainHandle(IPC_WALLPAPER.GET_WALLPAPER, (_) => ipcR((ok, fail) => {
    wallpaperService.getWallpaper().then(res => {
      ok(res);
    }).catch(err => {
      fail(err, '壁纸设置失败了');
    });
  }));

  setupIcpMainHandle(IPC_WALLPAPER.SET_WALLPAPER, (_, source: Source): Promise<string> => {
    return wallpaperService.setWallpaper(source);
  });

  setupIcpMainHandle(IPC_WALLPAPER.MORE_WALLPAPER, (_) => ipcR((ok, fail) => {
    reptileService.obtainImg().then(ok).catch(fail);
  }));

  return { wallpaperService, reptileService };
}
