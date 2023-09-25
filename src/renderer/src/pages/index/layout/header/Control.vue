<template>
  <Subfield>
    <template #left><div /></template>
    <template #center><div /></template>
    <template #right>
      <div />
      <Space :size="8" style="margin-right: 8px;">
        <WidgetSvg :src="windowMinSvg" @click="minWindow" class="widgetItem" />
        <WidgetSvg :src="windowRegionSvg" @click="reductionWindow" class="widgetItem" />
        <WidgetSvg :src="windowCloseSvg" @click="closeWindow" class="widgetItem"/>
      </Space>
    </template>
  </Subfield>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IPC_MAIN_WINDOW, IPC_RENDER_WINDOW } from '#/constants';
import { Space } from 'ant-design-vue';

import Subfield from '@renderer/components/Subfield/Subfield.vue';
import WidgetSvg from './WidgetSvg.vue';

import windowMaxSvg from '@renderer/assets/svg/windowMax.svg?url';
import windowMinSvg from '@renderer/assets/svg/windowMin.svg?url';
import windowRegionSvg from '@renderer/assets/svg/windowRegion.svg?url';
import windowCloseSvg from '@renderer/assets/svg/windowClose.svg?url';

const isMaximized = ref(false);
window.electron.ipcRenderer.on(IPC_RENDER_WINDOW.WINDOW_STATUS, (_, d) => (isMaximized.value = d.data));

const maxWindow = () => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_MAX_SIZE);
const minWindow = () => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_MIN_SIZE);
const reductionWindow = () => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_REDUCTION);
const closeWindow = () => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_CLOSE);
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.widgetItem {
  width: calc($sMainCaptionBarHeight);
  height: $sMainCaptionBarHeight;
  @include appRegionNo;
}
</style>
