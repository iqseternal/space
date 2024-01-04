import type { Directive, UnwrapNestedRefs, UnwrapRef, Plugin, DirectiveBinding } from 'vue';
import { computed, getCurrentInstance, reactive, ref, watchEffect, watch } from 'vue';
import { setCssVars, setCssVar } from '@libs/common';
import { isDef, isUndefined } from '@suey/pkg-utils';
import { printError } from '@suey/printer';

const DEFAULT_BINDINGS = {
  minWidth: 150,
  width: 300,
  maxWidth: 400,
  barSize: 4,
  barHoverClass: 'drag-and-drop-bar-hover',
  barClass: 'drag-and-drop-bar',
  barActiveClass: 'drag-and-drop-bar-active',
  canDrag: false,
  direction: 'right' as ('left' | 'right')
}

export type VResizeWidthBindings = UnwrapNestedRefs<Partial<typeof DEFAULT_BINDINGS> & Pick<Required<typeof DEFAULT_BINDINGS>, 'width'>>;

export const vResizeWidthName = 'v-ResizeWidth';

const toPixel = (value: number) => value + 'px';

export const vResizeWidth: Directive<HTMLElement, VResizeWidthBindings> = {
  mounted(el, bindings, vnode, node) {
    if (!el.parentElement) return;
    const position = getComputedStyle(el.parentElement).position;
    if (!['absolute', 'relative'].includes(position)) el.parentElement.style.position = 'relative';

    const { value, modifiers, oldValue, dir, arg } = bindings as DirectiveBinding<Required<typeof DEFAULT_BINDINGS>>;
    if (!value) {
      printError(`vResizeWidth: 未传递参数`);
      return;
    }

    // 初始化数据
    for (const key in DEFAULT_BINDINGS) if (isUndefined(value[key])) value[key] = DEFAULT_BINDINGS[key];
    const defaultValue = { ...value };
    value.barActiveClass = '';
    value.barHoverClass = '';

    // 托拽 Dom
    const div = document.createElement('div');

    // 设置极限宽度
    watchEffect(() => setCssVar(el, 'min-width', toPixel(value.minWidth)));
    watchEffect(() => setCssVar(el, 'max-width', toPixel(value.maxWidth)));

    // 设置当前宽度
    setCssVar(el, 'width', toPixel(value.width));
    value.width = parseInt(getComputedStyle(el).width);
    watch(() => value.width, () => setCssVar(el, 'width', toPixel(value.width)));

    // 设置动作类名
    const combationClassname = computed(() => [value.barHoverClass, value.barClass, value.barActiveClass].join(' '));
    watchEffect(() => { div.className = combationClassname.value; });
    watchEffect(() => setCssVar(div, 'width', toPixel(value.barSize)));

    // 设置 Dom 的定位
    watch(() => [value.width, value.barSize], location);
    location();
    window.addEventListener('resize', location);
    function location() {
      const v = el.offsetLeft + (value.direction === 'right' ? el.getBoundingClientRect().width - value.barSize / 2 : -1 * value.barSize / 2);
      setCssVar(div, 'left', toPixel(v));
    }

    // 设置动作类名的事件
    div.onmouseenter = () => (value.barHoverClass = defaultValue.barHoverClass);
    div.onmouseleave = () => (value.barHoverClass = '');

    // 改变鼠标样式
    const defaultCursor = document.body.style.cursor;
    watch(() => value.canDrag, nv => {
      if (nv) {
        value.barActiveClass = defaultValue.barActiveClass;
        document.body.style.cursor = 'ew-resize !important';
      }
      else {
        value.barActiveClass = '';
        document.body.style.cursor = defaultCursor;
      }
    });

    // 设置托拽事件,改变 Dom 的宽度
    div.onmousedown = () => (value.canDrag = true);
    window.addEventListener('mouseup', () => (value.canDrag = false));
    window.addEventListener('mousemove', e => {
      if (!value.canDrag) return;

      let targetWidth = value.width;
      if (value.direction === 'right') targetWidth += e.movementX;
      else if (value.direction === 'left') targetWidth -= e.movementX;

      if (targetWidth <= value.minWidth) value.width = value.minWidth;
      else if (targetWidth >= value.maxWidth) value.width = value.maxWidth;
      else value.width = targetWidth;
    });
    el.parentElement.appendChild(div);
  }
}

export default <Plugin> {
  install(app) {
    app.directive(vResizeWidthName, vResizeWidth);
  }
}
