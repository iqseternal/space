<template>
  <div id="meta2d" />
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { setupMeta2dView } from '@renderer/meta';

onMounted(async () => {
  // @ts-ignore
  await setupMeta2dView();
})

onUnmounted(() => {
  meta2d.destroy();
});
</script>
<style lang="scss" scoped>
#meta2d {
  height: calc(100vh - 80px);
  z-index: 1;
}
</style>
