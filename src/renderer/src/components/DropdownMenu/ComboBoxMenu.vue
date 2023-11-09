<template>
  <ASubMenu popupClassName="dropdown-sub-menu">
    <template #icon>
      <template v-if="$slots.icon">
        <slot name="icon"></slot>
      </template>
      <template v-else>
        <IconFont :type="props.icon" />
      </template>
    </template>

    <template v-for="name in Object.keys($slots).filter(name => name !== 'icon')" #[name]>
      <slot :name="name"></slot>
    </template>
  </ASubMenu>
</template>

<script lang="ts" setup>
import { UserOutlined, ReloadOutlined } from '@ant-design/icons-vue';

import IconFont from '../IconFont';

const props = defineProps({
  icon: { type: String as PropType<IconRealKey | `icon-${string}`>, default: 'icon-' }
})

</script>

<style lang="scss" scoped>

</style>
