<template>
  <ADropdown v-model:open="open" v-bind="$attrs" :arrow="false" trigger="click" overlayClassName="dropdown-menu">
    <template v-for="name in Object.keys($slots)" #[name]>
      <template v-if="name === 'overlay'">
        <AMenu :key="name" :subMenuOpenDelay="0" triggerSubMenuAction="click" class="dropdown-menu-main">
          <slot :name="name" />
        </AMenu>
      </template>
      <template v-else>
        <slot :name="name" />
      </template>
    </template>
  </ADropdown>
</template>

<script lang="ts" setup>
import { ref, watchEffect, provide } from 'vue';
import { DROPDOWN_STATUS } from './declare';
import { useEventListener, useEventListenerForElement, useMousetrap } from '@renderer/hooks';

const open = ref(false);

provide(DROPDOWN_STATUS, open);

useEventListenerForElement(window as any, 'resize', () => {
  open.value = false;
});
</script>
