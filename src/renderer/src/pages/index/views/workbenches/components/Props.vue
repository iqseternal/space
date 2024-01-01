<template>
  <div class="app-props">
    <FileProps v-if="selections.mode === SelectionMode.File" />
    <PenProps v-else-if="selections.mode === SelectionMode.Pen" />
  </div>
</template>

<script lang="ts" setup>
import FileProps from './FileProps.vue';
import PenProps from './PenProps.vue';

import { useSelection, SelectionMode } from '../hooks/selections';

const { selections } = useSelection();
</script>
<style lang="scss" scoped>
.app-props {
  padding: 16px;
  border-left: 1px solid var(--color-border);
  z-index: 2;
  height: calc(100vh - 80px);
  overflow-y: auto;
}
</style>
