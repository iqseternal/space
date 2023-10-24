<template>
  <Space direction="vertical" :size="4">
    <div style="font-size: 40px;">Welcome Back :&rpar;</div>
    <div style="font-size: 14px;color: rgba(0, 0, 0, .6);max-width: 350px;">
      To keep connected us please login with your personal information by emial address and password.
    </div>
    <LoginForm ref="loginForm" />
    <Subfield>
      <template #left><Checkbox v-model:checked="rememberMe">RememberMe</Checkbox></template>
      <template #right><div /><div /><a @click="() => setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_FORGET_PASSWORD)">忘记密码</a><div /></template>
    </Subfield>
    <Subfield style="margin-top: 18px;">
      <template #left><div /><RButton type="primary" @click="login">LoginNow</RButton><div /></template>
      <template #center><RButton @click="() => setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_REGISTER_STAGE)">CreateAccount</RButton><div /></template>
    </Subfield>
  </Space>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Space, FormItem, Modal, Form, Input, InputPassword, notification, message, Checkbox, Radio } from 'ant-design-vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { IPC_MAIN_WINDOW, CONFIG } from '#/constants';
import { useMousetrap } from '@renderer/hooks/useMousetrap';
import { apiAuthPost, apiUrl, apiPost } from '@renderer/api';
import type { LoginFormRef, FormValidateRefResult } from '@renderer/components/Login';
import { LoginForm } from '@renderer/components/Login';
import { useStageInject, DEFINE_PROVIDE_PROP_KEYS } from './useStage';

import Subfield from '@renderer/components/Subfield/Subfield.vue';
import RInput from '@renderer/components/RInput/RInput.vue';
import RButton from '@renderer/components/RButton/RButton.vue';

const router = useRouter();
const [stage, setStage] = useStageInject();

const rememberMe = ref(true);

const loginForm = ref<LoginFormRef>();

const login = async () => {
  loginForm.value?.validate().then(() => {
    setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_REQUEST_STAGE);
    apiPost(apiUrl.login, {
      data: {
        username: loginForm.value?.form.username,
        password: loginForm.value?.form.password
      },
      timeout: 2000
    }).then(res => {
      setTimeout(() => {
        if (stage.value !== DEFINE_PROVIDE_PROP_KEYS.R_CPT_REQUEST_STAGE) return;

        // 登录成功了
        window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SHOW, false).catch(() => {
          window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RELAUNCH);
        });

        router.push('/space/dynamics');
      }, 600);
    }).catch(err => {
      if (stage.value !== DEFINE_PROVIDE_PROP_KEYS.R_CPT_REQUEST_STAGE) return;

      message.error(err.descriptor);
      setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE);
    });
  }).catch((errMsg: FormValidateRefResult) => {
    message.error(errMsg.message);
  });
}

useMousetrap('enter', () => login());
onMounted(() => loginForm.value?.lastInput.$el && useMousetrap(loginForm.value.lastInput.$el, 'enter', () => login()));
</script>

<style lang="scss" scoped>

</style>
