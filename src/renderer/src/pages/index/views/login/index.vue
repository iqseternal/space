<template>
  <div class="loginPage">
    <Header class="header" isPane />
    <Button @click="login">进入页面</Button>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { onBeforeMount, onBeforeUnmount, onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Space, Input, Button, Form, FormItem, Modal } from 'ant-design-vue';

import { IPC_MAIN_WINDOW, CONFIG } from '#/constants';

import Header from '@pages/index/layout/header/index.vue';
import Logo from '@renderer/components/Logo/Logo.vue';

const router = useRouter();

onBeforeMount(async() => {
  const setSize = await window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SET_SIZE, 500, 500).catch(e => e);
  const setResizeable = await window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, false).catch(e => e);

  if (!setSize.data || !setResizeable.data) window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RELAUNCH);
});

onBeforeUnmount(() => {
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, true);
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESET_CUSTOM_SIZE, 'mainWindow');
});

const login = async () => {
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

  background-color: rgba(0, 255, 0, .2);

  // background-color: var(--s-main-frame-contain-active-color);
  // background-image: url('https://ccdn.goodq.top/caches/0949e197e2481ff51826a8a6ab38f749/aHR0cHM6Ly81ZjExNDcxZmNhMjgzLnQ3NC5xaWZlaXllLmNvbS9xZnktY29udGVudC91cGxvYWRzLzIwMjAvMDcvMjFmNzA2NjNkYzUxNWNjY2FhODEyNGNlOGExOWEzZWItMTAyNHg2MDAtOTAud2VicA_p_p100_p_3D_p_p100_p_3D.webp');
  // background-repeat: no-repeat;
  // background-size: cover;

  .header {
    // background-color: var(--s-main-frame-contain-color);
  }
}

</style>
