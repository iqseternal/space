

import Modal from './index.vue';

export type ModalProps = ComponentsProps<typeof Modal>;

export type ModalEmits = Record<
  (typeof Modal)['emits'] extends string[]
    ? (typeof Modal)['emits'][number]
    : 'ok' | 'cancel'
  ,
  () => void
>;

export { Modal };

export default Modal;
