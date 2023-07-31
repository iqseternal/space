
import { ICP_WALLPAPER } from '#constants/wallpaper';

export const loadMoreWallpaper = (): Promise<Source[]> => {
  return window.electron.ipcRenderer.invoke(ICP_WALLPAPER.MORE_WALLPAPER);
};

export const downloadWallpaper = (source: Source): Promise<string> => {
  return window.electron.ipcRenderer.invoke(ICP_WALLPAPER.DOWNLOAD_WALLPAPER, source);
}
