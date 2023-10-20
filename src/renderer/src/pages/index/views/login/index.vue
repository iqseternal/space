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
          <Space>
            <Logo style="display: inline-block;width: 40px;height: 40px;" />
            <BlendedText text="SPACE FOR YOUR PLATFORM" :distSpacing="4" style="display: inline-block;font-size: 40px;line-height: 40px;" />
          </Space>
          <div />
        </Subfield>

        <Subfield style="margin-top: 20px;height: 70%;">
          <template #left>
            <div />
            <img alt="" :src="loginTakeFilePng" />
          </template>
          <template #right>
            <template v-if="stage === DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE">
              <Space direction="vertical" :size="10">
                <div style="font-size: 40px;">Welcome Back :&rpar;</div>
                <div style="font-size: 14px;color: rgba(0, 0, 0, .6);max-width: 350px;">
                  To keep connected us please login with your personal information by emial address and password.
                </div>
                <Login />
              </Space>
            </template>
            <template v-else-if="stage === DEFINE_PROVIDE_PROP_KEYS.R_CPT_REGISTER_STAGE">
              <Register />
            </template>
          </template>
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

import { Subfield, SubfieldPlaceholder } from '@renderer/components/Subfield';
import BlendedText from '@renderer/components/BlendedText/BlendedText.vue';

import Header from '@pages/index/layout/header/index.vue';
import Logo from '@renderer/components/Logo/Logo.vue';

import Login from './Login.vue';
import Register from './Register.vue';

const [stage, preStageKey] = useStage();

onBeforeMount(async() => {
  const setSize = await window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SET_SIZE, 850, 550).catch(e => e);
  const setResizeable = await window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, false).catch(e => e);
  if (!setSize.data || !setResizeable.data) window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RELAUNCH);
});

onMounted(() => {
  // 如果一切没有问题, 那么就准备就绪, 就可以展示页面了
  // window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SET_POSITION, 'center');
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SHOW, true);
});

onBeforeUnmount(() => {
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, true);
  window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESET_CUSTOM_SIZE, 'mainWindow');
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
