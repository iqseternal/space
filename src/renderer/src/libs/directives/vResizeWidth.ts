import type { Directive, UnwrapNestedRefs, UnwrapRef } from 'vue';
import { computed, getCurrentInstance, reactive, ref, watchEffect } from 'vue';
import { setCssVars, setCssVar } from '@libs/common';
import { isDef } from '@suey/pkg-utils';
import { printError } from '@suey/printer';

const DEFAULT_BINDINGS = {
  minWidth: 150,
  width: 300,
  maxWidth: 400,
  barSize: 10,
  barHoverClass: '',
  barClass: '',
  barActiveClass: ''
}

export type VResizeWidthBindings = UnwrapNestedRefs<Partial<typeof DEFAULT_BINDINGS> & Pick<Required<typeof DEFAULT_BINDINGS>, 'width'>>;

export const vResizeWidth: Directive<HTMLElement, VResizeWidthBindings> = {
  mounted(el, bindings, vnode, node) {
    const position = getComputedStyle(el).position;
    if (!['absolute', 'relative'].includes(position)) el.style.position = 'relative';

    const { value, modifiers, oldValue, dir, arg } = bindings;
    if (!value) {
      printError(`vResizeWidth: 未传递参数`);
      return;
    }

    const props = reactive({ ...DEFAULT_BINDINGS, ...value });

    const div = document.createElement('div');

    watchEffect(() => setCssVar(el, 'min-width', props.minWidth + 'px'));
    watchEffect(() => setCssVar(el, 'max-width', props.maxWidth + 'px'));
    watchEffect(() => setCssVar(el, 'width', props.width + 'px'));

    const combationClassname = computed(() => [props.barHoverClass, props.barClass, props.barActiveClass].join(' '));
    watchEffect(() => { div.className = combationClassname.value; });
    watchEffect(() => setCssVar(div, 'width', props.barSize + 'px'));

    div.onmouseenter = () => (props.barHoverClass = value.barHoverClass ?? DEFAULT_BINDINGS.barHoverClass);
    div.onmouseleave = () => (props.barHoverClass = '');

    const state = reactive({
      canDrag: false
    });

    div.onmousedown = () => (state.canDrag = true);
    window.onmouseup = () => (state.canDrag = false);
    window.onmousemove = (e) => {
      if (!state.canDrag) return;


      props.width += e.movementX;

      // console.log(e);
    }

    el.appendChild(div);
  }
}
