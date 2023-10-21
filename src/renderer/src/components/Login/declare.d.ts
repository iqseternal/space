
import type { UnwrapNestedRefs, Ref, ComputedRef } from 'vue';

export interface LoginFormRef {
  form: UnwrapNestedRefs<{
    username: string;
    password: string;
  }>,
  lastInput: Ref<{ $el: HTMLDivElement; }>;
}

export interface RegisterFormRef {


}
