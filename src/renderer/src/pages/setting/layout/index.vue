<template>
  <div class="layout">
    <SiderNav />
    <div class="content">
      <Header isPane />
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMousetrap, useFadeIn } from '@renderer/hooks';
import { hotKeys, windowReload } from '@renderer/actions';
import Header from '@renderer/components/Header';
import SiderNav from './SiderNav.vue';

useFadeIn(() => {

});

useMousetrap(hotKeys.reload.allKey, windowReload);
</script>

<style lang="scss" scoped>
.layout {
  display: flex;

  .content {
    flex: 1;
  }
}
</style>
