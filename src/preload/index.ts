import { electronAPI, type ElectronAPI } from '@electron-toolkit/preload';
import { autoExpose } from './autoExpose';

export interface ExposeApi {
  electron: ElectronAPI;
};

autoExpose<ExposeApi>({
  electron: electronAPI
});
