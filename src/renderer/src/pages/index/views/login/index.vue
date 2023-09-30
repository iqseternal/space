<template>
  <div class="loginPage">
    <Header class="header" isPane />

    <Subfield style="margin-top: 40px;">
      <template #left>
        <div />
        <Space>
          <Logo style="display: inline-block;width: 40px;height: 40px;" />
          <div>SPACE</div>
        </Space>
        <div />
      </template>
      <template #center></template>
      <template #right></template>
    </Subfield>

    <Subfield style="margin-top: 40px;">
      <template #left>
        <!-- <Card hoverable> -->
          <!-- <template #cover> -->
            <div />
            <img alt="" :src="loginTakeFilePng" />
          <!-- </template> -->
        <!-- </Card> -->
      </template>
      <template #right>
        <div>
          <LoginForm />
          <Subfield>
            <template #left><Button @click="login">Login Now</Button></template>
            <template #right><div /><Button>Create Account</Button></template>
          </Subfield>
        </div>
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

import Subfield from '@renderer/components/Subfield/Subfield.vue';

import Header from '@pages/index/layout/header/index.vue';
import Logo from '@renderer/components/Logo/Logo.vue';
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

import loginTakeFilePng from '@renderer/assets/png/loginTakeFile.png?url';

const router = useRouter();

useMousetrap([
  (mousetrap) => mousetrap.bind(['enter'], () => { console.log(1); })
]);

onBeforeMount(async() => {
  const setSize = await window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SET_SIZE, 850, 550).catch(e => e);
  const setResizeable = await window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, false).catch(e => e);

  if (!setSize.data || !setResizeable.data) window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RELAUNCH);

  // 如果一切没有问题, 那么就准备就绪, 就可以展示页面了
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SHOW, true);
});

onBeforeUnmount(() => {
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, true);
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESET_CUSTOM_SIZE, 'mainWindow');
});

const login = async () => {
  // 登录成功了
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SHOW, false).catch(() => {
    window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RELAUNCH);
  });

  router.push('/space/dynamics');
}

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
