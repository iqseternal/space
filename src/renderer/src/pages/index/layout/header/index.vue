<template>
  <div class="captionBar">
    <div class="close" @click="minWindow"></div>
    <div class="close" @click="maxWindow"></div>
    <div class="close" @click="reductionWindow"></div>
    <div class="close" @click="closeWindow"></div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';

import { IPC_WINDOW } from '#/constants';

const router = useRouter();
const route = useRoute();

const dblclickWindow = () => window.electron.ipcRenderer.invoke(IPC_WINDOW.WINDOW_DOUBLE_CLICK);
const maxWindow = () => window.electron.ipcRenderer.invoke(IPC_WINDOW.WINDOW_MAX_SIZE);
const minWindow = () => window.electron.ipcRenderer.invoke(IPC_WINDOW.WINDOW_MIN_SIZE);
const reductionWindow = () => window.electron.ipcRenderer.invoke(IPC_WINDOW.WINDOW_REDUCTION);
const closeWindow = () => window.electron.ipcRenderer.invoke(IPC_WINDOW.WINDOW_CLOSE);
</script>

<style lang="scss" scoped>
@import "../../../../styles/mixin.scss";
@import "../../../../styles/var.scss";

.captionBar {
  width: 100%;
  height: $sMainCaptionBarHeight;
  background-color: rgba(255, 0, 0, .2);
  gap: 5px;
  @include appRegion;
  @include displayFlex(right);

  .close {
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 10px;
    @include appRegionNo;
  }
}

</style>

