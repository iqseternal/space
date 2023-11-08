<template>
  <Subfield class="captionBar">
    <Slogan v-if="props.isPane === false" />
    <Search v-if="props.isPane === false" />
    <Control :isPane="props.isPane" />
  </Subfield>
</template>

<script lang="ts" setup>
import { Subfield, SubfieldSpace } from '@renderer/components/Subfield';

import Slogan from './Slogan.vue';
import Search from './Search.vue';
import Control from './Control.vue';

const props = defineProps({
  isPane: { type: Boolean, default: false }
});

</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.captionBar {
  will-change: width;
  user-select: none;
  background-color: var(--s-main-frame-bg-normal-color);
  @include appRegion;
}
</style>

