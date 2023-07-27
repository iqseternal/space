<template>
  <div class="list">
    <template v-for="item in props.list" :key="item">
      <Card class="card" :src="item"></Card>
    </template>
  </div>
</template>

<script lang="ts" setup>

import Card from './Card.vue';

const props = defineProps({
  list: { type: Array<string>, default: () => ([]) }
});

</script>

<style lang="scss" scoped>

.list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  .card {
    // width: 24%;
    width: 32%;
    max-width: 800px;
    min-width: 400px;
    aspect-ratio: 16 / 9;

    margin: 20px 10px 0 10px;

    // filter: drop-shadow(0 0 2px 12px gray);

    // box-shadow: 0px 0px 2px 2px gray;
  }
}

</style>
