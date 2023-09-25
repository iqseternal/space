
<template>
  <Space style="display: flex;flex-direction: column;" :size="14">
    <template v-for="item in controls" :key="item.svg">
      <SidebarItem :src="item.svg" @click="() => router.push(item.path)" />
    </template>
  </Space>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { Space } from 'ant-design-vue';

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
