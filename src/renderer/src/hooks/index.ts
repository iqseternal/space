/**
 * ==========================================
 * 项目 Hooks
 * ==========================================
 */

export { useCssVar, useCssVarForRoot } from './useCssVar';
export { useDebounce } from './useDebounce';
export { useEventListener, useEventListenerForElement } from './useEventListener';

export type { MousetrapAction, MousetrapBindFn, MousetrapBinds } from './useMousetrap';
export { useMousetrap } from './useMousetrap';
export { useTimeout } from './useTimeout';

export type { ValidateRef, ValidateRefResult } from './useValidate';
export { useValidate, useValidateRef } from './useValidate';


export type { ModalMode, ModalHookEmits, ModalEvt, ModalAllAttrs } from './useModalAttrs';
export { useModalAttrs, useModalEvt } from './useModalAttrs';

export { usePagination } from './usePaginationAttrs';

export type { InitTableFn } from './useTableAttrs';
export { useTableAttrs } from './useTableAttrs';

export type { FadeOptions, FadeCallback } from './useFade';
export { useFadeIn, useFadeOut } from './useFade';

export { useColumns } from './useColumns';

export { useRules } from './useRules';
