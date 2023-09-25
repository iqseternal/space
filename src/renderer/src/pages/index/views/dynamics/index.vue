<template>
  <button @click="disturb">打乱</button>
  <div v-AutoAnimate class="dynamics">
    <template v-for="item in list" :key="item">
      <span>{{ item }}</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Dayjs } from 'dayjs';
import { Calendar, Card, Badge, Tag, Space, Avatar } from 'ant-design-vue';

import { vAutoAnimate, useAutoAnimate } from '@formkit/auto-animate/vue';

import { shuffle } from 'lodash';

const [parent] = useAutoAnimate({ duration: 500 });

const list = ref<string[]>([]);

const disturb = () => list.value = shuffle(list.value);

onMounted(() => {
  let idx = 0;
  let timer = setInterval(() => {

    list.value.push('' + idx);

    idx ++;

    if (idx >= 20) clearInterval(timer);

  }, 400);
});
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";
.dynamics {



}
</style>
