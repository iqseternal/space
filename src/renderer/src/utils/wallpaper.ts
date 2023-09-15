
import { IPC_WALLPAPER } from '#/constants';


export const loadMoreWallpaper = () => {
  return window.electron.ipcRenderer.invoke(IPC_WALLPAPER.MORE_WALLPAPER);
};

export const downloadWallpaper = (source: Source) => {
  return window.electron.ipcRenderer.invoke(IPC_WALLPAPER.DOWNLOAD_WALLPAPER, source);
};



