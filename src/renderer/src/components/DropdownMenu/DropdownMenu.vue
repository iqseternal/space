<template>
  <ADropdown v-bind="$attrs" trigger="click" overlayClassName="dropdown-menu">
    <template v-for="name in Object.keys($slots)" #[name]>
      <template v-if="name === 'overlay'">
        <AMenu :triggerSubMenuAction="$attrs.trigger === 'click' ? 'click' : 'hover'" class="dropdown-menu-main">
          <slot :name="name"></slot>
        </AMenu>
      </template>
      <template v-else>
        <slot :name="name"></slot>
      </template>
    </template>
  </ADropdown>
</template>

<script lang="ts" setup>

</script>
