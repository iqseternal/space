<template>
  <SidebarItem class="indicator" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.HzuXCBqER6Bl3dzBzRN03QHaHa?w=115&h=128&c=7&r=0&o=5&pid=1.7">

  </SidebarItem>
</template>

<script lang="ts" setup>
import { Avatar, Space } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';
import SidebarItem from './SidebarItem.vue';


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
