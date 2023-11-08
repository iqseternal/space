<template>
  <div class="compose">
    <Sidebar class="sidebar" />
    <Header class="header" />
    <DropdownMenu trigger="contextmenu">
      <main class="container">
        <RouterView />
      </main>

      <template #overlay>
        <SingleMenu>查看</SingleMenu>
        <SingleMenu>排序方式</SingleMenu>
        <SingleMenu @click="() => windowReload()">
          <template #icon><ReloadOutlined /></template>
          刷新
        </SingleMenu>
        <MenuDriver />
        <ComboBoxMenu title="窗口">
          <SingleMenu @click="() => windowMax()">
            最大化
          </SingleMenu>
          <SingleMenu @click="() => windowMin()">
            最小化
          </SingleMenu>
          <SingleMenu @click="() => windowClose()">
            关闭窗口
          </SingleMenu>
        </ComboBoxMenu>
        <MenuDriver />
        <SingleMenu>转到设置</SingleMenu>
      </template>
    </DropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { IPC_MAIN_WINDOW } from '#/constants';
import { DropdownMenu, MenuDriver, SingleMenu, ComboBoxMenu } from '@renderer/components/DropdownMenu';
import { UserOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import { windowReload, windowShow, windowRelaunch, windowMax, windowMin, windowClose } from '@renderer/actions';

import { windowMaxSvg, windowCloseSvg } from '@renderer/assets';

import Header from '@renderer/components/Header';
import Sidebar from './sidebar/index.vue';
import IconFont from '@renderer/components/IconFont';

onMounted(async () => {
  const target = await windowShow(true);
  if (!target.data) windowRelaunch();
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
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .header {
    width: calc(100% - var(--s-main-frame-sidebar-width));
    padding: var(--p) 0px;
    height: calc($sMainCaptionBarHeight + var(--p));
    min-height: $sMainCaptionBarHeight;
    position: absolute;
    top: 0px;
    left: var(--s-main-frame-sidebar-width);
  }

  main.container {
    padding: 0px 5px;
    width: calc(100% - calc(var(--s-main-frame-sidebar-width)));
    height: calc(100% - $sMainCaptionBarHeight);
    background-color: var(--s-main-frame-bg-darkness-color);
    position: absolute;
    top: calc($sMainCaptionBarHeight + var(--p));
    left: var(--s-main-frame-sidebar-width);
    @include beautifulBar(auto);
    @include overflow(hidden);
  }
}

</style>
