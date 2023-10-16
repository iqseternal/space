<template>
  <div class="subfield-cloumn" :style="{ flex: props.flex }">
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>
      <div v-if="$slots.top" class="top"><slot name="top"></slot></div>
      <div v-if="$slots.middle" class="middle"><slot name="middle"></slot></div>
      <div v-if="$slots.bottom" class="bottom"><slot name="bottom"></slot></div>
    </template>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  flex: { type: Number, default: 1 }
})

</script>

<style lang="scss" scoped>

.subfield-cloumn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }

  .middle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }
}

</style>
