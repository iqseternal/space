<template>
  <div ref="viewContainer" class="viewContainer" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { setupMeta2dView } from '@renderer/meta';

const viewContainer = ref<HTMLDivElement>();

onMounted(() => {
  if (!viewContainer.value) return;
  setupMeta2dView(viewContainer.value)
});
</script>

<style lang="scss" scoped>
@import '@scss/var.scss';

.viewContainer {
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>
