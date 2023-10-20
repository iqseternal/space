<template>
  <LoginForm />
  <Subfield>
    <template #left><Checkbox v-model:checked="rememberMe">RememberMe</Checkbox></template>
    <template #right><div /><div /><a>忘记密码</a><div /></template>
  </Subfield>
  <Subfield style="margin-top: 18px;">
    <template #left><div /><RButton type="primary" @click="login">LoginNow</RButton><div /></template>
    <template #center><RButton @click="() => setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_REGISTER_STAGE)">CreateAccount</RButton><div /></template>
  </Subfield>
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
import { LoginForm } from '@renderer/components/LoginForm';
import { useStageInject, DEFINE_PROVIDE_PROP_KEYS } from './useStage';

import Subfield from '@renderer/components/Subfield/Subfield.vue';
import RInput from '@renderer/components/RInput/RInput.vue';
import RButton from '@renderer/components/RButton/RButton.vue';

const router = useRouter();
const [stage, setStage] = useStageInject();

const rememberMe = ref(true);

// const lastInput = ref() as Ref<{ $el: HTMLDivElement; }>;

const login = async () => {
  setStage(DEFINE_PROVIDE_PROP_KEYS.R_CPT_REQUEST_STAGE);

  apiPost(apiUrl.login, {
    data: {
      username: 'admin',
      password: '12345678'
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
}

useMousetrap('enter', () => login());
// onMounted(() => useMousetrap(lastInput.value.$el, 'enter', () => login()));
</script>

<style lang="scss" scoped>

</style>
