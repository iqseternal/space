<template>
  <div ref="viewContainer" class="viewContainer" />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { setupMeta2dView } from '@renderer/meta';
import { useDebounceHook } from '@renderer/hooks';

const props = defineProps({
  width: { type: [Number, String], default: () => '' }
});

const viewContainer = ref<HTMLDivElement>();

onMounted(() => {
  if (!viewContainer.value) return;

  watch(() => props.width, useDebounceHook(() => {
    meta2d.resize();
  }, 40), {
    flush: 'sync'
  });

  setupMeta2dView(viewContainer.value);
});
</script>

<style lang="scss" scoped>
@import '@scss/var.scss';

.viewContainer {
  width: 100%;
  min-width: 200px;
  height: 100%;
  flex: 1;
  touch-action: none;
}
</style>
