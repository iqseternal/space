
import { IPC_WALLPAPER } from '#constants/wallpaper';

export const loadMoreWallpaper = () => {
  console.log(IPC_WALLPAPER.MORE_WALLPAPER);
  return window.electron.ipcRenderer.invoke<Source[]>(IPC_WALLPAPER.MORE_WALLPAPER);
};

export const downloadWallpaper = (source: Source) => {
  return window.electron.ipcRenderer.invoke<Source[]>(IPC_WALLPAPER.DOWNLOAD_WALLPAPER, source);
};
