<template>
  <FormItem v-bind="$attrs">
    <template v-for="(value, name) in $slots" #[name]="scopeData">
      <slot :name="name" v-bind="scopeData || {}"></slot>
    </template>
  </FormItem>
</template>

<script lang="ts">
import type { VNodeProps, AllowedComponentProps, ComponentCustomProps, SlotsType } from 'vue';
import { defineComponent } from 'vue';
import type { FormItemProps, FormItemRest } from 'ant-design-vue';
import { FormItem } from 'ant-design-vue';

interface RFormItemProps extends FormItemProps {

}

type RFormItemSlots = SlotsType<{ help: any;label: any;extra: any;default: any; }>;

export default defineComponent<RFormItemProps, {}, '', RFormItemSlots>({
  components: { FormItem },
  setup(props, { slots, emit, expose }) {

    
  }
})
</script>

<style lang="scss" scoped>

</style>
