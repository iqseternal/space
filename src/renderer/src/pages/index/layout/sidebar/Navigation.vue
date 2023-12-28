
<template>
  <ASpace style="display: flex;flex-direction: column;" :size="14">
    <template v-for="item in controls" :key="item.svg">
      <SidebarItem :src="item.svg" @click="() => router.push(item.path)" />
    </template>
  </ASpace>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { Space } from 'ant-design-vue';
import { terminalSvg, dashboardSvg, settingSvg } from '@renderer/assets';

import SidebarItem from '@renderer/components/SidebarItem';

const router = useRouter(), route = useRoute();

const controls = [
  {
    svg: terminalSvg,
    path: '/space/workbenches'
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
