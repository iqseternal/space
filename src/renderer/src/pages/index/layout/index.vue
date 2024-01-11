<template>
  <div class="compose">
    <Sidebar class="sidebar" />
    <Header class="header">
      <template #left>
        <Slogan>
          <template #center>
            <Subfield class="navMenu w-full" style="justify-content: flex-start;">
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
          <template #right>
            <Widget title="历史记录">
              <IconFont type="HistoryOutlined" />
            </Widget>
          </template>
        </Slogan>
      </template>
      <template #control>
        <Widget title="打开设置页面" icon="SettingOutlined" @click="() => openSettingPage()" />
      </template>
    </Header>
    <main class="container">
      <RouterView v-slot="{ Component }">
        <KeepAlive><component :is="Component" /></KeepAlive>
      </RouterView>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, onBeforeMount, ref, onErrorCaptured } from 'vue';
import { IPC_MAIN_WINDOW } from '#/constants';
import type { DropdownDataType } from '@components/DropdownMenu';
import { DropdownMenu, MenuDriver, SingleMenu, ComboBoxMenu, AutoDropdownMenu } from '@components/DropdownMenu';
import { UserOutlined, ReloadOutlined, BugOutlined } from '@ant-design/icons-vue';
import { hotKeys, windowReload, windowDevtool, copyText, pasteText, windowResizeAble, openSettingPage } from '@renderer/actions';
import { windowMaxSvg, windowCloseSvg } from '@renderer/assets';
import { canCopyText } from '@libs/common';
import { useMousetrap, useFadeIn } from '@renderer/hooks';
import { fileMenu, editMenu, helpMenu } from '@renderer/menus';

import { Header, Indicator, Slogan } from '@components/Header';
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
        flex-shrink: 0;
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
    padding: 4px 5px;
    width: calc(100% - var(--s-main-frame-sidebar-width));
    height: calc(100% - $sMainCaptionBarHeight - 2 * var(--p));
    background-color: var(--s-main-frame-bg-darkness-color);
    position: absolute;
    top: calc($sMainCaptionBarHeight + var(--p));
    left: var(--s-main-frame-sidebar-width);
    padding-top: var(--p);
    @include beautifulBar(auto);
    @include overflow;
  }
}
</style>
