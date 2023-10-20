import { ref } from 'vue';
import type { FormItemProps } from 'ant-design-vue';
import type { RuleObject } from 'ant-design-vue/es/form/interface';
import { FormItem } from 'ant-design-vue';
import { isPromise } from '@suey/pkg-utils';


type ValidateStateMessage = 'success' | 'warning' | 'error' | 'validating' | '';

interface Result {
  status: Exclude<ValidateStateMessage, 'validating'>;
  message: string;
}

export function useValidate<T>(validateF: (value: T) => (Result | Promise<Result>)) {
  const validateStatus = ref<ValidateStateMessage>('');
  const validateMessage = ref<string>('');

  const validateFn = (rule: RuleObject, value: any): Promise<void> => {
    validateStatus.value = 'validating';
    const result = validateF(value);

    if (isPromise(result)) {
      return new Promise<void>((resolve, reject) => {
        (result as Promise<Result>).then(res => {
          validateMessage.value = res.message;
          validateStatus.value = res.status;
          resolve();
        }).catch(reject);
      })
    }

    validateMessage.value = (result as Result).message;
    validateStatus.value = (result as Result).status;
    return Promise.resolve();
  }


  return { validateStatus, validateMessage, validateFn }
}
