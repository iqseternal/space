
import { WindowService } from '#code/service/WindowService';
import { WallpaperService } from '#code/service/WallpaperService';

import { ObtainWebPageService } from '#code/service/ObtainWebPageService';
import { AppDataService } from '#/code/service/AppDataService';

import { setupIcpHandle } from './setupHandle';

import { ICP_WALLPAPER } from '#constants/wallpaper';

export const setupService = async () => {
  const windowService = new WindowService();

  const appDataService = new AppDataService('userData', 'test');

  const wallpaperService = new WallpaperService();

  const obtainService = await setupPuppeteer();

  return { windowService, appDataService }
}

async function setupPuppeteer() {
  const obtainService = new ObtainWebPageService();

  // init
  await obtainService.obtainSourceInit('https://cn.bing.com/images/search?q=%e5%9b%be%e7%89%87&form=HDRSC3&first=1');

  setupIcpHandle(ICP_WALLPAPER.GET_WALLPAPER, (_) => {
    return 'fffff';
  });

  setupIcpHandle(ICP_WALLPAPER.SET_WALLPAPER, (_, url: string) => {

  });

  setupIcpHandle(ICP_WALLPAPER.MORE_WALLPAPER, async (_) => {
    return await obtainService.obtainImg();
  });

  return obtainService;
}
