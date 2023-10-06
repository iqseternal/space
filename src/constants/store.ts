
export class STORE_KEYS {
  public static readonly WINDOW_CUSTOM_SIZE = 'WINDOW_SIZE'; // 用户调整的窗口大小
}

export interface StoreKeyMap {
  [STORE_KEYS.WINDOW_CUSTOM_SIZE]: {
    width: number;
    height: number;
  };
}

export const defaultStoreMapValue: Partial<Record<keyof StoreKeyMap, StoreKeyMap[keyof StoreKeyMap]>> = {

}
