<template>
  <Subfield>
    <template #left>
      <span class="slogan animate__animated animate__slideInLeft">{{ 'SPACE' }}</span>
    </template>
    <template #right>
      <div />
      <Space>
        <Tooltip title="后退 Alt+LeftArrow" :mouseEnterDelay="CONFIG.VIEW.TOOLTIP_ENTER_TIME">
          <span class="operator" @click="() => router.back()">&lt;</span>
        </Tooltip>
        <Tooltip title="前进 Alt+RightArrow" :mouseEnterDelay="CONFIG.VIEW.TOOLTIP_ENTER_TIME">
          <span class="operator" @click="() => router.forward()">&gt;</span>
        </Tooltip>
        <div />
      </Space>
    </template>
  </Subfield>
</template>

<script lang="ts" setup>
import { ref, onMounted, h } from 'vue';
import { useRouter } from 'vue-router';
import { ConfigProvider, Tooltip, Space } from 'ant-design-vue';
import { CONFIG } from '#/constants';
import { useMousetrap } from '@renderer/hooks/useMousetrap';
import { useAutoAnimate, vAutoAnimate } from '@formkit/auto-animate/vue';

import Subfield from '@renderer/components/Subfield/Subfield.vue';

const router = useRouter();

useMousetrap([
  (mousetrap) => mousetrap.bind('alt+left', () => router.back(), 'keyup'),
  (mousetrap) => mousetrap.bind('alt+right', () => router.forward(), 'keyup')
]);
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";

.slogan {
  background-image: -webkit-linear-gradient(left, #e26846, #d75d10, #ebab7a, #f7a76b);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 18px;
  white-space: nowrap;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color:transparent;
}

.operator {
  color: rgba(0, 0, 0, .2);
  margin-right: 5px;
  cursor: pointer;
  transition: all .5s linear;
  user-select: none;
  font-size: 18px;
  @include appRegionNo;

  &:hover { color: rgba(0, 0, 0, 1); }
}
</style>
