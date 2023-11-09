<template>
  <div class="subfield" :style="{ flex: props.flex, gap: typeof props.gap === 'number' ? props.gap + 'px' : props.gap, ...generatorStyle }">
    <template v-if="!$slots.left && !$slots.center && !$slots.right">
      <slot></slot>
    </template>
    <template v-else>
      <div v-if="$slots.left" class="left" :style="generatorStyle"><slot name="left"></slot></div>
      <div v-if="$slots.center" class="center" :style="generatorStyle"><slot name="center"></slot></div>
      <div v-if="$slots.right" class="right" :style="generatorStyle"><slot name="right"></slot></div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { computed } from 'vue';

const props = defineProps({
  flex: { type: Number, default: 1 },
  direction: { type: String as PropType<'row' | 'col'>, default: 'row' },
  gap: { type: [Number, String] as PropType<number | `${number}${'px' | 'rem' | 'em' | 'rpx' | 'vw' | 'vh'}`>, default: 0 }
});

const generatorStyle = computed<CSSProperties>(() => ({
  flexDirection: props.direction === 'row' ? 'row' : 'column'
}));

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
