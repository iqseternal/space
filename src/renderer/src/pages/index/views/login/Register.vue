<template>
  <div>
    <RButton @click="() => SetStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE)">Login</RButton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Space } from 'ant-design-vue';
import { Subfield, SubfieldCloumn } from '#/renderer/src/components/Subfield';
import { useStageInject, DEFINE_PROVIDE_PROP_KEYS } from './useStage';

import RButton from '@renderer/components/RButton/RButton.vue';

const [stage, SetStage] = useStageInject();
</script>

<style lang="scss" scoped>

</style>
