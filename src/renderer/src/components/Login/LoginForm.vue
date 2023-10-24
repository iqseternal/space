<template>
  <Form
    ref="antForm"
    :model="form"
  >
    <RFormItem name="username" hasFeedback :validateStatus="userVaStatus" :rules="{ validator: userVaFn }">
      <RInput v-model:value="form.username" placeholder="请输入用户名/邮箱" :maxlength="16">
        <template #prefix><MailOutlined style="color: rgba(0, 0, 144, 0.25)" /></template>
        <template #topic>User/Email</template>
      </RInput>
    </RFormItem>
    <RFormItem name="password" hasFeedback :validateStatus="pwdVaStatus" :rules="{ validator: pwdVaFn }">
      <RInput v-model:value="form.password" type="password" ref="lastInput" placeholder="请输入用户密码" :maxlength="16">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 144, 0.25)" /></template>
        <template #topic>Password</template>
      </RInput>
    </RFormItem>
  </Form>
</template>

<script lang="ts" setup>
import type { LoginFormRef, AntdVFormRef } from './declare.d';
import type { Ref } from 'vue';
import { ref, onMounted, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance } from 'ant-design-vue';
import { Space, FormItem, Modal, Form, Input, InputPassword, notification, message, Checkbox, Radio } from 'ant-design-vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { useMousetrap } from '@renderer/hooks/useMousetrap';
import { useValidate, useValidateRef } from '@renderer/hooks/useValidate';

import Subfield from '@renderer/components/Subfield/Subfield.vue';
import RInput from '@renderer/components/RInput/RInput.vue';
import RButton from '@renderer/components/RButton/RButton.vue';
import RFormItem from './RFormItem.vue';

const props = defineProps({
  autoFill: { type: Boolean, default: () => false }
});

const antForm = ref() as Ref<AntdVFormRef>;
const lastInput = ref() as Ref<LoginFormRef['lastInput']>;

const form = reactive({ username: '', password: '' });

const { validateMessage: userVaMessage, validateStatus: userVaStatus, validateFn: userVaFn } = useValidate((value: string) => {
  if (value === '') return { message: '请输入用户名', status: '' };
  if (/ /.test(value)) return { message: '不能含有空格', status: 'error' };
  if (value.length < 5) return { message: '用户名太短, 最少六位长度', status: 'error' };
  if (value.length > 16) return { message: '用户名最大长度16位', status: 'error' };
  if (/^[a-zA-Z0-9]{5,16}$/.test(value)) return { message: '', status: 'success' };
  return { message: '验证失败', status: 'error' };
});
const { validateMessage: pwdVaMessage, validateStatus: pwdVaStatus, validateFn: pwdVaFn } = useValidate((value: string) => {
  if (value === '') {
    if (form.username !== '')  return { message: '密码不能为空', status: 'error' };
    return { message: '请输入密码', status: '' }
  }
  if (/ /.test(value)) return { message: '不能含有空格', status: 'error' };
  if (value.length < 6) return { message: '最少6位', status: 'error' };
  if (value.length > 16) return { message: '最大16位', status: 'error' };

  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,16}$/) {
    // if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@#$%^&*]{8,16}$/.test(value)) return { message: '', status: 'success' };
    // return { message: '弱密码', status: 'warning' };
    return { message: '', status: 'success' };
  }
  return { message: '密码只能包含字母或者数字的组合', status: 'error' };
});

defineExpose<LoginFormRef>({
  form,
  lastInput: lastInput as unknown as LoginFormRef['lastInput'],
  validate: useValidateRef(form, {
    username: [userVaFn, userVaMessage],
    password: [pwdVaFn, pwdVaMessage]
  })
});
</script>

<style lang="scss" scoped>

</style>
