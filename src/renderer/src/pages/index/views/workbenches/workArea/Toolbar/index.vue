<template>
  <div class="toolBar">
    <Widget title="撤销" :autoHover="false">
      <svg class="l-icon" aria-hidden="true">
        <use xlink:href="#l-undo" />
      </svg>
    </Widget>
    <Widget title="重做" :autoHover="false">
      <svg class="l-icon" aria-hidden="true">
        <use xlink:href="#l-redo" />
      </svg>
    </Widget>
    <Widget title="直线" :autoHover="false">
      <span :draggable="true">
        <IconFont type="LineOutlined" />
      </span>
    </Widget>
    <Widget title="文字" :autoHover="false">
      <span :draggable="true">
        <svg class="l-icon" aria-hidden="true">
          <use xlink:href="#l-text" />
        </svg>
      </span>
    </Widget>
    <Widget title="连线" :autoHover="false">
      <svg width="1em" height="1em" viewBox="0 0 1024 1024">
        <path
          d="M192 64a128 128 0 0 1 123.968 96H384a160 160 0 0 1 159.68 149.504L544 320v384a96 96 0 0 0 86.784 95.552L640 800h68.032a128 128 0 1 1 0 64.064L640 864a160 160 0 0 1-159.68-149.504L480 704V320a96 96 0 0 0-86.784-95.552L384 224l-68.032 0.064A128 128 0 1 1 192 64z m640 704a64 64 0 1 0 0 128 64 64 0 0 0 0-128zM192 128a64 64 0 1 0 0 128 64 64 0 0 0 0-128z"
          fill="currentColor"
        />
      </svg>
    </Widget>
    <DropdownMenu trigger="click">
      <a>
        <svg class="l-icon" aria-hidden="true">
          <use :xlink:href="lineTypes.find((item) => item.value === currentLineType)?.icon" />
        </svg>
      </a>

      <template #overlay>
        <template v-for="item in lineTypes" :key="item.value">
          <SingleMenu class="flex">
            <Widget :title="item.name" :autoHover="false">
              <span class="flex-grow" />
              <svg class="l-icon" aria-hidden="true">
                <use :xlink:href="item.icon" />
              </svg>
            </Widget>
          </SingleMenu>
        </template>
      </template>
    </DropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Pen, PenType, deepClone } from '@meta2d/core';
import { message } from 'ant-design-vue';
import { DropdownMenu, MenuDriver, ComboBoxMenu, SingleMenu } from '@components/DropdownMenu';
import Widget from '@components/Widget';
import IconFont from '@components/IconFont';

const lineTypes = reactive([
  { name: '曲线', icon: '#l-curve2', value: 'curve' },
  { name: '线段', icon: '#l-polyline', value: 'polyline' },
  { name: '直线', icon: '#l-line', value: 'line' },
  { name: '脑图曲线', icon: '#l-mind', value: 'mind' },
]);
const currentLineType = ref('curve');

</script>

<style lang="scss" scoped>

.toolBar {
  display: flex;
  height: var(--tool-bar-height);


  .l-icon {
    width: 30px;
    height: 30px;
  }
}

</style>
