

import type { FormProps } from 'ant-design-vue';

export function useRules<R, T = FormProps['rules']>(rules: T) {




  return rules;
}


type Response = {
  name: string;

  age: string;
}


useRules<Response>({



});
