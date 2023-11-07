<template>
  <Subfield direction="col" style="height: 100%;">
    <SubfieldSpace />
    <div style="max-width: 150px;">
      <Logo />
      <div class="bar">
        <div class="client" :style="{ width: 150 * (fake.progress) + 'px' }"></div>
      </div>
      <Subfield style="margin-top: 18px;">
        <template #center>
          <div />
          <Button type="link" @click="() => emits('cancel')">
            <template #icon>
              <CloseCircleTwoTone />
            </template>
          </Button>
          <div />
        </template>
      </Subfield>
    </div>
    <SubfieldSpace :size="2" />
  </Subfield>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue';
import { Space, Progress, ProgressProps, Button } from 'ant-design-vue';
import { DeleteOutlined, CloseCircleOutlined, CloseCircleFilled, CloseCircleTwoTone } from '@ant-design/icons-vue';
import { Subfield, SubfieldSpace } from '../Subfield';

import FakeProgress from 'fake-progress';
import Logo from '@renderer/components/Logo/Logo.vue';

const emits = defineEmits(['cancel']);

const fake = reactive(new FakeProgress({
  timeConstant: 6000,  // timeConstant相当于分母, 分母越大则加的越少
  autoStart: false // 自动开始
}));

onMounted(() => {
  fake.progress = 0;
  fake.start();
});

onBeforeUnmount(() => {
  fake.end();
});
</script>

<style lang="scss" scoped>
.bar {
  margin-top: 20px;
  width: 100%;
  border-radius: 6px;
  background-color: rgba(50, 50, 50, .1);
  overflow: hidden;

  .client {
    height: 6px;
    background-color: blue;
    transition: width 0.2s ease-out;
  }
}

</style>
