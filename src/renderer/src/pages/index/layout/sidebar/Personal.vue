<template>
  <Space class="personal">
    <SidebarItem text="Profile">
      <Avatar :size="autoSize" style="background-color: #87d068">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
    </SidebarItem>
    <SidebarItem :src="settingSvg" text="设置">

    </SidebarItem>
  </Space>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Avatar, Space } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';
import SidebarItem from './SidebarItem.vue';

import settingSvg from '@renderer/assets/svg/setting.svg?url';

const autoSize = ref(0);

onMounted(() => {
  const r = getComputedStyle(document.querySelector(':root') as Element).getPropertyValue('--s-main-frame-sidebar-width');
  autoSize.value = parseInt(r) - 22;
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
