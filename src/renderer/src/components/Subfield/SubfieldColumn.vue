<template>
  <div class="subfield-cloumn">
    <div v-if="slots.top" class="top"><slot name="top"></slot></div>
    <div v-if="slots.middle" class="middle"><slot name="middle"></slot></div>
    <div v-if="slots.bottom" class="bottom"><slot name="bottom"></slot></div>
  </div>
</template>

<script lang="ts" setup>
import type { Component } from 'vue';

const slots = defineSlots<{
  top?: () => Component;
  middle?: () => Component;
  bottom?: () => Component;
}>();
</script>

<style lang="scss" scoped>

.subfield-cloumn {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;

  .top {
    display: flex;
    flex-direction: column;
  }

  .middle {
    display: flex;
    flex-direction: column;
  }

  .bottom {
    display: flex;
    flex-direction: column;
  }
}

</style>
