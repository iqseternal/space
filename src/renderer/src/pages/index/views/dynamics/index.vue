<template>
  <ACard>
    <Subfield>
      <template #left>
        <AButton @click="disturb">打乱</AButton>
      </template>
      <template #center></template>
      <template #right>
        <ASpace v-AutoAnimate class="dynamics">
          <template v-for="item in list" :key="item">
            <span>{{ item }}</span>
          </template>
        </ASpace>
      </template>
    </Subfield>
  </ACard>
  <ACard>
    <div>`1`</div>
  </ACard>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Dayjs } from 'dayjs';
import { Calendar, Card, Badge, Tag, Space, Avatar, Button } from 'ant-design-vue';
import { shuffle } from 'lodash';
import { vAutoAnimate, useAutoAnimate } from '@formkit/auto-animate/vue';
import { Subfield } from '@renderer/components/Subfield';
import { copyText } from '@renderer/actions';
import { DropdownMenu, SingleMenu } from '@components/DropdownMenu';

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
