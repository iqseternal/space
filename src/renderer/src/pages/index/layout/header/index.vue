<template>
  <Subfield class="captionBar">
    <template #left><Slogan v-if="props.isPane === false" /></template>
    <template #center><Search v-if="props.isPane === false" /></template>
    <template #right><Control :isPane="props.isPane" /></template>
  </Subfield>
</template>

<script lang="ts" setup>
import Subfield from '@renderer/components/Subfield/Subfield.vue';
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
  @include appRegion;
}
</style>

