<template>
  <Space direction="vertical" :size="4">
    <Subfield>
      <div />
      <div>Hello</div>
      <div />
    </Subfield>

    <RegisterForm />
    <RButton @click="() => SetStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE)">Login</RButton>
  </Space>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref } from 'vue';
import { Space } from 'ant-design-vue';
import { Subfield, SubfieldCloumn } from '#/renderer/src/components/Subfield';
import { useStageInject, DEFINE_PROVIDE_PROP_KEYS } from './useStage';
import { RegisterForm, RegisterFormRef } from '@renderer/components/Login';

import RButton from '@renderer/components/RButton/RButton.vue';

const [stage, SetStage] = useStageInject();
</script>

<style lang="scss" scoped>

</style>
