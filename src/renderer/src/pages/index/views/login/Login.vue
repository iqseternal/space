<template>
  <ASpace direction="vertical" :size="4">
    <div style="font-size: 40px;">Welcome Back :&rpar;</div>
    <div style="font-size: 14px;color: rgba(0, 0, 0, .6);max-width: 350px;">
      To keep connected us please login with your personal information by emial address and password.
    </div>
    <LoginForm ref="loginForm" @finish="login" />
    <Subfield>
      <template #left>
        <div>
          <ACheckbox v-model:checked="rememberMe">RememberMe</ACheckbox>
          <span>(R)</span>
        </div>
      </template>
      <template #right>
        <div />
        <ASpace>
          <a @click="forgetPassword">忘记密码</a>
          <span>(F)</span>
        </ASpace>
        <div />
      </template>
    </Subfield>
    <Subfield style="margin-top: 18px;">
      <template #left><div /><RButton type="primary" @click="login">LoginNow</RButton><div /></template>
      <template #center><RButton @click="() => setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_REGISTER_STAGE)">CreateAccount</RButton><div /></template>
    </Subfield>
  </ASpace>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { Space, FormItem, Modal, Form, Input, InputPassword, notification, message, Checkbox, Radio } from 'ant-design-vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { IPC_MAIN_WINDOW, CONFIG } from '#/constants';
import { useMousetrap, useFadeOut } from '@renderer/hooks';
import { apiUrl, apiPost, loginReq } from '@renderer/api';
import type { LoginFormRef, FormValidateRefResult } from '@components/Login';
import { LoginForm } from '@components/Login';
import { useStageInject, DEFINE_PROVIDE_PROP_KEYS } from './useStage';
import { rsaEncrypt } from '@libs/crypt';
import { windowShow, windowRelaunch } from '@renderer/actions';
import { Subfield } from '@components/Subfield';

import RInput from '@components/RInput';
import RButton from '@components/RButton';

const router = useRouter();
const [stage, setStage] = useStageInject();

const rememberMe = ref(true);
const loginForm = ref<LoginFormRef>();

const forgetPassword = () => setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_FORGET_PASSWORD);

const login = async () => {
  /**
   * Example Account: username: admin
   *          password: 12345678
   */
  loginForm.value?.validate().then(() => {
    setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_REQUEST_STAGE);
    const { username, password } = loginForm.value?.form ?? {};
    loginReq({ username, password }).then(res => {
      setTimeout(async () => {
        if (stage.value !== DEFINE_PROVIDE_PROP_KEYS.R_CPT_REQUEST_STAGE) return;
        // 登录成功了
        useFadeOut(() => {
          router.replace('/space/dynamics');
        });
      }, 600);
    }).catch(err => {
      if (stage.value !== DEFINE_PROVIDE_PROP_KEYS.R_CPT_REQUEST_STAGE) return;
      message.error(err.descriptor);
      setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE);
    })
  }).catch((errMsg: FormValidateRefResult) => {
    message.error(errMsg.message);
  });
}

useMousetrap('enter', () => login());
useMousetrap('r', () => (rememberMe.value = !rememberMe.value));
useMousetrap('f', () => forgetPassword());

onMounted(() => loginForm.value?.lastInput.$el && useMousetrap(loginForm.value.lastInput.$el, 'enter', () => login()));
</script>
