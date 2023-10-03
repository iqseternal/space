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
  border-radius: 14px;
  padding: 10px 10px;
  font-size: 14px;
  font-family: fantasy;
  line-height: 16px;

  height: 36px;
  width: max-content;
}

</style>
