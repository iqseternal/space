
<template>
  <div class="propsPanel">
    <AForm>
      <h5>图纸</h5>

      <RFormItem name="name">
        <RInput v-model:value="data.name">
          <template #prefix><IconFont type="PaperClipOutlined" /></template>
          <template #topic>图纸名称</template>
        </RInput>
      </RFormItem>
      <RFormItem>
        <ASwitch v-model:checked="data.grid" />
      </RFormItem>
    </AForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

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
