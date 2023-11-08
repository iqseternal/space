<template>
  <ASpace class="personal" :size="14">
    <DropdownMenu>
      <SidebarItem text="Profile">
        <AAvatar :size="autoSize" style="background-color: #87d068">
          <template #icon>
            <UserOutlined />
          </template>
        </AAvatar>
      </SidebarItem>

      <template #overlay>
        <SingleMenu>切换账户</SingleMenu>
        <SingleMenu>修改密码</SingleMenu>
        <SingleMenu>注销账户</SingleMenu>
        <MenuDriver />
        <SingleMenu @click="logout">退出登录</SingleMenu>
      </template>
    </DropdownMenu>

    <DropdownMenu>
      <SidebarItem :src="settingSvg" text="设置2" />

      <template #overlay>
        <SingleMenu>配置文件</SingleMenu>
        <MenuDriver />
        <SingleMenu>设置</SingleMenu>
        <SingleMenu>键盘快捷方式</SingleMenu>
        <ComboBoxMenu title="主题">
          <SingleMenu>颜色主题</SingleMenu>
        </ComboBoxMenu>
        <MenuDriver />
        <SingleMenu>检查更新...</SingleMenu>
      </template>
    </DropdownMenu>
  </ASpace>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Dropdown, Avatar, Space, Popover, Button, Menu, MenuItem, SubMenu } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { settingSvg } from '@renderer/assets';

import { Subfield } from '@renderer/components/Subfield';
import { DropdownMenu, ComboBoxMenu, SingleMenu, MenuDriver } from '@renderer/components/DropdownMenu';

import SidebarItem from './SidebarItem.vue';
import IconFont from '@renderer/components/IconFont';

const router = useRouter();

const autoSize = ref(0);

const logout = () => {
  router.push('/login');
}


onMounted(() => {
  const r = getComputedStyle(document.querySelector(':root') as Element).getPropertyValue('--s-main-frame-sidebar-width');
  autoSize.value = parseInt(r) - 16;
});

</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.personal {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  gap: 10px;
}
</style>
