<template>
  <div class="props-panel">
    <AForm labelAlign="left">
      <h5 class="mb-24">图纸</h5>
      <AFormItem label="图纸名称" name="name">
        <AInput v-model="data.name" @change="onChangeData" />
      </AFormItem>
      <ADivider />
      <AFormItem label="网格" name="grid">
        <t-switch v-model="options.grid" @change="onChangeOptions" />
      </AFormItem>
      <AFormItem label="网格大小" name="gridSize">
        <AInput v-model.number="options.gridSize" @change="onChangeOptions" />
      </AFormItem>
      <AFormItem label="网格角度" name="gridRotate">
        <AInput
          v-model.number="options.gridRotate"
          @change="onChangeOptions"
        />
      </AFormItem>
      <AFormItem label="网格颜色" name="gridColor">
        <AColorPicker
          v-model="options.gridColor"
          class="w-full"
          :showPrimaryColorPreview="false"
          format="CSS"
          :colorModes="['monochrome']"
          @change="onChangeOptions"
        />
      </AFormItem>

      <ADivider />

      <AFormItem label="标尺" name="rule">
        <ASwitch v-model="options.rule" @change="onChangeOptions" />
      </AFormItem>

      <ADivider />

      <AFormItem label="背景颜色" name="background">
        <AColorPicker
          v-model="data.background"
          class="w-full"
          :showPrimaryColorPreview="false"
          format="CSS"
          :colorModes="['monochrome']"
          @change="onChangeData"
        />
      </AFormItem>
      <AFormItem label="图元默认颜色" name="color">
        <AColorPicker
          v-model="data.color"
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

const onChangeOptions = () => {
  meta2d.setOptions(options);
  meta2d.store.patchFlagsTop = true;
  meta2d.store.patchFlagsBackground = true;
  meta2d.render();
};
</script>
<style lang="postcss" scoped>
.props-panel {
  :deep(.t-form) {
    .t-form__item {
      margin-bottom: 8px;
    }
    .t-form__label {
      padding-right: 8px;
    }

    .t-divider {
      margin: 12px 0;
    }

    .t-input--auto-width {
      width: 100%;
    }
  }
}
</style>
