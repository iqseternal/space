<template>
  <div class="compose">
    <Sidebar class="sidebar" />
    <Header class="header">
      <template #left>
        <Indicator />
        <Subfield class="navMenu" style="justify-content: flex-start;">
          <AutoDropdownMenu :menu="fileMenu" trigger="click">
            <span class="navItemTitle">文件</span>
          </AutoDropdownMenu>
          <AutoDropdownMenu :menu="editMenu" trigger="click">
            <span class="navItemTitle">编辑</span>
          </AutoDropdownMenu>
          <AutoDropdownMenu :menu="helpMenu" trigger="click">
            <span class="navItemTitle">帮助</span>
          </AutoDropdownMenu>
        </Subfield>
      </template>
      <template #control>
        <!-- <Widget title="打开设置页面" icon="DingtalkCircleFilled" /> -->
      </template>
    </Header>
    <!-- <AFloatButton /> -->
    <main class="container">
      <RouterView v-slot="{ Component }">
        <KeepAlive><component :is="Component" /></KeepAlive>
      </RouterView>
    </main>

    <!-- <DropdownMenu trigger="contextmenu">
      <main class="container">
        <KeepAlive>
          <RouterView />
        </KeepAlive>
      </main>

      <template #overlay>
        <SingleMenu mark="FolderViewOutlined" disabled>查看</SingleMenu>
        <SingleMenu disabled>排序方式</SingleMenu>
        <SingleMenu mark="CopyOutlined" :shortcut="hotKeys.copy.key" :disabled="!canCopyText()" @click="() => copyText()">
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
    </DropdownMenu> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, onBeforeMount, ref } from 'vue';
import { IPC_MAIN_WINDOW } from '#/constants';
import type { DropdownDataType } from '@components/DropdownMenu';
import { DropdownMenu, MenuDriver, SingleMenu, ComboBoxMenu, AutoDropdownMenu } from '@components/DropdownMenu';
import { UserOutlined, ReloadOutlined, BugOutlined } from '@ant-design/icons-vue';
import { hotKeys, windowReload, windowShow, windowRelaunch, windowMax, windowMin, windowClose, windowReduction, windowDevtool, copyText, pasteText, windowResetCustomSize, windowResizeAble } from '@renderer/actions';
import { windowMaxSvg, windowCloseSvg } from '@renderer/assets';
import { canCopyText } from '@libs/common';
import { useMousetrap, useFadeIn } from '@renderer/hooks';
import { fileMenu, editMenu, helpMenu } from '@renderer/menus';

import { Header, Indicator } from '@components/Header';
import Sidebar from './sidebar/index.vue';
import IconFont from '@components/IconFont';
import Widget from '@components/Widget';
import Subfield from '@components/Subfield';

useFadeIn(() => {
  windowResizeAble(true);
  // windowResetCustomSize('mainWindow');
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
    user-select: none;

    .navMenu {
      color: rgba(0, 0, 0, .6);
      height: 100%;
      font-size: 12px;
      transition: all .5s linear;

      .navItemTitle {
        display: inline-block;
        height: $sMainCaptionBarHeight;
        line-height: calc($sMainCaptionBarHeight - 8px);
        padding: 4px 8px;
        text-align: center;
        font-size: 12px;
        @include appRegionNo;

        &:hover {
          background-color: rgba(0, 0, 0, .05);
        }
      }
    }
  }

  main.container {
    padding: 0px 5px;
    width: calc(100% - var(--s-main-frame-sidebar-width));
    /* width: calc(100%); */
    height: calc(100% - $sMainCaptionBarHeight - 2 * var(--p));
    background-color: var(--s-main-frame-bg-darkness-color);
    position: absolute;
    top: calc($sMainCaptionBarHeight + var(--p));
    /* left: 0; */
    left: var(--s-main-frame-sidebar-width);
    padding-top: var(--p);
    @include beautifulBar(auto);
    @include overflow;
  }
}
</style>
