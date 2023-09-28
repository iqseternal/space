<template>
  <SidebarItem class="indicator">
    <Logo />
  </SidebarItem>
</template>

<script lang="ts" setup>
import { Avatar, Space } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';
import SidebarItem from './SidebarItem.vue';

import Logo from '@renderer/components/Logo/Logo.vue';

</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.indicator {
  width: 100%;
  height: $sMainCaptionBarHeight;
  padding: 5px;

  @include appRegion;
}
</style>
