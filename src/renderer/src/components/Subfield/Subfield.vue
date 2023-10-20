
<template>
  <div class="subfield" :style="{ flex: props.flex }">
    <template v-if="!$slots.left && !$slots.center && !$slots.right">
      <slot></slot>
    </template>
    <template v-else>
      <div v-if="$slots.left" class="left"><slot name="left"></slot></div>
      <div v-if="$slots.center" class="center"><slot name="center"></slot></div>
      <div v-if="$slots.right" class="right"><slot name="right"></slot></div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  flex: { type: Number, default: 1 }
})
</script>

<style lang="scss" scoped>
.subfield {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow: hidden;

  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    overflow: hidden;
  }
  .center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    overflow: hidden;
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    overflow: hidden;
  }
}
</style>
