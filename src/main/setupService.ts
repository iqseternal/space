
import { WindowService } from '#code/service/WindowService';
import { WallpaperService } from '#code/service/WallpaperService';

import { ObtainWebPageService } from '#code/service/ObtainWebPageService';
import { DownloadService } from '#/code/service/DownloadService';
import { AppDataService } from '#/code/service/AppDataService';

import { setupIcpMainHandle } from './setupHandle';

import { IPC_WALLPAPER, IPC_WINDOW } from '#/constants';

import appConfig from '../../app.config.json';

export const setupService = async () => {
  const { wallpaperService, obtainService } = await setupWallpaperAndPuppeteer();
  const { wallpaperSaveService, downloadService } = await setupAppDataDownload();

  const { windowService } = await setupWindowService();

  const appDataService = new AppDataService('userData', 'profile');

  return { windowService };
}

export async function setupWindowService() {

  const windowService = new WindowService(appConfig.windows.mediumPopupWindow);

  windowService.open();

  setupIcpMainHandle(IPC_WINDOW.OPEN_WINDOW, (_) => icpR((ok, fail) => {
    const window = new WindowService({});

    window.open();

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
  const obtainService = new ObtainWebPageService();
  const wallpaperService = new WallpaperService();

  // init
  await obtainService.obtainSourceInit('https://cn.bing.com/images/search?cw=1905&ch=947&q=%e5%a3%81%e7%ba%b8&qft=+filterui:imagesize-wallpaper+filterui:photo-photo+filterui:aspect-wide+filterui:licenseType-Any&form=IRFLTR&first=1');

  setupIcpMainHandle(IPC_WALLPAPER.GET_WALLPAPER, (_) => icpR((ok, fail) => {
    wallpaperService.getWallpaper().then(res => {
      ok(res);
    }).catch(err => {
      fail(err, '壁纸设置失败了');
    });
  }));

  setupIcpMainHandle(IPC_WALLPAPER.SET_WALLPAPER, (_, source: Source): Promise<string> => {
    return wallpaperService.setWallpaper(source);
  });

  setupIcpMainHandle(IPC_WALLPAPER.MORE_WALLPAPER, (_): Promise<Source[]> => {
    return obtainService.obtainImg();
  });

  return { wallpaperService, obtainService };
}
