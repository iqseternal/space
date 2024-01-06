<template>
  <div class="layout">
    <SiderNav />
    <div class="content">
      <Header isPane />
      <div class="main">
        <h1>{{ route.meta.crumbsTitle }}</h1>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMousetrap, useFadeIn } from '@renderer/hooks';
import { hotKeys, windowReload } from '@renderer/actions';
import { useRoute } from 'vue-router';
import Header from '@components/Header';
import SiderNav from './SiderNav.vue';


const route = useRoute();

useFadeIn(() => {

});

useMousetrap(hotKeys.reload.allKey, windowReload);
</script>

<style lang="scss" scoped>
.layout {
  display: flex;

  .content {
    flex: 1;

    .main {
      padding: 0px 20px;

      & > h1 {
        margin-bottom: 20px;
        font-size: 18px;
      }
    }
  }
}
</style>
