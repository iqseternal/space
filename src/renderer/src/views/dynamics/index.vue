
<template>
  <div>
    <CardList :list="list"></CardList>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CardList } from '@renderer/components/card';

import { ICP_WALLPAPER } from '#constants/wallpaper';

const list = ref<Source[]>([]);

window.electron.ipcRenderer.invoke(ICP_WALLPAPER.MORE_WALLPAPER).then((sourceList: Source[]) => {
  list.value = sourceList
});

</script>

<style lang="scss" scoped>

</style>
