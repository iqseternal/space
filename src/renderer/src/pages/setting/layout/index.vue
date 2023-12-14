<template>
<div class="layout">
  <SiderNav />
  <div class="content">
    <Header isPane></Header>
    <RouterView></RouterView>
  </div>
</div>
</template>

<script lang="ts" setup>
import SiderNav from './siderNav.vue';
import { useMousetrap, useFadeIn } from '@renderer/hooks';
import {hotKeys} from '@renderer/actions';
import {windowReload} from '@renderer/actions';
import Header from '@renderer/components/Header';

useFadeIn(()=>{})
useMousetrap(hotKeys.reload.allKey, windowReload)

</script>


<style lang="scss" scoped>
.layout {
  display: flex;

  .content {
    flex: 1;
  }
}
</style>
