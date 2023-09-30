<script lang="tsx">
import { defineComponent } from 'vue';
import { Input } from 'ant-design-vue';

export default defineComponent({
  setup(props, { slots }) {
    return () => (
      <Input { ...props }>{slots}</Input>
    );
  }
});
</script>

<style lang="scss" scoped>

</style>
