<template>
  <div class="compose">
    <Sidebar class="sidebar" />
    <Header class="header" />
    <DropdownMenu trigger="contextmenu">
      <main class="container">
        <RouterView />
      </main>

      <template #overlay>
        <SingleMenu icon="FolderViewOutlined">查看</SingleMenu>
        <SingleMenu>排序方式</SingleMenu>
        <SingleMenu icon="ReloadOutlined" shortcut="Ctrl+R" @click="() => windowReload()">
          重新加载
        </SingleMenu>
        <MenuDriver />
        <ComboBoxMenu icon="WindowsOutlined" title="窗口">
          <SingleMenu icon="FullscreenOutlined" @click="() => windowMax()">
            最大化
          </SingleMenu>
          <SingleMenu icon="MinusOutlined" @click="() => windowMin()">
            最小化
          </SingleMenu>
          <SingleMenu @click="() => windowReduction()">还原窗口</SingleMenu>
          <SingleMenu icon="CloseOutlined" shortcut="Alt+F4" @click="() => windowClose()">
            关闭窗口
          </SingleMenu>
        </ComboBoxMenu>
        <MenuDriver />
        <SingleMenu icon="TrophyOutlined">转到设置</SingleMenu>
      </template>
    </DropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { IPC_MAIN_WINDOW } from '#/constants';
import { DropdownMenu, MenuDriver, SingleMenu, ComboBoxMenu } from '@renderer/components/DropdownMenu';
import { UserOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import { windowReload, windowShow, windowRelaunch, windowMax, windowMin, windowClose, windowReduction } from '@renderer/actions';
import { windowMaxSvg, windowCloseSvg } from '@renderer/assets';

import { useMousetrap } from '@renderer/hooks/useMousetrap';

import Header from '@renderer/components/Header';
import Sidebar from './sidebar/index.vue';
import IconFont from '@renderer/components/IconFont';

onMounted(async () => {
  const target = await windowShow(true);
  if (!target.data) windowRelaunch();
});

useMousetrap('ctrl+r', windowReload);
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
    height: calc(100% - $sMainCaptionBarHeight - var(--p));
    position: absolute;
    top: calc($sMainCaptionBarHeight + var(--p));
    left: 0px;
  }

  .header {
    width: 100%;
    padding: var(--p) 0px;
    height: calc($sMainCaptionBarHeight + var(--p));
    min-height: $sMainCaptionBarHeight;
    position: absolute;
    top: 0px;
    left: 0px;
  }

  main.container {
    padding: 0px 5px;
    width: calc(100% - calc(var(--s-main-frame-sidebar-width)));
    height: calc(100% - $sMainCaptionBarHeight - 2 * var(--p));
    background-color: var(--s-main-frame-bg-darkness-color);
    position: absolute;
    top: calc($sMainCaptionBarHeight + var(--p));
    left: var(--s-main-frame-sidebar-width);
    padding-top: var(--p);
    @include beautifulBar(auto);
    @include overflow(hidden);
  }
}

</style>
