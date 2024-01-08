<template>
  <Modal v-bind="$attrs" :handleOk="handleOk">
    <AForm
      ref="formRef"
      :model="form"
      :rules="rules"
    >
      <AFormItem name="name" label="名称" required>
        <AInput v-model:value="form.name" />
      </AFormItem>
    </AForm>
  </Modal>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue';
import type { FormInstance, FormProps } from 'ant-design-vue';
import type { Response } from './api';
import { useModalEvt, useRules, useModalProps, not, and, or } from '@renderer/hooks';
import { message } from 'ant-design-vue';
import { validatorValidStr, validatorRealName, validatorNumberRange } from 'modules/validators';
import Modal from '@components/Modal';

const form = reactive<Response>({
  name: '',
  age: '',
  data: {
    s_addr: '',
    d_addr: ''
  }
});
const formRef = ref<FormInstance>();

const rules = useRules<Response>({
  name: {
    required: true,
    validator: [
      validatorValidStr, [
        validatorRealName, '请输入真实姓名'
      ]
    ]
  }
})

const handleOk: ModalEvtCallBack = (next) => {
  formRef.value?.validate().then(() => {

    next();
  }).catch(() => {

    message.error('请完成表单填写');
  })
}

useModalEvt<Response>({
  init: ({ sourceData, mode }) => {

  },
  reset: ({ sourceData, mode }) => {

  }
})
</script>
