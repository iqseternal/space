<template>
  <Header class="header"></Header>

  <main class="main">
    <RouterView></RouterView>
  </main>

  <Footer class="footter"></Footer>
</template>

<script lang="ts" setup>
import Header from './header/index.vue';
import Footer from './fotter/index.vue';

</script>

<style lang="scss" scoped>

.header {
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
}

.main {
  margin-top: var(--header-height);
  height: calc(100vh - var(--header-height) - var(--footter-height) - 20px);
  // padding: 0 10px 20px 10px;
  overflow: hidden hidden;
}

.footter {
  position: fixed;
  bottom: 0;
  left: 0;
}

</style>
