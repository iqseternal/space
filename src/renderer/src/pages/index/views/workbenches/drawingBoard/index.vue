<template>
  <div class="h-full overflow user-select-none workbenches">
    <Toolbar />

    <div class="w-full flex-between overflow-hidden viewContainer">
      <Graphics v-ResizeWidth="graphicsBindings" />
      <View :width="viewWidth" />
      <PropertyBar v-ResizeWidth="propertyBindings" />
    </div>

    <AFloatButtonGroup trigger="click" type="primary" :style="{ right: '24px' }">
      <template #icon>
        <IconFont type="CustomerServiceOutlined" />
      </template>

      <AFloatButton />
    </AFloatButtonGroup>
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
import IconFont from '@components/IconFont';

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

<style lang="scss" scoped>
.workbenches {
  --tool-bar-height: 40px;
  --tool-bar-size: calc(var(--tool-bar-height) * 0.6);
  --tool-bar-widget-padding: 4px;
  --tool-bar-gap: 4px;
  --tool-bar-margin: 4px;

  .viewContainer {
    margin-top: var(--tool-bar-margin);
    height: calc(100% - var(--tool-bar-height) - var(--tool-bar-margin));
  }
}
</style>
