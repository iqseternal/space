<template>
  <div>
    wo de
  </div>
</template>



<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, watch, onBeforeMount, inject, provide } from 'vue';
import { message } from 'ant-design-vue';

const props = defineProps({
  loadData: { type: Function as PropType<() => Promise<void>>, default: () => Promise.resolve() }
})

const loading = ref(false);

const button = ref(false);
provide('button_status', button);

const buttonStatus = inject<Ref<boolean>>('button_status') ?? ref(false);

const f = () => {
  loading.value = true;

  props.loadData().then(() => {
    // operator
  }).catch(() => {
    // message
  }).finally(() => {
    loading.value = false;
  })
}

const init = () => {
  // initChart();
}

onBeforeMount(f);
watch(() => buttonStatus.value, nv => {
  f();
})
</script>

<style lang="scss" scoped>

</style>
