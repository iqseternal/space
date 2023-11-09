<template>
  <AMenuItem v-bind="$attrs" class="dropdown-menu-single">
    <template #icon>
      <template v-if="$slots.icon">
        <slot name="icon"></slot>
      </template>
      <template v-else>
        <IconFont :type="props.icon"></IconFont>
      </template>
    </template>

    <template #default>
      <Subfield gap="15px">
        <slot name="default"></slot>

        <span style="min-width: 50px;text-align: right;">{{ props.shortcut }}</span>
      </Subfield>
    </template>

    <template v-for="name in Object.keys($slots).filter(slotName => !['default', 'icon'].includes(slotName))" #[name]>
      <slot :name="name"></slot>
    </template>
  </AMenuItem>
</template>

<script lang="ts" setup>
import { Subfield } from '@components/Subfield';

import IconFont from '../IconFont';

const props = defineProps({
  icon: { type: String as PropType<IconRealKey | `icon-${string}`>, default: 'icon-' },
  shortcut: { type: String, default: '' }
});

</script>
