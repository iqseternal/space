
<template>
  <div class="header">

    <div class="logo">
      <img src="~@renderer/assets/logo.png" alt="">
    </div>
    <div class="bar">
      <TiltButton :bg-color="route.path.startsWith('/space/dynamics') ? 'red' : 'black'" text="壁纸" @click="() => router.push('/space/dynamics')"></TiltButton>
      <TiltButton :bg-color="route.path.startsWith('/space/profile') ? 'red' : 'black'" text="我的" @click="() => router.push('/space/profile')"></TiltButton>
    </div>
    <div class="diy">

      <button @click="setting">配置</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';

import TiltButton from '@renderer/components/TiltButton';
import { ICP_WINDOW } from '#/constants';

const router = useRouter();
const route = useRoute();

const setting = () => {
  window.electron.ipcRenderer.invoke(ICP_WINDOW.OPEN_WINDOW);
}

</script>

<style lang="scss" scoped>

.header {
  --logo-width: 170px;

  width: 100%;
  height: var(--header-height);
  // box-shadow: 0px 1px 5px rgba(0, 0, 0, .3);
  position: relative;
  user-select: none;

  .logo {
    width: var(--logo-width);
    height: 100%;
    filter: drop-shadow(0 0 1px black);
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;

    img {
      height: 200%;
      object-fit: contain;
      transform: translateX(-5%) translateY(-25%);
    }
  }

  .bar {
    position: absolute;
    top: 0;
    left: var(--logo-width);
    width: calc(100% - var(--logo-width) - 20%);
    height: 100%;

    display: flex;
    justify-content: left;
    align-items: center;
  }

  .diy {
    position: absolute;
    right: 0;
    top: 0;
    width: 20%;
    height: 100%;
  }
}

</style>

