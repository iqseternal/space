import type { Directive, UnwrapNestedRefs, UnwrapRef, Plugin } from 'vue';
import { computed, getCurrentInstance, reactive, ref, watchEffect, watch } from 'vue';
import { setCssVars, setCssVar } from '@libs/common';
import { isDef } from '@suey/pkg-utils';
import { printError } from '@suey/printer';

const DEFAULT_BINDINGS = {
  minWidth: 150,
  width: 300,
  maxWidth: 400,
  barSize: 10,
  barHoverClass: 'drag-and-drop-bar-right-hover',
  barClass: 'drag-and-drop-bar-right',
  barActiveClass: 'drag-and-drop-bar-right-active'
}

export type VResizeWidthBindings = UnwrapNestedRefs<Partial<typeof DEFAULT_BINDINGS> & Pick<Required<typeof DEFAULT_BINDINGS>, 'width'>>;

export const vResizeWidthName = 'v-ResizeWidth';

export const vResizeWidth: Directive<HTMLElement, VResizeWidthBindings> = {
  mounted(el, bindings, vnode, node) {
    const position = getComputedStyle(el).position;
    if (!['absolute', 'relative'].includes(position)) el.style.position = 'relative';
    el.style.overflowX = 'hidden';

    const { value, modifiers, oldValue, dir, arg } = bindings;
    if (!value) {
      printError(`vResizeWidth: 未传递参数`);
      return;
    }

    const state = reactive({
      ...DEFAULT_BINDINGS, ...value,
      barHoverClass: '',
      barActiveClass: '',
      canDrag: false
    });

    const div = document.createElement('div');

    watchEffect(() => setCssVar(el, 'min-width', state.minWidth + 'px'));
    watchEffect(() => setCssVar(el, 'max-width', state.maxWidth + 'px'));
    watchEffect(() => setCssVar(el, 'width', state.width + 'px'));

    const combationClassname = computed(() => [state.barHoverClass, state.barClass, state.barActiveClass].join(' '));
    watchEffect(() => { div.className = combationClassname.value; });
    watchEffect(() => setCssVar(div, 'width', state.barSize + 'px'));

    div.onmouseenter = () => (state.barHoverClass = value.barHoverClass ?? DEFAULT_BINDINGS.barHoverClass);
    div.onmouseleave = () => (state.barHoverClass = '');

    const defaultCursor = document.body.style.cursor;
    watch(() => state.canDrag, nv => {
      if (nv) {
        state.barActiveClass = value.barActiveClass ?? DEFAULT_BINDINGS.barActiveClass;
        document.body.style.cursor = 'ew-resize !important';
      }
      else {
        state.barActiveClass = '';
        document.body.style.cursor = defaultCursor;
      }
    });

    div.onmousedown = () => (state.canDrag = true);
    window.onmouseup = () => (state.canDrag = false);
    window.onmousemove = (e: MouseEvent) => {
      if (!state.canDrag) return;


      state.width += e.movementX;

      // console.log(e);
    }

    el.appendChild(div);
  }
}

export default <Plugin> {
  install(app) {
    app.directive(vResizeWidthName, vResizeWidth);
  }
}
