<template>
  <Form>
    <FormItem hasFeedback validateStatus="success">
      <RInput>
        <template #topic>EmailAddress</template>
        <template #prefix><MailOutlined style="color: rgba(0, 0, 144, 0.25)" /></template>
      </RInput>
    </FormItem>

    <FormItem>
      <RInput type="password">
        <template #topic>Password</template>
        <template #prefix><LockOutlined style="color: rgba(0, 0, 144, 0.25)" /></template>
      </RInput>
    </FormItem>
  </Form>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref } from 'vue';
import { Space, FormItem, Modal, Form, Input, InputPassword } from 'ant-design-vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';


import RInput from '@renderer/components/RInput/RInput.vue';

</script>

<style lang="scss" scoped>

</style>
