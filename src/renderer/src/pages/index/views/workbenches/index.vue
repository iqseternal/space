<template>
  <template v-if="isWork">
    <DrawingBoard />
  </template>
  <template v-else>
    <BulletinBoard />
  </template>
</template>

<script lang="tsx" setup>
import { onBeforeMount, ref } from 'vue';
import { ENV, IS_DEV, IS_LINUX, IS_MAC, IS_PROD, TABLES, DATABASES_META2D } from '#/constants';
import { isUnDef } from '@suey/pkg-utils';
import { setupIndexedDB } from '@renderer/indexedDB';
import type { Meta2dData } from '@meta2d/core';

import { useDocStore } from '@renderer/store/modules/doc';
import BulletinBoard from './bulletinBoard/index.vue';
import DrawingBoard from './drawingBoard/index.vue';

const { isWork } = useDocStore();


console.log(isWork)

onBeforeMount(async () => {
  // const indexedDB = await setupIndexDB();
  // if (isUnDef(indexedDB)) return;

  // const objectStore = indexedDB.transition(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT, 'readwrite').objectStore(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT)

  // console.log(objectStore);

  // objectStore.put({
  //   CREAT_AT: Date.now().toString(),
  //   EDIT_AT: Date.now().toString(),
  //   META_2D_DOC_NAME: '未命名3',
  //   META_2D_DATA: {
  //   } as Meta2dData
  // })
})
</script>

