<template>
  <div class="loginPage">
    <Header isPane />

    <Subfield style="margin-top: 40px;">
      <template #center>
        <div />
        <Space>
          <Logo style="display: inline-block;width: 40px;height: 40px;" />
          <BlendedText text="SPACE FOR YOUR PLATFORM" :distSpacing="4" style="display: inline-block;font-size: 40px;line-height: 40px;" />
        </Space>
        <div />
      </template>
    </Subfield>

    <Subfield style="margin-top: 20px;">
      <template #left>
        <div />
        <img alt="" :src="loginTakeFilePng" />
      </template>
      <template #right>
        <Space direction="vertical" :size="10">
          <div style="font-size: 40px;">Welcome Back :&rpar;</div>
          <div style="font-size: 14px;color: rgba(0, 0, 0, .6);max-width: 350px;">
            To keep connected us please login with your personal information by emial address and password.
          </div>
          <LoginForm />
        </Space>
      </template>
    </Subfield>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { onBeforeMount, onBeforeUnmount, onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Space, Input, Button, Form, FormItem, Modal, TabPane, Tabs, Card } from 'ant-design-vue';
import { IPC_MAIN_WINDOW, CONFIG } from '#/constants';
import { useMousetrap } from '@renderer/hooks/useMousetrap';
import { loginTakeFilePng } from '@renderer/assets';

import Subfield from '@renderer/components/Subfield/Subfield.vue';
import BlendedText from '@renderer/components/BlendedText/BlendedText.vue';

import Header from '@pages/index/layout/header/index.vue';
import Logo from '@renderer/components/Logo/Logo.vue';
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';
import RButton from '@renderer/components/RButton/RButton.vue';

onBeforeMount(async() => {
  const setSize = await window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SET_SIZE, 850, 550).catch(e => e);
  const setResizeable = await window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, false).catch(e => e);

  if (!setSize.data || !setResizeable.data) window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RELAUNCH);

  // 如果一切没有问题, 那么就准备就绪, 就可以展示页面了
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SET_POSITION, 'center');
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SHOW, true);
});

onBeforeUnmount(() => {
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, true);
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESET_CUSTOM_SIZE, 'mainWindow');
});
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.loginPage {
  width: 100vw;
  height: 100vh;
  background-color: var(--s-main-frame-contain-color);
}
</style>
