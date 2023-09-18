<template>
  <CaptionBar class="captionBar">
    <template #widget>
      <WidgetSvg :src="windowMinSvg" @click="minWindow" class="widgetItem" />
      <WidgetSvg :src="isMaximized ? windowRegionSvg : windowMaxSvg" @click="reductionWindow" class="widgetItem" />
      <WidgetSvg :src="windowCloseSvg" @click="closeWindow" class="widgetItem"/>
    </template>
  </CaptionBar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { IPC_MAIN_WINDOW, IPC_RENDER_WINDOW } from '#/constants';

import CaptionBar from './CaptionBar.vue';
import WidgetSvg from './WidgetSvg.vue';

import windowMaxSvg from '@renderer/assets/svg/windowMax.svg?url';
import windowMinSvg from '@renderer/assets/svg/windowMin.svg?url';
import windowRegionSvg from '@renderer/assets/svg/windowRegion.svg?url';
import windowCloseSvg from '@renderer/assets/svg/windowClose.svg?url';

const isMaximized = ref(false);
window.electron.ipcRenderer.on(IPC_RENDER_WINDOW.WINDOW_STATUS, (_, d) => (isMaximized.value = d.data));

const router = useRouter();
const route = useRoute();

const maxWindow = () => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_MAX_SIZE);
const minWindow = () => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_MIN_SIZE);
const reductionWindow = () => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_REDUCTION);
const closeWindow = () => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_CLOSE);
</script>

<style lang="scss" scoped>
@import "../../../../styles/mixin.scss";
@import "../../../../styles/var.scss";

.captionBar {
  width: 100%;
  height: $sMainCaptionBarHeight;
  background-color: var(--s-main-frame-active-color);
  // background-color: var(--s-main-frame-active-contain-color);
  @include appRegion;

  .widgetItem {
    --size: 28px;

    width: var(--size);
    height: var(--size);

    @include appRegionNo;
  }
}

</style>

