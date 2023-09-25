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
    margin-top: 20%;
    margin-left: 20%;
    width: 60%;
    height: 60%;
    object-fit: contain;
  }
}
</style>
