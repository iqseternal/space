<template>
  <Subfield class="overflow-hidden">
    <div />
    <Subfield :gap="4" style="margin: 0 8px;justify-content: flex-end;" class="control overflow-hidden">
      <slot name="control" />
      <Widget title="打开开发者工具" icon="BugFilled" @click="() => openDevTool()" />
      <Widget title="悬浮" icon="PushpinOutlined" @click="() => {}" />
      <template v-if="!$props.isDialog">
        <Widget title="最小化" :src="windowMinSvg" @click="() => minWindow()" />
      </template>
      <template v-if="!props.isPane">
        <Widget title="还原窗口" :src="windowRegionSvg" @click="() => reductionWindow()" />
      </template>
      <Widget title="关闭窗口" :src="windowCloseSvg" @click="() => closeWindow()" />
    </Subfield>
  </Subfield>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IPC_DEV, IPC_MAIN_WINDOW, IPC_RENDER_WINDOW, CONFIG } from '#/constants';
import { windowCloseSvg, windowMaxSvg, windowMinSvg, windowRegionSvg } from '@renderer/assets';
import { useMousetrap } from '@renderer/hooks/useMousetrap';

import { windowMax, windowMin, windowClose, windowReduction, windowDevtool } from '@renderer/actions';

import Subfield from '@components/Subfield';
import Widget from '@components/Widget';

const props = defineProps({
  isPane: { type: Boolean, default: false },
  isDialog: { type: Boolean, default: false } // 弹窗, 警告类型
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
</style>
