<template>
  <AModal
    v-bind="$attrs" destory-on-close
    :visible="props.visible" :title="props.title"
    :centered="props.centered"
    :bodyStyle="{ overflowY: 'auto', maxHeight: '600px' }"
    :cancelText="props.cancelText" :okText="props.okText"
    @ok="() => emits('ok')" @cancel="() => emits('cancel')"
  >
    <template v-if="$slots.closeIcon" #closeIcon>
      <slot name="closeIcon"></slot>
    </template>
    <slot></slot>
  </AModal>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue';
import { dragStretch } from './declare';

const MODAL = {
  MAX_WIDTH: 800,
  MIN_HEIGHT: 200
};

const props = defineProps({
  width: { type: [Number, String], default: 100 },
  minWidth: { type: [Number, String], default: 100 },
  height: { type: [Number, String], default: 100 },
  title: { type: String, default: '' },
  visible: { type: Boolean, default: false },
  confimLoading: { type: Boolean, default: false },
  centered: { type: Boolean, default: true },
  cancelText: { type: String, default: '取消' },
  okText: { type: String, default: '确定' }
});

const emits = defineEmits(['cancel', 'ok']);

const showHeight = computed(() => (props.height ? props.height : MODAL.MIN_HEIGHT));

const numberObserver = new MutationObserver(mutations => {
  mutations.forEach((item: MutationRecord) => {
    if (item.type === 'childList' &&
      (item?.previousSibling as any)?.className?.indexOf('ant-modal') >= 0 &&
      (item?.target as any)?.className?.indexOf('ant-modal-wrap') >= 0
    ) dragStretch(props.width, showHeight.value, true).catch(err => err);
  })
});

watch(() => props.visible, value => {
  if (value) {
    nextTick(() => {
      dragStretch(props.width, showHeight.value).catch(err => err);
    });
    numberObserver.observe(document.body, { subtree: true, childList: true });
  }
  else numberObserver.disconnect();
});
</script>
