<template>
  <div class="sider-menu">
    <div class="person">
      <AAvatar src="https://www.antdv.com/assets/logo.1ef800a8.svg" :size="32" shape="square" />
      <div class="person-msg">
        <Ellipsis text="严旭" />
        <Ellipsis text="xun.yan@dbounce.com" />
      </div>
    </div>
    <AMenu v-model:selectedKeys="selectedKeys" class="a-menu" mode="vertical" :items="items" @select="handlePath" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { settingChild } from '../router/modules/childRoutes';
import type { MenuProps } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import Ellipsis from '@components/Ellipsis';

const routes: MenuProps['items'] = settingChild.children?.map((item) => {
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

  & > .person {
    padding: 10px;
    display: flex;
    align-items: center;

    & > div.person-msg {
      margin-left: 8px;
      overflow: hidden;
      width: calc(100% - 32px);
      display: flex;
      flex-direction: column;
      font-size: 12px;
    }
  }
}
</style>
