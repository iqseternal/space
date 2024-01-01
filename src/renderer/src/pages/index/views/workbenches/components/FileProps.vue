<template>
  <div class="props-panel">
    <AForm labelAlign="left">
      <h5 class="mb-24">图纸</h5>
      <AFormItem label="图纸名称" name="name">
        <AInput v-model:value="data.name" @change="onChangeData" />
      </AFormItem>
      <ADivider />
      <AFormItem label="网格" name="grid">
        <t-switch v-model:value="options.grid" @change="onChangeOptions" />
      </AFormItem>
      <AFormItem label="网格大小" name="gridSize">
        <AInput v-model:value.number="options.gridSize" @change="onChangeOptions" />
      </AFormItem>
      <AFormItem label="网格角度" name="gridRotate">
        <AInput
          v-model:value.number="options.gridRotate"
          @change="onChangeOptions"
        />
      </AFormItem>
      <AFormItem label="网格颜色" name="gridColor">
        <AColorPicker
          v-model:value="options.gridColor"
          class="w-full"
          :showPrimaryColorPreview="false"
          format="CSS"
          :colorModes="['monochrome']"
          @change="onChangeOptions"
        />
      </AFormItem>

      <ADivider />

      <AFormItem label="标尺" name="rule">
        <ASwitch v-model:value="options.rule" @change="onChangeOptions" />
      </AFormItem>

      <ADivider />

      <AFormItem label="背景颜色" name="background">
        <AColorPicker
          v-model:value="data.background"
          class="w-full"
          :showPrimaryColorPreview="false"
          format="CSS"
          :colorModes="['monochrome']"
          @change="onChangeData"
        />
      </AFormItem>
      <AFormItem label="图元默认颜色" name="color">
        <AColorPicker
          v-model:value="data.color"
          class="w-full"
          :showPrimaryColorPreview="false"
          format="CSS"
          :colorModes="['monochrome']"
          @change="onChangeData"
        />
      </AFormItem>
    </AForm>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';

// 图纸数据
const data = reactive<any>({
  name: '',
  background: void 0,
  color: void 0,
});

// 画布选项
const options = reactive<any>({
  grid: false,
  gridSize: 10,
  gridRotate: void 0,
  gridColor: void 0,
  rule: true,
});

onMounted(() => {
  const d: any = meta2d.data();
  data.name = d.name || '';
  data.background = d.background;
  data.color = d.color;

  Object.assign(options, meta2d.getOptions());
});

const onChangeData = () => {
  Object.assign(meta2d.store.data, data);
  meta2d.store.patchFlagsBackground = true;
  meta2d.render();
};

const onChangeOptions = (value) => {
  options.opened = value;
  meta2d.setOptions(options);
  meta2d.store.patchFlagsTop = true;
  meta2d.store.patchFlagsBackground = true;
  meta2d.render();
};
</script>
<style lang="scss" scoped>
.props-panel {
  &:deep(.a-form) {
    .a-form__item {
      margin-bottom: 8px;
    }
    .a-form__label {
      padding-right: 8px;
    }

    .a-divider {
      margin: 12px 0;
    }

    .a-input--auto-width {
      width: 100%;
    }
  }
}
</style>
