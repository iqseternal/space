
<template>
  <div class="propsPanel">
    <AForm>
      <h5>图纸</h5>

      <RFormItem name="name" label="图纸名称">
        <RInput v-model:value="data.name">
          <template #prefix><IconFont type="PaperClipOutlined" /></template>
          <template #topic>图纸名称</template>
        </RInput>
      </RFormItem>
      <RFormItem name="grid" label="网格">
        <ASwitch v-model:checked="data.grid" />
      </RFormItem>

      <RFormItem label="网格大小">
        <RInput />
      </RFormItem>
      <RFormItem label="网格角度">
        <RInput />
      </RFormItem>
      <RFormItem label="网格颜色">
        <RInput />
      </RFormItem>

      <ADivider />

      <RFormItem label="背景颜色">
        <RInput />
      </RFormItem>
    </AForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

import {  } from '@renderer/meta';

import RFormItem from '@components/RFormItem';
import RInput from '@components/RInput';
import IconFont from '@components/IconFont';

const data = reactive({
  name: '',
  grid: false
})


</script>

<style lang="scss" scoped>
@import '@scss/var.scss';

.propsPanel {





}
</style>
