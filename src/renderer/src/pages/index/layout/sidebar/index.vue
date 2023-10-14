<template>
  <SubfieldCloumn class="sidebars">
    <Indicator />
    <Navigation />
    <Personal />
  </SubfieldCloumn>
</template>

<script lang="ts" setup>
import SubfieldCloumn from '@renderer/components/Subfield/SubfieldColumn.vue';

import Indicator from './Indicator.vue';
import Navigation from './Navigation.vue';
import Personal from './Personal.vue';
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.sidebars {
  background-color: var(--s-main-frame-contain-active-color);
  user-select: none;
}
</style>
