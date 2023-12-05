import type { Ref } from 'vue';
import { ref, provide, inject } from 'vue';

const DEFINE_PROVIDE_KEY = 'DEFINE_PROVIDE_KEY';

export const DEFINE_PROVIDE_PROP_KEYS = {
  R_CPT_LOGIN_STAGE: 'R_CPT_LOGIN_STAGE' as 'R_CPT_LOGIN_STAGE',
  R_CPT_REGISTER_STAGE: 'R_CPT_REGISTER_STAGE' as 'R_CPT_REGISTER_STAGE',
  R_CPT_REQUEST_STAGE: 'R_CPT_REQUEST_STAGE' as 'R_CPT_REQUEST_STAGE',
  R_CPT_FORGET_PASSWORD: 'R_CPT_FORGET_PASSWORD' as 'R_CPT_FORGET_PASSWORD'
};

export type PropKeys = keyof typeof DEFINE_PROVIDE_PROP_KEYS;

export type SetStageFn = (key: PropKeys) => void;

/**
 * 登录页状态管理 stage
 * @return {[Ref<PropKeys>, PropKeys]}
 */
export const useStage = (): [Ref<PropKeys>, Ref<PropKeys>] => {
  const preStage = ref(DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE) as Ref<PropKeys>;

  const stage = ref(DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE) as Ref<PropKeys>;

  provide(DEFINE_PROVIDE_KEY, [stage, (key: PropKeys) => {

    preStage.value = stage.value;

    stage.value = key;
  }]);

  return [stage, preStage];
};

export const useStageInject = (): [Ref<PropKeys>, SetStageFn] => {
  return inject<[Ref<PropKeys>, SetStageFn]>(DEFINE_PROVIDE_KEY) ?? ([ref(DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE), () => {}]);
};
