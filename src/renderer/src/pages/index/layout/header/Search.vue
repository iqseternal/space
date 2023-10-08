<template>
  <input ref="searchInput" class="search" placeholder="搜索🔍(Command+Shift+K)">
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, onMounted } from 'vue';
import { useMousetrap } from '@renderer/hooks/useMousetrap';

const searchInput = ref() as Ref<HTMLInputElement>;

useMousetrap(['command+shift+k', 'ctrl+shift+k'], () => {
  searchInput.value.focus();
});
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.search {
  // width: 00px;
  // width: 100%;
  // max-width: 400px;
  width: calc((100vw - var(--s-main-frame-sidebar-width)) / 3);
  min-width: 200px;
  height: $sMainCaptionBarHeight - 8px;
  padding: 4px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  border: 0.5px solid rgba(0, 0, 0, .1);
  background-color: var(--s-main-frame-contain-active-color);

  @include appRegionNo;

  &::placeholder {
    color: rgba(0, 0, 0, .4);
  }
  &:focus {
    border: 0.5px solid rgba(10, 10, 10, .3);
    outline: unset;
  }
}

</style>
