<template>
  <SubfieldCloumn class="sidebars">
    <template #top>
      <SidebarItem :src="''">
        <Avatar :size="18" style="background-color: #87d068">
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
      </SidebarItem>
    </template>
    <template #middle>
      <SidebarItem :src="''">
        <Avatar :size="18" style="background-color: #87d068">
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
      </SidebarItem>
    </template>
    <template #bottom>
      <SidebarItem :src="''">
        <Avatar :size="18" style="background-color: #87d068">
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
      </SidebarItem>
    </template>
  </SubfieldCloumn>

  <!-- <div class="sidebars">


    <template v-for="item in controls" :key="item.svg">
      <SidebarItem :src="item.svg" :class="route.path === item.path ? 'active' : ''" @click="() => router.push(item.path)" />
    </template>

    <SidebarItem :src="''">
      <Avatar :size="18" style="background-color: #87d068">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
    </SidebarItem>
  </div> -->
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { Avatar, Space } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';

import Subfield from '@renderer/components/Subfield/Subfield.vue';
import SubfieldCloumn from '@renderer/components/Subfield/SubfieldColumn.vue';
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

@import "@scss/mixin.scss";
@import "@scss/var.scss";

.sidebars {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  background-color: var(--s-main-frame-contain-active-color);
  user-select: none;

  .active {
    background-color: var(--s-main-frame-contain-color);

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
