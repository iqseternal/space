<template>
  <div>
    <ATooltip :title="props.title" :mouseEnterDelay="props.mouseEnterDelay">
      <div class="widget" :class="props.className + ' ' + (props.autoHover  ? 'widget-hover' : '')" @click="() => emits('click')">
        <template v-if="$slots.default"><slot name="default" /></template>

        <template v-else-if="props.icon">
          <IconFont :type="props.icon" />
        </template>

        <template v-else>
          <img class="widgetImg" :src="props.src" alt="" />
        </template>
      </div>
    </ATooltip>
  </div>
</template>

<script lang="ts" setup>
import { Tooltip } from 'ant-design-vue';
import { CONFIG } from '#/constants';

import IconFont from '@renderer/components/IconFont';

const props = defineProps({
  src: { type: String },
  autoHover: { type: Boolean, default: true },
  icon: { type: String as PropType<IconRealKey | `icon-${string}`> },
  title: { type: String },
  mouseEnterDelay: { type: Number, default: CONFIG.VIEW.WIDGET_TOOLTIP_ENTER_TIME },
  className: { type: String, default: '' }
});
const emits = defineEmits(['click']);
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.widget {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc($sMainCaptionBarHeight);
  height: $sMainCaptionBarHeight;
  cursor: default;
  @include appRegionNo;

  img.widgetImg {
    width: 60%;
    height: 60%;
    object-fit: contain;
  }
}

.widget-hover {
  &:hover {
    background-color: rgba(0, 0, 0, .1);
  }
}
</style>
