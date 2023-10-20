<script lang="tsx">
import type { Ref, Component, SlotsType, EmitsOptions } from 'vue';
import { ref, onMounted, defineComponent, onBeforeUnmount } from 'vue';
import { Input, InputProps } from 'ant-design-vue';
import { useEventListener, useEventListenerForElement } from '@renderer/hooks/useEventListener';

interface RInputProps extends InputProps {

}

export default defineComponent<RInputProps>({
  setup(props, { slots, attrs }) {
    const topic = ref() as Ref<HTMLDivElement>;
    const input = ref() as Ref<{ input: { input: HTMLInputElement; } }>;

    const isFocused = ref(false);

    onMounted(() => useEventListenerForElement(input.value.input.input, {
      focus: () => {
        if (isFocused.value) return;
        if (input.value.input.input.value === '') {
          topic.value.style.transform = `translateY(-50%) translateY(-15px)`;
          topic.value.style.color = `rgba(0, 0, 255, .7)`;
          topic.value.style.cursor = 'default';
          isFocused.value = true;
        }
      },
      blur: () => {
        if (!isFocused.value) return;
        if (input.value.input.input.value === '') {
          topic.value.style.transform = `translateY(-50%)`;
          topic.value.style.color = `rgba(0, 0, 0, .35)`;
          topic.value.style.cursor = 'text';
          isFocused.value = false;
        }
      }
    }));

    useEventListener(topic, 'click', () => {
      if (isFocused.value) return;

      if (input.value.input.input.value === '') {
        input.value.input.input.focus();
        isFocused.value = true;
      }
    });

    return () => (
      <div class="rInput">
        <div ref={topic} class="topic">{slots.topic && slots.topic()}</div>
        <Input ref={input} { ...attrs }>{slots}</Input>
      </div>
    );
  }
});
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.rInput {
  width: 320px;
  position: relative;

  .topic {
    z-index: 10;
    font-size: 12px;
    font-family: fantasy;
    color: rgba(0, 0, 0, .35);
    transform: translateY(-50%);
    transition: all .5s ease-out;
    user-select: none;
    @include positionLt(absolute, 50%, 56px);
  }

  &:deep(.ant-input-affix-wrapper) {
    border-radius: 0px;
    padding: 10px 20px;
    background-color: var(--s-main-frame-contain-active-color);
    border: unset;
    outline: unset;
    box-shadow: unset !important;
    width: 100%;
    height: 60px;

    .ant-input-prefix {
      // height: 50px;
      font-size: 20px;
      line-height: 20px;
      margin-inline-end: 15px;
    }

    .ant-input {
      // min-width: 80%;
      font-size: 16px;
      font-family: sans-serif;
      line-height: 18px;
      min-height: 28px !important;
      background: unset;
      margin-top: 10px;

      &::placeholder {
        font-size: 12px;
        line-height: 18px;
        color: rgba(0, 0, 0, .2);
        opacity: 0;
        transition: opacity .5s ease-out;
      }

      &:focus {
        &::placeholder {
          opacity: 1;
        }
      }
    }
  }
}
</style>
