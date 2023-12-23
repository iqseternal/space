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
import { useModalEvt, useRules } from '@renderer/hooks';
import { message } from 'ant-design-vue';
import Modal from '@components/Modal';

const form = reactive({
  name: '',
  age: ''
});
const formRef = ref<FormInstance>();

const rules = useRules<Response>({
  name: {
    required: true,
    validator: (_, value) => new Promise((resolve, reject) => {
      if (!value || (value as string).trim() === '') return reject('请输入名称');
      return resolve();
    })
  }
})

const handleOk: ModalEvtCallBack = (next) => {
  formRef.value?.validate().then(() => {

    next();
  }).catch(() => {

    message.error('请完成表单填写');
  })
}

useModalEvt({
  reset: ({ sourceData, mode }) => {

  },
  init: ({ sourceData }) => {

  }
})
</script>
