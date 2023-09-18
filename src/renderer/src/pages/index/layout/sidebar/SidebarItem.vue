<template>
  <div class="sidebarItem">
    <div class="itemContainer">
      <img :src="props.src" alt="">
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  src: { type: String, required: true }
});

</script>

<style lang="scss" scoped>

.sidebarItem {
  --size: calc(var(--s-main-frame-sidebar-width) - 10px);
  position: relative;

  width: calc((100% - var(--size)) / 2 + var(--size));
  height: var(--size);

  // border-top-left-radius: 10px;
  // border-bottom-left-radius: 10px;

  border-radius: 10px 0 0 10px;
  // background-color: red;

  .itemContainer {
    width: calc(var(--size) - 12px);
    height: calc(var(--size) - 12px);
    position: absolute;
    top: 6px;
    left: 6px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
