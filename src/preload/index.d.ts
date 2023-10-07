
import ElectronStore from 'electron-store';
import type { ExposeApi } from './index';
import { StoreKeyMap } from '#/constants';

export interface GlobalVar {
  appStore: ElectronStore<StoreKeyMap>;
}

declare global {
  interface Window extends ExposeApi {


  }

  var appStore: ElectronStore<StoreKeyMap>;
}

export { };
