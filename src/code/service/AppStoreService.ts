
import type { StoreKeyMap } from '#/constants';
import { defaultStoreMapValue } from '#/constants';

import { SingleInstanceService } from './SingleInstanceService';

import ElectronStore from 'electron-store';

export class AppStoreService<T extends StoreKeyMap = StoreKeyMap> extends SingleInstanceService<AppStoreService> {
  private readonly electronStore: ElectronStore<T> = new ElectronStore<T>();

  static getInstance<K = AppStoreService>() { return super.getInstance<K>(); }

  get path() { return this.electronStore.path; }
  get size() { return this.electronStore.size; }
  get store() { return this.electronStore.store; }
  get events() { return this.electronStore.events; }

  get<K extends keyof T>(key: K, defaultValue?: T[K]) {
    if (defaultValue) return this.electronStore.get(key, defaultValue);

    if (!!(defaultStoreMapValue as T)[key]) {
      return this.electronStore.get(key, (defaultStoreMapValue as T)[key]);
    }
    return this.electronStore.get(key);
  }

  set<K extends keyof T>(key: K, value: T[K]) { return this.electronStore.set(key, value); }

  has<K extends keyof T>(key: K) { return this.electronStore.has(key); }

  reset<K extends keyof T>(...keys: K[]) { return this.electronStore.reset(...keys); }

  delete<K extends keyof T>(key: K) { return this.electronStore.delete(key); }

  clear() { return this.electronStore.clear(); }

  onDidChange<K extends keyof T>(key: K, callback: (newValue?: T[K], oldValue?: T[K]) => void): ReturnType<typeof this.electronStore.onDidChange> {
    return this.electronStore.onDidChange(key, callback);
  }

  onDidAnyChange(callback: (newValue?: Readonly<T>, oldValue?: Readonly<T>) => void): ReturnType<typeof this.electronStore.onDidAnyChange> {
    return this.electronStore.onDidAnyChange(callback);
  }

  openInEditor() { return this.electronStore.openInEditor(); }
}

