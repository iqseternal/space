import type { GlobalVar } from './index.d';
import type { ElectronAPI } from './preload.d';

import { autoExpose } from './autoExpose';
import { electronAPI } from '@electron-toolkit/preload';

import ElectronStore from 'electron-store';
import type { StoreKeyMap } from '#constants/store';

export interface ExposeApi {
  electron: ElectronAPI;
}

autoExpose<ExposeApi>({
  electron: electronAPI
});

// autoExpose<GlobalVar>({
//   appStore: new ElectronStore<StoreKeyMap>()
// });
