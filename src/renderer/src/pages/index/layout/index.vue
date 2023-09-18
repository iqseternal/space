
<template>
  <Header />
  <div class="compose">
    <Sidebar class="sidebar" />
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Header from './header/index.vue';
import Sidebar from './sidebar/index.vue';

</script>

<style lang="scss" scoped>
@import "../../../styles/mixin.scss";
@import "../../../styles/var.scss";

div.compose {
  position: relative;
  width: 100%;
  height: 100%;

  .sidebar {
    padding-top: 40px;
    padding-bottom: 10px;

    width: var(--s-main-frame-sidebar-width);
    height: 100%;

    @include positionLt(absolute, 0, 0);
  }

  main.container {
    width: calc(100% - var(--s-main-frame-sidebar-width));
    height: calc(100% - 8px);
    // padding-left: 10px;
    background-color: var(--s-main-frame-active-contain-color);
    border-top-left-radius: 8px;
    @include positionTr(absolute, 0, 0);
  }
}

</style>
