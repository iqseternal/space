<template>
  <div class="compose">
    <Sidebar class="sidebar" />
    <Header class="header" />
    <DropdownMenu trigger="contextmenu">
      <main class="container">
        <RouterView />
      </main>

      <template #overlay>
        <SingleMenu mark="FolderViewOutlined" disabled>查看</SingleMenu>
        <SingleMenu disabled>排序方式</SingleMenu>
        <SingleMenu
          mark="CopyOutlined"
          :shortcut="hotKeys.copy.key"
          @click="() => copyText()"
          :disabled="!canCopyText()"
        >
          复制
        </SingleMenu>
        <SingleMenu shortcut="Ctrl+V">粘贴</SingleMenu>
        <SingleMenu mark="ReloadOutlined" shortcut="Ctrl+R" @click="() => windowReload()">重新加载</SingleMenu>
        <SingleMenu mark="BugOutlined" :shortcut="hotKeys.openDevTool.key" @click="() => windowDevtool(true, { mode: 'detach' })">
          打开开发者工具
        </SingleMenu>
        <MenuDriver />
        <ComboBoxMenu mark="WindowsOutlined" title="窗口">
          <SingleMenu mark="FullscreenOutlined" @click="() => windowMax()">最大化</SingleMenu>
          <SingleMenu mark="MinusOutlined" @click="() => windowMin()"> 最小化</SingleMenu>
          <SingleMenu @click="() => windowReduction()">还原窗口</SingleMenu>
          <SingleMenu mark="CloseOutlined" :shortcut="hotKeys.closeWindow.key" @click="() => windowClose()">
            关闭窗口
          </SingleMenu>
        </ComboBoxMenu>
        <MenuDriver />
        <SingleMenu mark="TrophyOutlined" disabled>转到设置</SingleMenu>
      </template>
    </DropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, onBeforeMount } from 'vue';
import { IPC_MAIN_WINDOW } from '#/constants';
import { DropdownMenu, MenuDriver, SingleMenu, ComboBoxMenu } from '@renderer/components/DropdownMenu';
import { UserOutlined, ReloadOutlined, BugOutlined } from '@ant-design/icons-vue';
import { hotKeys, windowReload, windowShow, windowRelaunch, windowMax, windowMin, windowClose, windowReduction, windowDevtool, copyText, windowResizeAble, windowResetCustomSize } from '@renderer/actions';
import { canCopyText } from '@libs/common';
import { windowMaxSvg, windowCloseSvg } from '@renderer/assets';

import { useMousetrap, useFadeIn } from '@renderer/hooks';

import Header from '@renderer/components/Header';
import Sidebar from './sidebar/index.vue';
import IconFont from '@components/IconFont';

useFadeIn(() => {
  windowResizeAble(true);
  windowResetCustomSize('mainWindow');
});

useMousetrap(hotKeys.reload.allKey, windowReload);
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
