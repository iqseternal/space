<template>
  <div ref="viewContainer" class="viewContainer" />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch, computed, watchEffect, nextTick, provide } from 'vue';
import { useDebounce } from '@renderer/hooks';
import { AutoDropdownMenu, setupDropdownOpenModel } from '@components/DropdownMenu';
import { meta2dViewMenu } from '@renderer/menus';
import { useSelection, SelectionMode, setupMeta2dView } from '@renderer/meta';

const props = defineProps({
  width: { type: [Number, String], default: () => '' }
});

const { selections } = useSelection();

const viewContainer = ref<HTMLDivElement>();

onMounted(() => {
  if (!viewContainer.value) return;
  setupMeta2dView(viewContainer.value);

  watch(() => props.width, useDebounce(() => {
    meta2d.resize();
  }, 30), {
    flush: 'sync'
  });
});

onBeforeUnmount(() => {
  meta2d.destroy();
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
