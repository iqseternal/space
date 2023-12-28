<template>
  <Subfield>
    <template #left>
      <Subfield gap="10px" class="navMenu" style="justify-content: flex-start;">
        <Indicator />
      </Subfield>
    </template>
    <template #center>
      <span class="slogan animate__animated animate__slideInLeft">{{ 'SPACE' }}</span>
    </template>
    <template #right>
      <div />
      <Space>
        <Widget title="后退 Alt+LeftArrow" :autoHover="false" @click="() => router.back()"><span class="operator">&lt;</span></Widget>
        <Widget title="前进 Alt+RightArrow" :autoHover="false" @click="() => router.forward()"><span class="operator" >&gt;</span></Widget>
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
import { DropdownMenu, ComboBoxMenu, SingleMenu, MenuDriver } from '@renderer/components/DropdownMenu';

import Widget from '@renderer/components/Widget';
import Indicator from './Indicator.vue';
import Subfield from '@renderer/components/Subfield/Subfield.vue';

const router = useRouter();

useMousetrap([
  ['alt+left', () => router.back(), 'keyup'],
  ['alt+right', () => router.forward(), 'keyup']
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

.navMenu {
  color: rgba(0, 0, 0, .6);
  font-size: 12px;
  transition: all .5s linear;
  user-select: none;
  @include appRegionNo;

  &:hover { color: rgba(0, 0, 0, 1); }
}
</style>
