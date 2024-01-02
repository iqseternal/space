<template>
  <div ref="f" class="app-page">
    <Toolbar />

    <Subfield class="h-full">
      <Graphics v-ResizeWidth="graphicsBindings" />
      <View />
      <PropertyBar />
    </Subfield>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, ref, getCurrentInstance, reactive } from 'vue';
import { PropertyBar, Toolbar, View, Graphics } from './workArea';
import { setupIndexDB } from '@renderer/indexedDB';
import { setupMeta2dView, setupMeta2dEvts } from '@renderer/meta';
import { vResizeWidth } from '@libs/directives';
import type { VResizeWidthBindings } from '@libs/directives';

import Subfield from '@components/Subfield';

const graphicsBindings: VResizeWidthBindings = reactive({
  width: 300,
  barClass: 'default-c'
});


onMounted(setupMeta2dEvts);
</script>

<style lang="scss">
.default-c {
  position: absolute;
  right: 0;
  height: 100%;
}
</style>

<style lang="scss" scoped>

.app-page {
  height: 100%;
  overflow: hidden;
  user-select: none;

  .designer {
    display: grid;
    grid-template-columns: 300px 1fr 301px;
    height: calc(100vh - 80px);
  }
}
</style>
