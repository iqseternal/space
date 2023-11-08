<template>
  <Subfield>
    <div />
    <Space :size="8" style="margin-right: 8px;" class="control">
      <Widget title="打开开发者工具" icon="BugFilled" @click="openDevTool" class="widgetItem" />
      <Widget title="最小化" :src="windowMinSvg" @click="minWindow" class="widgetItem" />
      <template v-if="!props.isPane">
        <Widget title="还原窗口" :src="windowRegionSvg" @click="reductionWindow" class="widgetItem" />
      </template>
      <Widget title="关闭窗口" :src="windowCloseSvg" @click="closeWindow" class="widgetItem" />
    </Space>
  </Subfield>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IPC_DEV, IPC_MAIN_WINDOW, IPC_RENDER_WINDOW } from '#/constants';
import { Space, Tooltip } from 'ant-design-vue';
import { BugFilled } from '@ant-design/icons-vue';
import { windowCloseSvg, windowMaxSvg, windowMinSvg, windowRegionSvg } from '@renderer/assets';
import { CONFIG } from '#/constants';
import { useMousetrap } from '@renderer/hooks/useMousetrap';

import { windowMax, windowMin, windowClose, windowReduction, windowDevtool } from '@renderer/actions';

import Subfield from '@renderer/components/Subfield/Subfield.vue';
import Widget from '@renderer/components/Widget';

const props = defineProps({
  isPane: { type: Boolean, default: false }
});

const isMaximized = ref(false);
window.electron.ipcRenderer.on(IPC_RENDER_WINDOW.WINDOW_STATUS, (_, d) => (isMaximized.value = d.data));

const openDevTool = () => windowDevtool(true, { mode: 'detach' });
const maxWindow = () => windowMax();
const minWindow = () => windowMin();
const reductionWindow = () => windowReduction();
const closeWindow = () => windowClose();

useMousetrap(['ctrl+shift+i', 'command+shift+i'], () => openDevTool());
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.widgetItem {
  width: calc($sMainCaptionBarHeight);
  height: $sMainCaptionBarHeight;
  cursor: default;
  @include appRegionNo;
}
</style>
