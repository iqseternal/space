<template>
  <Form>
    <FormItem hasFeedback validateStatus="success">
      <RInput>
        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </RInput>

      <Input>
        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </Input>
    </FormItem>
    <FormItem>
      <InputPassword>
        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </InputPassword>
    </FormItem>
  </Form>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref } from 'vue';
import { Space, FormItem, Modal, Form, Input, InputPassword } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';


import RInput from '@renderer/components/RInput/RInput.vue';

</script>

<style lang="scss" scoped>

</style>
