<script lang="tsx">
import type { Ref, PropType } from 'vue';
import { ref, onMounted, defineComponent } from 'vue';

import { Button, ButtonProps } from 'ant-design-vue';

export default function(props, { slots, attrs }) {
  return (<Button class="rButton" {...attrs}>{slots}</Button>)
}
</script>

<style lang="scss" scoped>

.rButton {
  border-radius: 18px;
  padding: 10px 10px;
}

</style>
