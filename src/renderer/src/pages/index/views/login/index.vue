<template>
  <div class="loginPage">
    <Header isPane />
    <div class="contain">
      <template v-if="stage === DEFINE_PROVIDE_PROP_KEYS.R_CPT_REQUEST_STAGE">
        <LoginLoading @cancel="() => (stage = preStageKey)" />
      </template>
      <template v-else>
        <Subfield style="margin-top: 40px;">
          <div />
          <ASpace>
            <Logo style="display: inline-block;width: 40px;height: 40px;" />
            <BlendedText text="SPACE FOR YOUR PLATFORM" :distSpacing="4" style="display: inline-block;font-size: 40px;line-height: 40px;" />
          </ASpace>
          <div />
        </Subfield>

        <Subfield v-if="stage === DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE" style="margin-top: 10px;height: 70%;">
          <template #left>
            <div />
            <img alt="" :src="loginTakeFilePng" />
          </template>
          <template #right>
            <Login />
          </template>
        </Subfield>
        <Subfield v-else-if="stage === DEFINE_PROVIDE_PROP_KEYS.R_CPT_REGISTER_STAGE">
          <div />
          <Register />
          <div />
        </Subfield>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { onBeforeMount, onBeforeUnmount, onMounted, ref, computed, provide } from 'vue';
import { useRouter } from 'vue-router';
import { Space, Input, Button, Form, FormItem, Modal, TabPane, Tabs, Card } from 'ant-design-vue';
import { IPC_MAIN_WINDOW, CONFIG } from '#/constants';
import { useMousetrap } from '@renderer/hooks/useMousetrap';
import { loginTakeFilePng } from '@renderer/assets';

import { LoginLoading } from '@renderer/components/Loading';
import { useStage, DEFINE_PROVIDE_PROP_KEYS } from './useStage';

import { windowSetSize, windowResizeAble, windowRelaunch, windowShow, windowSetPosition, windowResetCustomSize } from '@renderer/actions';

import { Subfield, SubfieldSpace } from '@renderer/components/Subfield';
import BlendedText from '@renderer/components/BlendedText/BlendedText.vue';

import Header from '@renderer/components/Header';
import Logo from '@renderer/components/Logo/Logo.vue';

import Login from './Login.vue';
import Register from './Register.vue';

const [stage, preStageKey] = useStage();

onBeforeMount(async() => {
  const setSize = await windowSetSize(850, 550);
  const setResizeable = await windowResizeAble(false);
  if (!setSize.data || !setResizeable.data) windowRelaunch();
});

onMounted(() => {
  // 如果一切没有问题, 那么就准备就绪, 就可以展示页面了
  // windowSetPosition('center');
  windowShow(true);
});

onBeforeUnmount(() => {
  windowResizeAble(true);
  windowResetCustomSize('mainWindow');
});
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.loginPage {
  width: 100vw;
  height: 100vh;
  background-color: var(--s-main-frame-contain-color);

  .contain {
    height: calc(100vh - $sMainCaptionBarHeight);
  }
}
</style>
