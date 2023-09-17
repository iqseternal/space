
<template>
  <Header />
  <main class="container">
    <RouterView />
  </main>
</template>

<script lang="ts" setup>
import Header from './header/index.vue';


</script>

<style lang="scss" scoped>

@import "../../../styles/var.scss";


main.container {

  max-height: calc(100% - $sMainCaptionBarHeight);

  overflow-y: scroll;
}

</style>
