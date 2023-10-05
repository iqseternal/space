<template>
  <Subfield>
    <template #left><div /></template>
    <template #right>
      <div />
      <Space :size="8" style="margin-right: 8px;">
        <WidgetSvg :src="windowMinSvg" @click="minWindow" class="widgetItem" />
        <WidgetSvg v-if="!props.isPane" :src="windowRegionSvg" @click="reductionWindow" class="widgetItem" />
        <WidgetSvg :src="windowCloseSvg" @click="closeWindow" class="widgetItem"/>
      </Space>
    </template>
  </Subfield>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IPC_MAIN_WINDOW, IPC_RENDER_WINDOW } from '#/constants';
import { Space } from 'ant-design-vue';

import { windowCloseSvg, windowMaxSvg, windowMinSvg, windowRegionSvg } from '@renderer/assets';

import Subfield from '@renderer/components/Subfield/Subfield.vue';
import WidgetSvg from './WidgetSvg.vue';

const props = defineProps({
  isPane: { type: Boolean, default: false }
});

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
