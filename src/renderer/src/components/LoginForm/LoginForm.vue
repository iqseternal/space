<template>
  <Form>
    <RFormItem hasFeedback validateStatus="success" required>
      <RInput placeholder="请输入用户名/邮箱">
        <template #prefix><MailOutlined style="color: rgba(0, 0, 144, 0.25)" /></template>
        <template #topic>User/Email</template>
      </RInput>
    </RFormItem>
    <RFormItem required validateStatus="success">
      <RInput type="password" ref="lastInput" placeholder="请输入用户密码">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 144, 0.25)" /></template>
        <template #topic>Password</template>
      </RInput>
    </RFormItem>
  </Form>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Space, FormItem, Modal, Form, Input, InputPassword, notification, message, Checkbox, Radio } from 'ant-design-vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { useMousetrap } from '@renderer/hooks/useMousetrap';

import RFormItem from './RFormItem.vue';

import Subfield from '@renderer/components/Subfield/Subfield.vue';
import RInput from '@renderer/components/RInput/RInput.vue';
import RButton from '@renderer/components/RButton/RButton.vue';

const lastInput = ref() as Ref<{ $el: HTMLDivElement; }>;
</script>

<style lang="scss" scoped>

</style>
