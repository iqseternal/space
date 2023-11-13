import { ipcR } from '#/code/core/common/ipcR';
import { StoreKeyMap } from '#/constants';
import ElectronStore from 'electron-store';


global.ipcR = ipcR;

global.appStore = new ElectronStore<StoreKeyMap>;


