<template>
  <ASubMenu popupClassName="dropdown-sub-menu">
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
  </ASubMenu>
</template>

<script lang="ts" setup>





</script>

<style lang="scss" scoped>

</style>
