
import { WindowService } from '#code/service/WindowService';
import { WallpaperService } from '#code/service/WallpaperService';

import { ObtainWebPageService } from '#code/service/ObtainWebPageService';
import { AppDataService } from '#/code/service/AppDataService';

export const setupService = () => {
  const windowService = new WindowService();

  const appDataService = new AppDataService('userData', 'test');

  const wallpaperService = new WallpaperService();
  const obtainService = new ObtainWebPageService();


  return {
    windowService,

    appDataService,

    wallpaperService,

    obtainService
  }
}
