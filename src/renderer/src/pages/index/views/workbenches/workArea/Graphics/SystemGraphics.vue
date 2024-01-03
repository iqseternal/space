<template>
  <div>
    <ACollapse :defaultExpandAll="true">
      <ACollapsePanel
        v-for="item in SYSYTEM_GRAPHIC_GROUPS"
        :key="item.name"
        :header="item.name"
      >
        <template v-for="elem in item.list" :key="elem.name">
          <div
            class="graphic"
            :draggable="true"
            @dragstart="dragStart($event, elem)"
            @click.prevent="dragStart($event, elem)"
          >
            <svg class="l-icon" aria-hidden="true">
              <use :xlink:href="'#' + elem.icon"/>
            </svg>
            <p :title="elem.name">{{ elem.name }}</p>
          </div>
        </template>
      </ACollapsePanel>
    </ACollapse>
  </div>
</template>

<script lang="ts" setup>
import { SYSYTEM_GRAPHIC_GROUPS } from '../../preset';

const dragStart = (e: any, elem: any) => {
  if (!elem) return;
  e.stopPropagation();

  // 拖拽事件
  if (e instanceof DragEvent) {
    // 设置拖拽数据
    e.dataTransfer?.setData('Meta2d', JSON.stringify(elem.data));
  } else {
    // 支持单击添加图元。平板模式
    meta2d.canvas.addCaches = [elem.data];
  }
};
</script>

<style lang="scss" scoped>

</style>
