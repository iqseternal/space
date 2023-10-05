<template>
  <Form>
    <FormItem hasFeedback validateStatus="success">
      <RInput>
        <template #topic>EmailAddress</template>
        <template #prefix><MailOutlined style="color: rgba(0, 0, 144, 0.25)" /></template>
      </RInput>
    </FormItem>
    <FormItem>
      <RInput type="password" ref="lastInput">
        <template #topic>Password</template>
        <template #prefix><LockOutlined style="color: rgba(0, 0, 144, 0.25)" /></template>
      </RInput>
    </FormItem>
  </Form>
  <Subfield>
    <template #left><div /><RButton @click="login">LoginNow</RButton><div /></template>
    <template #center><RButton>CreateAccount</RButton><div /></template>
  </Subfield>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Space, FormItem, Modal, Form, Input, InputPassword } from 'ant-design-vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { IPC_MAIN_WINDOW, CONFIG } from '#/constants';
import { useMousetrap } from '@renderer/hooks/useMousetrap';
import { apiPost, apiUrl } from '@renderer/api';

import Subfield from '@renderer/components/Subfield/Subfield.vue';
import RInput from '@renderer/components/RInput/RInput.vue';
import RButton from '@renderer/components/RButton/RButton.vue';

const router = useRouter();

const lastInput = ref() as Ref<{ $el: HTMLDivElement; }>;

const login = async () => {
  // 登录成功了
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SHOW, false).catch(() => {
    window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RELAUNCH);
  });

  router.push('/space/dynamics');
}

useMousetrap([
  (mousetrap) => mousetrap.bind(['enter'], () => { login(); })
]);
onMounted(() => {
  const mousetrap = useMousetrap(lastInput.value.$el);
  mousetrap.value.bind('enter', () => login());
});
</script>

<style lang="scss" scoped>

</style>
