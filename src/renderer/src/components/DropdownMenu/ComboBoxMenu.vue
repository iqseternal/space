<template>
  <ASubMenu :popupClassName="'dropdown-sub-menu' + (isClose ? ' hidden' : '')">
    <template #icon>
      <template v-if="$slots.icon">
        <slot name="icon"></slot>
      </template>
      <template v-else>
        <IconFont :type="props.mark" />
      </template>
    </template>

    <template v-for="name in Object.keys($slots).filter(name => name !== 'icon')" #[name]>
      <slot :name="name"></slot>
    </template>
  </ASubMenu>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { inject, computed, watchEffect, watch } from 'vue';
import { UserOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import { DROPDOWN_STATUS } from './declare';

import IconFont from '../IconFont';

const props = defineProps({
  mark: { type: String as PropType<IconRealKey | `icon-${string}`>, default: 'icon-' }
})

const dropdownStatus = inject<Ref<boolean>>(DROPDOWN_STATUS);

const isClose = computed(() => dropdownStatus && dropdownStatus.value === false);
</script>
