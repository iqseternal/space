<template>
  <AModal
    :open="props.visiable"
    title="?"
    @ok="ok"
    @cancel="cancel"
  >
    <AForm
      ref="formRef"
      :model="form"
      :rules="rules"
    >
      <AFormItem name="name" label="名称" required>
        <AInput v-model:value="form.name" />
      </AFormItem>
    </AForm>
  </AModal>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue';
import type { FormInstance, FormProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';

const props = defineProps({
  visiable: { type: Boolean, default: false },
  mode: { type: String, default: 'create' },
  sourceData: { type: Object, default: () => ({}) }
});

const emits = defineEmits(['ok', 'cancel']);

const form = reactive({
  name: '',
  age: ''
});
const formRef = ref<FormInstance>();

const rules: FormProps['rules'] = {
  name: {
    required: true,
    validator: (_, value) => new Promise((resolve, reject) => {
      if (!value || (value as string).trim() === '') return reject('请输入名称');
      return resolve();
    })
  }
}

const ok = () => {
  formRef.value?.validate().then(() => {


    emits('ok');
  }).catch(() => {

    message.error('请完成表单填写');
  })
}

const cancel = () => {
  emits('cancel');
}


watch(() => props.visiable, nv => {
  if (nv) {
    if (props.mode === 'create') {
      ///
    }
    else if (props.mode === 'edit') {
      ///
    }
  }
  else {
    form.name = '';
  }
})
</script>

<style lang="scss" scoped>

</style>
