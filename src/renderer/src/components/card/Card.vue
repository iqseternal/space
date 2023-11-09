<template>
  <div class="card">
    <img :src="props.src" alt="">
  </div>
</template>

<script lang="ts" setup>
import { apiGet } from '@renderer/utils/request';
import { onMounted } from 'vue';

const props = defineProps({
  src: { type: String, default: 'https://www.toopic.cn/public/uploads/image/20200404/20200404182849_78999.jpg' }
});
</script>

<style lang="scss" scoped>

.card {
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    border-radius: 8px;
  }
}

</style>
