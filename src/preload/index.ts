import { electronAPI } from '@electron-toolkit/preload';

import { ElectronAPI } from './preload.d';
import { autoExpose } from './autoExpose';

export interface ExposeApi {
  electron: ElectronAPI;
};

autoExpose<ExposeApi>({
  electron: electronAPI
});
