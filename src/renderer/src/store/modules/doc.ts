import { defineStore } from 'pinia';
import { reactive, watch, watchEffect, computed, ref } from 'vue';
import { setupIndexedDB } from '@renderer/indexedDB';
import { IndexedDB } from '@libs/indexedDB';
import { DATABASES_META2D, type TablesType } from '#constants/indexDB';
import { IPC_MAIN_WINDOW } from '#constants/ipc';
import { windowClose } from '@renderer/actions';

import { isDef, isUnDef } from '@suey/pkg-utils';
import store from '@renderer/store';

export const useDocStore = defineStore('docStore', () => {
  let indexedDB = void 0 as unknown as IndexedDB<TablesType>;

  const currentId = ref<number | undefined>(void 0);
  const isWork = computed(() => isDef(currentId.value));

  const setDocId = (id: number | undefined) => {

    console.log(currentId.value, id);

    currentId.value = id;

  }


  const initIndexedFn = <Args extends unknown[], R>(fn: (...args: Args) => R) => {
    return async (...args: Args): Promise<R> => {
      if (!indexedDB) {
        const indexed = await setupIndexedDB();
        if (!indexed) {
          windowClose();
          throw new Error();
        }
        indexedDB = indexed;
      }
      return fn(...args);
    }
  }

  const createDoc = initIndexedFn(() => {
    const objectStore = indexedDB.transaction(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT, 'readwrite').objectStore(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT);

    const data = {
      id: 2
    }

    const promi = objectStore.create(data);

    return promi as Promise<typeof data>;
  })
  const deleteDoc = initIndexedFn(() => {

  })
  const putDocData = initIndexedFn((id: number) => {

  })

  return {
    currentId,
    isWork,

    setDocId,

    createDoc, deleteDoc, putDocData
  }
});

export function useDocStoreHook() {
  return useDocStore(store);
}
