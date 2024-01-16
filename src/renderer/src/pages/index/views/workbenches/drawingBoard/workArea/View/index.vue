<template>
  <AutoDropdownMenu :open="open" :menu="meta2dViewMenu" @openChange="openChange">
    <div ref="viewContainer" class="viewContainer" />
  </AutoDropdownMenu>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch, computed, watchEffect, nextTick, provide } from 'vue';
import { setupMeta2dView } from '@renderer/meta';
import { useDebounce } from '@renderer/hooks';
import { AutoDropdownMenu, setupDropdownOpenModel } from '@components/DropdownMenu';
import { meta2dViewMenu } from '@renderer/menus';
import { useSelection, SelectionMode } from '../../hooks/selections';

const props = defineProps({
  width: { type: [Number, String], default: () => '' }
});

const { selections } = useSelection();

const viewContainer = ref<HTMLDivElement>();
const open = setupDropdownOpenModel();

const openChange = (value: boolean) => {
  if (selections.mode === SelectionMode.File) {
    open.value = false;
    return;
  }
  open.value = value;
}

onMounted(() => {
  if (!viewContainer.value) return;
  setupMeta2dView(viewContainer.value);

  watch(() => props.width, useDebounce(() => {
    meta2d.resize();
  }, 40), {
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
