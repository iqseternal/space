import { printError, printInfo } from '@suey/printer';
import { exec } from 'child_process';
import { getWallpaperShell, setWallpaperShell, refreshWallpaper } from '#code/core/shell/wallpaperShell';

export class WallpaperService {
  constructor(

  ) {

  }

  setWallpaper(imagePath: string) {
    return setWallpaperShell(imagePath);
  }

  refreshWallpaper() {
    return refreshWallpaper();
  }

  getWallpaper() {

  }
}
