<template>
  <Space class="personal" :size="14">
    <SidebarItem text="Profile">
      <Avatar :size="autoSize" style="background-color: #87d068">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
    </SidebarItem>

    <SidebarItem :src="settingSvg" text="设置" />
  </Space>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Avatar, Space, Popover, Button } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { settingSvg } from '@renderer/assets';

import { Subfield } from '@renderer/components/Subfield';
import SidebarItem from './SidebarItem.vue';


const autoSize = ref(0);

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
