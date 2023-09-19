<template>
  <div class="widget">
    <img :src="props.src" alt="">
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  src: { type: String, required: true }
});
</script>

<style lang="scss" scoped>

.widget {

  &:hover {
    background-color: rgba(0, 0, 0, .1);
  }

  img {
    margin-top: 25%;
    margin-left: 25%;
    width: 50%;
    height: 50%;
    object-fit: contain;
  }
}
</style>
