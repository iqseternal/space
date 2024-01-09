import { defineStore } from 'pinia';
import { reactive, watch, watchEffect, computed, ref } from 'vue';
import store from '@renderer/store';

export const useDocStore = defineStore('doc-store', () => {
  const state = reactive({
    currentId: 1


  });





});

export function useDocStoreHook() {
  return useDocStore(store);
}
