<script lang="tsx">
import type { Ref } from 'vue';
import { ref, onMounted, defineComponent } from 'vue';
import { Input, InputProps } from 'ant-design-vue';

interface RInputProps extends InputProps {

}

export default defineComponent<RInputProps>({
  setup(props, { slots }) {
    const d = ref() as Ref<HTMLElement>;


    return () => (
      <div class="rInpt">
        <Input { ...props }>{slots}</Input>
      </div>
    );
  }
});
</script>

<style lang="scss" scoped>

.rInput {



}

</style>
