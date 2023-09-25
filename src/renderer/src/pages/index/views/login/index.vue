<template>
  <div class="loginPage">
    <Header isPane />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import { Space, Input, Button, Form, FormItem, Modal } from 'ant-design-vue';

import { IPC_MAIN_WINDOW } from '#/constants';
import { CONFIG } from '#/constants';

import Header from '@pages/index/layout/header/index.vue';

onBeforeMount(async() => {
  const setSize = await window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SET_SIZE, 700, 500);
  const setResizeable = await window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, false);

  if (!setSize.data || !setResizeable.data) window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RELAUNCH);
});

onBeforeUnmount(() => {
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, true);
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESET_CUSTOM_SIZE);
});
</script>

<style lang="scss" scoped>

.loginPage {
  width: 100vw;
  height: 100vh;

  background-image: url(https://ccdn.goodq.top/caches/0949e197e2481ff51826a8a6ab38f749/aHR0cHM6Ly81ZjExNDcxZmNhMjgzLnQ3NC5xaWZlaXllLmNvbS9xZnktY29udGVudC91cGxvYWRzLzIwMjAvMDcvYzlhMzFkYzUxMzY5ODJmOWUwOWIzNzZkNGIzMzY2YjYtNjAweDQ0MC05MC53ZWJw.webp);
  background-size: contain;
}

</style>
