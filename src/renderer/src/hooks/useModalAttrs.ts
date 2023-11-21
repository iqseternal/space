
import type { UnwrapNestedRefs, Ref } from 'vue';
import { reactive, ref, toRefs, computed } from 'vue';

import type { ModalEmits, ModalProps } from '@components/Modal';

const defaultModalProps = {
  visible: false,
  title: '',
  okText: '确定',
  cancelText: '取消',
  height: 'max-content'
};

export type ModalMode = 'view' | 'create' | 'edit' | `other-${string}`;

// 不管你的回调如何执行, 只要是 false, 就会取消原本的关闭或者打开操作
export type ModalHookEmits<T> = Record<
  keyof ModalEmits,
  ((state: T, ...args: any[]) => boolean | void | Promise<boolean> | Promise<void>)
>;

export function useModalAttrs<
  K extends any = any,
  T extends Partial<ModalProps> = Partial<ModalProps>
>(modalProps: T, modalEmits: Partial<ModalHookEmits<UnwrapNestedRefs<T & typeof defaultModalProps>>>) {
  // modal 需要的参数
  const modalAttrs = reactive({ ...defaultModalProps, ...modalProps });
  // modal 的状态, 例如 create 新建状态
  const modalMode = ref<ModalMode>('create');
  // modal 传递的参数, 可能内部需要某些数据进行初始化
  const modalData = ref({}) as Ref<Partial<K>>;

  /**
   * cmp.vue:
   *  <div @click="() => emits('ok', true)"></div>
   *
   *  const emits = defineEmits({ (evt: 'ok', status: boolean): void; })
   *
   * <Cmp :onOk="ok"></Cmp>
   * <Cmp @ok="ok"></Cmp>
   *
   * 此时, 这个 ok 函数携带的参数会交给 ModalEmits 处理
   *
   * @param args
   * @return
   */
  const ok = async (...args: unknown[]) => {
    if (modalEmits.ok) {
      const res = await modalEmits.ok(modalAttrs, ...args);
      if (typeof res === 'boolean' && res === false) return;
    }
    modalAttrs.visible = false;
  }

  const cancel = async (...args: unknown[]) => {
    if (modalEmits.cancel) {
      const res = await modalEmits.cancel(modalAttrs, ...args);
      if (typeof res === 'boolean' && res === false) return;
    }
    modalAttrs.visible = false;
  }

  return {
    modalAttrs, // modal 的基本传值
    modalData, // 表格新建类 modal 弹窗有时候需要传递一些字段值以供初始化
    modalMode, // modal 的模式
    ok, // modal 点击确认后的回调函数, 如果返回值为 false 或者 Promise<false> 那么可以中断 modal 的关闭
    cancel, // 同 ok
    open: (title: string, mode: ModalMode, sourceData: Partial<K>) => {
      if (title) modalAttrs.title = title;
      if (mode) modalMode.value = mode;
      if (sourceData) modalData.value = { ...sourceData };
      modalAttrs.visible = true;
    },
    close: () => {
      modalAttrs.visible = false;
    },
    /**
     * 所有参数, 可以自动绑定事件
     */
    modalAllAttrs: computed(() => ({
      ...modalAttrs,
      sourceData: modalData.value,
      mode: modalMode.value,
      onOk: ok,
      okCancel: cancel
    }))
  }

}
