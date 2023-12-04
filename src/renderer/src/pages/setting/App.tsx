import { defineComponent, ref } from 'vue';

const HelloWorld = defineComponent({
  setup() {
    const state = ref(true);

    return () => <>
      {
        state.value && <div>你好</div>
      }

      <button onClick={() => {
        state.value = false;
      }}>点击隐藏文字</button>

      你好

      HelloWorld!
    </>

  }
})

export default defineComponent({
  setup() {
    return () => <HelloWorld />
  }
})
