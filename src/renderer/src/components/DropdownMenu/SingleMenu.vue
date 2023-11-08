<template>
  <AMenuItem v-bind="$attrs" class="dropdown-menu-single">
    <template #icon>
      <template v-if="$slots.icon">
        <slot name="icon"></slot>
      </template>
      <template v-else>
        <div />
      </template>
    </template>

    <template v-for="name in Object.keys($slots).filter(name => name !== 'icon')" #[name]>
      <slot :name="name"></slot>
    </template>
  </AMenuItem>
</template>

<script lang="ts" setup>

</script>
