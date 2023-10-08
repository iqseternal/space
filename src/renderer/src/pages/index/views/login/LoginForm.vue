<template>
  <Form>
    <FormItem hasFeedback validateStatus="success" required>
      <RInput placeholder="请输入用户名/邮箱">
        <template #topic>User/Email</template>
        <template #prefix><MailOutlined style="color: rgba(0, 0, 144, 0.25)" /></template>
      </RInput>
    </FormItem>
    <FormItem required>
      <RInput type="password" ref="lastInput" placeholder="请输入用户密码">
        <template #topic>Password</template>
        <template #prefix><LockOutlined style="color: rgba(0, 0, 144, 0.25)" /></template>
      </RInput>
    </FormItem>
  </Form>
  <Subfield>
    <template #left><div /><RButton type="primary" @click="login">LoginNow</RButton><div /></template>
    <template #center><RButton>CreateAccount</RButton><div /></template>
  </Subfield>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Space, FormItem, Modal, Form, Input, InputPassword, notification, message } from 'ant-design-vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { IPC_MAIN_WINDOW, CONFIG } from '#/constants';
import { useMousetrap } from '@renderer/hooks/useMousetrap';
import { apiAuthPost, apiUrl } from '@renderer/api';

import Subfield from '@renderer/components/Subfield/Subfield.vue';
import RInput from '@renderer/components/RInput/RInput.vue';
import RButton from '@renderer/components/RButton/RButton.vue';

const router = useRouter();

const lastInput = ref() as Ref<{ $el: HTMLDivElement; }>;

const login = async () => {
  apiAuthPost(apiUrl.login, {
    username: 'admin',
    password: '12345678'
  }).then(res => {
    // 登录成功了
    window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SHOW, false).catch(() => {
      window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RELAUNCH);
    });
    router.push('/space/dynamics');
  }).catch(err => {
    message.error(err.descriptor);
  });
}

useMousetrap('enter', () => login());
onMounted(() => useMousetrap(lastInput.value.$el, 'enter', () => login()));
</script>

<style lang="scss" scoped>

</style>
