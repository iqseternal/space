<template>
  <ASpace direction="vertical" :size="4">
    <Subfield>
      <div />
      <div>Hello</div>
      <div />
    </Subfield>

    <RegisterForm ref="registerForm" />
    <RButton @click="() => setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE)">Login</RButton>
    <RButton @click="register">Create</RButton>
  </ASpace>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, onMounted } from 'vue';
import { Space, message } from 'ant-design-vue';
import { Subfield } from '@renderer/components/Subfield';
import { useStageInject, DEFINE_PROVIDE_PROP_KEYS } from './useStage';
import type { RegisterFormRef, FormValidateRefResult } from '@renderer/components/Login';
import { RegisterForm } from '@renderer/components/Login';
import { apiPost, apiAuthPost, apiUrl, registerReq } from '#/renderer/src/api';
import { rsaEncrypt } from '@renderer/utils/crypt';

import RButton from '@renderer/components/RButton/RButton.vue';

const [stage, setStage] = useStageInject();

const registerForm = ref<RegisterFormRef>();

const register = () => {
  registerForm.value?.validate().then(res => {
    setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_REQUEST_STAGE);
    const { username, password, code }  = registerForm.value?.form ?? {};
    registerReq({ username, password, code }).then(res => {
      if (stage.value !== DEFINE_PROVIDE_PROP_KEYS.R_CPT_REQUEST_STAGE) return;
      setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE);
    }).catch(err => {
      if (stage.value !== DEFINE_PROVIDE_PROP_KEYS.R_CPT_REQUEST_STAGE) return;
      message.error(err.descriptor);
      setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_REGISTER_STAGE);
    });
  }).catch((err: FormValidateRefResult) => {
    message.error(err.message);
  })
}

onMounted(() => {
  register();
})

</script>

<style lang="scss" scoped>

</style>
