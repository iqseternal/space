<template>
  <input class="search">
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";

.search {
  width: 400px;
  height: 25px;
  border-radius: 4px;
  padding: 10px;
  border: unset;
  outline: unset;

  @include appRegionNo;

  &:focus {

  }
}

</style>
