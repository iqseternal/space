<template>
  <div class="logo">
    <img :src="logoSvg" :alt="CONFIG.PROJECT" />
  </div>
</template>

<script lang="ts" setup>
import { CONFIG } from '#/constants';
import { logoSvg } from '@renderer/assets';
</script>

<style lang="scss" scoped>
.logo {
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
