<template>
  <Subfield>
    <div />
    
    <Space :size="8" style="margin-right: 8px;">
      <Tooltip title="最小化" :mouseEnterDelay="CONFIG.VIEW.TOOLTIP_ENTER_TIME">
        <WidgetSvg :src="windowMinSvg" @click="minWindow" class="widgetItem" />
      </Tooltip>
      <Tooltip title="还原窗口" :mouseEnterDelay="CONFIG.VIEW.TOOLTIP_ENTER_TIME">
        <WidgetSvg v-if="!props.isPane" :src="windowRegionSvg" @click="reductionWindow" class="widgetItem" />
      </Tooltip>
      <Tooltip title="关闭" :mouseEnterDelay="CONFIG.VIEW.TOOLTIP_ENTER_TIME">
        <WidgetSvg :src="windowCloseSvg" @click="closeWindow" class="widgetItem"/>
      </Tooltip>
    </Space>
  </Subfield>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IPC_MAIN_WINDOW, IPC_RENDER_WINDOW } from '#/constants';
import { Space, Tooltip } from 'ant-design-vue';

import { windowCloseSvg, windowMaxSvg, windowMinSvg, windowRegionSvg } from '@renderer/assets';
import { CONFIG } from '#/constants';

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
