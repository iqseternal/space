
import ElectronStore from 'electron-store';
import type { ExposeApi } from './index';
import { StoreKeyMap } from '#/constants';

declare global {
  interface Window extends ExposeApi {


  }
}

export { };
