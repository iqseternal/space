<template>
  <div class="sider-menu">
    <div class="flex-center" style="padding: 10px;">
      <AAvatar src="https://www.antdv.com/assets/logo.1ef800a8.svg" :size="32" shape="square" />
      <div class="overflow-x-hidden flex-col" style="align-items: unset;font-size: 12px;margin-left: 8px;">
        <Ellipsis text="1" />
        <Ellipsis text="xun.yan@dbounce.com" />
      </div>
    </div>
    <AMenu v-model:selectedKeys="selectedKeys" class="a-menu" mode="vertical" :items="items" @select="handlePath" />
  </div>
</template>

<script lang="ts" setup>
import type { MenuProps } from 'ant-design-vue';
import { ref } from 'vue';
import { settingChildrenRoutes } from '@pages/setting/router/modules';
import { useRouter, useRoute } from 'vue-router';
import Ellipsis from '@components/Ellipsis';
const routes: MenuProps['items'] = settingChildrenRoutes.map((item) => {
  return {
    key: item.meta?.fullpath ?? '',
    label: item.meta?.title,
    title: item.meta?.title,
  };
}) ?? [];
const router = useRouter();
const route = useRoute();
const items = ref(routes);
const selectedKeys = ref([route.meta.fullpath ?? '']);
const handlePath = ({ selectedKeys }: Parameters<Required<MenuProps>['onSelect']>[0]) => {
  router.push(selectedKeys[0] as string);
};
</script>


<style lang="scss" scoped>
@import '@scss/mixin.scss';
.sider-menu {
  width: 156px;
  height: 100vh;
  background: #f5f5f5;
  @include appRegion;
}
</style>
