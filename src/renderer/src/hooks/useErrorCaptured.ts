
import { onErrorCaptured, reactive, watch } from 'vue';
import { printError, print } from '@suey/printer';
import { windowReload, windowRelaunch } from '@renderer/actions';

/**
 * 如果 Vue 页面出现了错误，那么会在这里回调，并且关闭页面默认报错
 * 可以在这里向主进程发送信息，记录日志到本地
 */
export function useErrorCaptured() {
  const state = reactive({
    errNums: 0
  })

  if (import.meta.env.DEV) return;

  onErrorCaptured((err, instance, info) => {

    state.errNums ++;

    printError(err);
    printError(`[HAS ERROR]: ${info}, AT => `, instance);
    return false;
  })

  watch(() => state.errNums, () => {
    if (state.errNums >= 100) { // 如果单页面报错超过了一百个, 直接重启 App
      windowRelaunch();
    }
  })
}
