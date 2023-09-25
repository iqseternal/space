
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import type { MousetrapInstance } from 'mousetrap';
import Mousetrap from 'mousetrap';

export const useMousetrap = (el?: HTMLElement | ((mousetrap: MousetrapInstance) => void)[]) => {

  const mousetrap = ref(Array.isArray(el) ? new Mousetrap() : new Mousetrap(el));

  onBeforeMount(() => mousetrap.value.reset());

  if (Array.isArray(el)) {
    onMounted(() => {
      el.forEach(fn => fn(mousetrap.value));
    });
  }

  onBeforeUnmount(() => mousetrap.value.reset());

  return mousetrap;
}
