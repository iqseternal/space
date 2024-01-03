<template>
  <div class="h-full overflow user-select-none workbenches">
    <Toolbar />

    <div class="w-full flex-between viewContainer" style="flex-shrink: 0;">
      <Graphics v-ResizeWidth="graphicsBindings" />
      <View :width="viewWidth" />
      <PropertyBar v-ResizeWidth="propertyBindings" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, ref, getCurrentInstance, reactive, computed, watchEffect, watch } from 'vue';
import { PropertyBar, Toolbar, View, Graphics } from './workArea';
import { setupIndexDB } from '@renderer/indexedDB';
import { setupMeta2dView, setupMeta2dEvts, saveMeta2dData } from '@renderer/meta';
import { vResizeWidth } from '@libs/directives';
import type { VResizeWidthBindings } from '@libs/directives';
import Subfield from '@components/Subfield';

const graphicsBindings: VResizeWidthBindings = reactive({
  minWidth: 190,
  width: 300
});

const propertyBindings: VResizeWidthBindings = reactive({
  width: 300,
  direction: 'left'
});

const viewWidth = computed(() => graphicsBindings.width + propertyBindings.width);

onMounted(setupMeta2dEvts);
</script>

<style scoped>
.workbenches {
  --tool-bar-height: 40px;

  .viewContainer {
    height: calc(100% - var(--tool-bar-height));
  }
}
</style>
