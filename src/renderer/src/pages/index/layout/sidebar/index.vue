<template>
  <div class="sidebars">
    <template v-for="item in controls" :key="item.svg">
      <SidebarItem :src="item.svg" :class="route.path === item.path ? 'active' : ''" @click="() => router.push(item.path)" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';

import SidebarItem from './SidebarItem.vue';

import terminalSvg from '@renderer/assets/svg/terminal.svg?url';
import dashboardSvg from '@renderer/assets/svg/dashboard.svg?url';
import settingSvg from '@renderer/assets/svg/setting.svg?url';

const router = useRouter(), route = useRoute();

const controls = [
  {
    svg: terminalSvg,
    path: '/space/dynamics'
  },
  {
    svg: dashboardSvg,
    path: '/space/dashboard'
  },
  {
    svg: settingSvg,
    path: '/space/profile'
  }
];


</script>

<style lang="scss" scoped>

.sidebars {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-end;
  background-color: var(--s-main-frame-background-color);
  user-select: none;

  .active {
    // color: var(--s-main-frame-active-color);
    background-color: var(--s-main-frame-contain-color);
    // filter: drop-shadow(#0000FF 0px 0px) contrast(2);

    --r-size: 20px;

    @mixin activeEle {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      width: var(--r-size);
      height: var(--r-size);
      background-size: contain;
    }

    &::before {
      top: calc(-1 * var(--r-size));
      background-image: radial-gradient(circle var(--r-size) at 0 0, transparent var(--r-size), var(--s-main-frame-contain-color) 50%);
      @include activeEle();
    }

    &::after {
      bottom: calc(-1 * var(--r-size));
      background-image: radial-gradient(circle var(--r-size) at 0 100%, transparent var(--r-size), var(--s-main-frame-contain-color) 50%);
      @include activeEle();
    }
  }
}

</style>
