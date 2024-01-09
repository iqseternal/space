<template>
  <div class="props-panel">
    <AForm v-if="pen" labelAlign="left">
      <h5 class="mb-24">图元</h5>
      <AFormItem label="文本" name="text">
        <AInput v-model:value="pen.text" @change="changeValue('text')" />
      </AFormItem>
      <AFormItem label="颜色" name="color">
        <AcolorPicker
          v-model:value="pen.color"
          class="w-full"
          :showPrimaryColorPreview="false"
          format="CSS"
          :colorModes="['monochrome']"
          @change="changeValue('color')"
        />
      </AFormItem>
      <AFormItem label="背景" name="background">
        <AColorPicker
          v-model:value="pen.background"
          class="w-full"
          :showPrimaryColorPreview="false"
          format="CSS"
          :colorModes="['monochrome']"
          @change="changeValue('background')"
        />
      </AFormItem>
      <AFormItem label="线条" name="dash">
        <ASelect v-model:value="pen.dash" @change="changeValue('dash')">
          <ASelectOption :key="0" :value="0" label="实线"/>
          <ASelectOption :key="1" :value="1" label="虚线"/>
        </ASelect>
      </AFormItem>
      <AFormItem label="圆角" name="borderRadius">
        <AInputNumber
          v-model:value="pen.borderRadius"
          :min="0"
          :max="1"
          :step="0.01"
          @change="changeValue('borderRadius')"
        />
      </AFormItem>
      <AFormItem label="不透明度" name="globalAlpha">
        <ASlider
          v-model:value="pen.globalAlpha"
          :min="0"
          :max="1"
          :step="0.01"
          @change="changeValue('globalAlpha')"
        />
        <span class="ml-16" style="width: 50px; line-height: 30px">
          {{ pen.globalAlpha }}
        </span>
      </AFormItem>

      <ADivider />

      <AFormItem label="X" name="x">
        <AInputNumber v-model:value="rect.x" @change="changeRect('x')" />
      </AFormItem>
      <AFormItem label="Y" name="y">
        <AInputNumber v-model:value="rect.y" @change="changeRect('y')" />
      </AFormItem>
      <AFormItem label="宽" name="width">
        <AInputNumber v-model:value="rect.width" @change="changeRect('width')" />
      </AFormItem>
      <AFormItem label="高" name="height">
        <AInputNumber v-model:value="rect.height" @change="changeRect('height')" />
      </AFormItem>

      <ADivider />

      <AFormItem label="文字水平对齐" name="textAlign">
        <ASelect v-model:value="pen.textAlign" @change="changeValue('textAlign')">
          <ASelectOption key="left" value="left" label="左对齐"/>
          <ASelectOption key="center" value="center" label="居中"/>
          <ASelectOption key="right" value="right" label="右对齐"/>
        </ASelect>
      </AFormItem>
      <AFormItem label="文字垂直对齐" name="textBaseline">
        <ASelect
          v-model:value="pen.textBaseline"
          @change="changeValue('textBaseline')"
        >
          <ASelectOption key="top" value="top" label="顶部对齐"/>
          <ASelectOption key="middle" value="middle" label="居中"/>
          <ASelectOption key="bottom" value="bottom" label="底部对齐"/>
        </ASelect>
      </AFormItem>

      <ADivider />

      <ASpace>
        <AButton @click="top">置顶</AButton>
        <AButton @click="bottom">置底</AButton>
        <AButton @click="up">上一层</AButton>
        <AButton @click="down">下一层</AButton>
      </ASpace>
    </AForm>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useSelection } from '../hooks/selections';

const { selections } = useSelection();

const pen = ref<any>();
// 位置数据。当前版本位置需要动态计算获取
const rect = ref<any>();

onMounted(() => {
  getPen();
});

const getPen = () => {
  pen.value = selections.pen;
  if (pen.value.globalAlpha === void 0) {
    pen.value.globalAlpha = 1;
  }

  rect.value = meta2d.getPenRect(pen.value);
};

// 监听选中不同图元
// @ts-ignore
const watcher = watch(() => selections.pen.id, getPen);

const lineDashs = [void 0, [5, 5]];

const changeValue = (prop: string) => {
  const v: any = { id: pen.value.id };
  v[prop] = pen.value[prop];
  if (prop === 'dash') {
    v.lineDash = lineDashs[v[prop]];
  }
  meta2d.setValue(v, { render: true });
};

const changeRect = (prop: string) => {
  const v: any = { id: pen.value.id };
  v[prop] = rect.value[prop];
  meta2d.setValue(v, { render: true });
};

const top = () => {
  meta2d.top();
  meta2d.render();
};
const bottom = () => {
  meta2d.bottom();
  meta2d.render();
};
const up = () => {
  meta2d.up();
  meta2d.render();
};
const down = () => {
  meta2d.down();
  meta2d.render();
};

onUnmounted(() => {
  watcher();
});
</script>
<style lang="scss" scoped>
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

    .t-space {
      gap: 4px;
    }
  }
}
</style>
