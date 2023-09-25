<template>
  <Subfield class="captionBar">
    <template #left><Slogan /></template>

    <template #center><Search /></template>

    <template #right><div class="placeholder" /><Control /></template>
  </Subfield>
</template>

<script lang="ts" setup>
import Subfield from '@renderer/components/Subfield/Subfield.vue';
import Slogan from './Slogan.vue';
import Search from './Search.vue';
import Control from './Control.vue';
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.captionBar {
  will-change: width;
  user-select: none;
  @include appRegion;
}

.placeholder { width: var(--s-main-frame-sidebar-width); }
</style>

