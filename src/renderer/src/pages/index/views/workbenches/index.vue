<template>
  <div ref="f" class="h-full overflow user-select-none">
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
  width: 300
});


onMounted(setupMeta2dEvts);
</script>
