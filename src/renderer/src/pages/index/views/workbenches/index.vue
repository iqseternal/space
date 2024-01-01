<template>
  <div class="app-page">
    <ToolBar />

    <div class="designer">
      <Graphics />
      <View />
      <Props />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { PropertyBar } from './workArea';
import ToolBar from './components/ToolBar.vue';
import Graphics from './components/Graphics.vue';
import View from './components/View.vue';
import Props from './components/Props.vue';

let timer: any;
function save() {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    const data: any = meta2d.data();
    localStorage.setItem('meta2d', JSON.stringify(data));
    timer = void 0;
  }, 1000);
}

onMounted(() => {
  meta2d.on('scale', save);
  meta2d.on('add', save);
  meta2d.on('opened', save);
  meta2d.on('undo', save);
  meta2d.on('redo', save);
  meta2d.on('add', save);
  meta2d.on('delete', save);
  meta2d.on('rotatePens', save);
  meta2d.on('translatePens', save);
});
</script>

<style lang="scss" scoped>
.app-page {
  height: 100%;
  overflow: hidden;

  .designer {
    display: grid;
    grid-template-columns: 300px 1fr 301px;
    height: calc(100vh - 80px);
  }
}
</style>
