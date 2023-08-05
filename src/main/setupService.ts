
import { WindowService } from '#code/service/WindowService';
import { WallpaperService } from '#code/service/WallpaperService';

import { ObtainWebPageService } from '#code/service/ObtainWebPageService';
import { DownloadService } from '#/code/service/DownloadService';
import { AppDataService } from '#/code/service/AppDataService';

import { setupIcpMainHandle } from './setupHandle';

import { ok, fail, r } from '#code/core/common/icpR';

import { ICP_WALLPAPER } from '#constants/wallpaper';


export const setupService = async () => {
  const { wallpaperService, obtainService } = await setupWallpaperAndPuppeteer();
  const { wallpaperSaveService, downloadService } = await setupAppDataDownload();

  const windowService = new WindowService();

  const appDataService = new AppDataService('userData', 'profile');

  return { windowService };
}

async function setupAppDataDownload() {
  const wallpaperSaveService = new AppDataService('userData', 'download');

  const downloadService = new DownloadService();

  setupIcpMainHandle(ICP_WALLPAPER.DOWNLOAD_WALLPAPER, (_, source: Source): Promise<string> => {

    return wallpaperSaveService.saveFile(source);
  });

  return { wallpaperSaveService, downloadService };
}

async function setupWallpaperAndPuppeteer() {
  const obtainService = new ObtainWebPageService();
  const wallpaperService = new WallpaperService();

  // init
  await obtainService.obtainSourceInit('https://cn.bing.com/images/search?cw=1905&ch=947&q=%e5%a3%81%e7%ba%b8&qft=+filterui:imagesize-wallpaper+filterui:photo-photo+filterui:aspect-wide+filterui:licenseType-Any&form=IRFLTR&first=1');

  setupIcpMainHandle(ICP_WALLPAPER.GET_WALLPAPER, (_) => r((ok, fail) => {
    wallpaperService.getWallpaper().then(res => {
      ok(res);
    }).catch(err => {
      fail(err);
    });
  }));

  setupIcpMainHandle(ICP_WALLPAPER.SET_WALLPAPER, (_, source: Source): Promise<string> => {
    return wallpaperService.setWallpaper(source);
  });

  setupIcpMainHandle(ICP_WALLPAPER.MORE_WALLPAPER, (_): Promise<Source[]> => {
    return obtainService.obtainImg();
  });

  return { wallpaperService, obtainService };
}
