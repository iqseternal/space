<template>
  <Card>
    <Subfield>
      <template #left>
        <Button @click="disturb">打乱</Button>
      </template>
      <template #center></template>
      <template #right>
        <Space v-AutoAnimate class="dynamics">
          <template v-for="item in list" :key="item">
            <span>{{ item }}</span>
          </template>
        </Space>
      </template>
    </Subfield>
  </Card>
  <Card>
    `1`
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Dayjs } from 'dayjs';
import { Calendar, Card, Badge, Tag, Space, Avatar, Button } from 'ant-design-vue';
import { shuffle } from 'lodash';
import { vAutoAnimate, useAutoAnimate } from '@formkit/auto-animate/vue';
import { Subfield, SubfieldCloumn } from '@renderer/components/Subfield';

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
