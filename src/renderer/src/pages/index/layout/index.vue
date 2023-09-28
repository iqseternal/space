
<template>
  <div class="compose">
    <Sidebar class="sidebar" />
    <Header class="header" />
    <main class="container"><RouterView /></main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

import Header from './header/index.vue';
import Sidebar from './sidebar/index.vue';

import { IPC_MAIN_WINDOW } from '#/constants';

onMounted(async () => {
  const target = await window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SHOW, true);
  if (!target.data) window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RELAUNCH);
})
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

div.compose {
  position: relative;
  width: 100%;
  height: 100%;

  --p: 5px; // 微调系数, 用于加宽顶部的 padding 值

  .sidebar {
    width: var(--s-main-frame-sidebar-width);
    height: calc(100%);
    @include positionLt(absolute, 0px, 0px);
  }

  .header {
    width: calc(100% - var(--s-main-frame-sidebar-width));
    padding: var(--p) 0px;
    height: calc($sMainCaptionBarHeight + var(--p));
    min-height: $sMainCaptionBarHeight;
    @include positionLt(absolute, 0px, var(--s-main-frame-sidebar-width));
  }

  main.container {
    padding: 0px 5px;
    width: calc(100% - calc(var(--s-main-frame-sidebar-width)));
    height: calc(100% - $sMainCaptionBarHeight);
    background-color: var(--s-main-frame-contain-color);
    @include positionTr(absolute, calc($sMainCaptionBarHeight + var(--p)), 0px);
    @include beautifulBar(auto);
    @include overflow(hidden);
  }
}

</style>
