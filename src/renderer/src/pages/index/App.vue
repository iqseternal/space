<template>
  <div id="frame_app">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>

const f = () => {

}

const a = void 0;
</script>

<style lang="scss" scoped>
@import '@scss/var.scss';
@import '@scss/mixin.scss';

#frame_app {
  width: 100vw;
  height: 100vh;
  background-color: var(--s-main-frame-contain-color);
  @include overflow(hidden);
}
</style>
