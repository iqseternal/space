
<template>
  <Header isPane isDialog />
  <RouterView />
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { IPC_RENDER_DIALOG_WINDOW } from '#/constants';
import Header from '@components/Header';

const router = useRouter();

window.electron.ipcRenderer.once(IPC_RENDER_DIALOG_WINDOW.DIALOG_TYPE, (e, type) => {
  router.replace({ name: type.data.toUpperCase() });
});
</script>
