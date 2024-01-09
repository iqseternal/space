<template>
  <div>
    <Subfield :gap="20">
      <div class="flex-col-center" style="width: 100px;height: 80px;gap: 10px;" @click="handleWork">
        <IconFont type="FileAddOutlined" />
        <span>新建空白绘图</span>
      </div>

      <div style="width: 80%;height: 80px;" />
    </Subfield>

    <ATabs v-model:activeKey="activeKey">
      <ATabPane key="1">
        <template #tab><IconFont type="FileOutlined" />最近文件</template>
        <RecentFiles />
      </ATabPane>
      <ATabPane key="2">
        <template #tab><IconFont type="InteractionOutlined" />推荐模板</template>
        <RecommendedTemplates />
      </ATabPane>
      <ATabPane key="3">
        <template #tab><IconFont type="PercentageOutlined" />个人模板</template>
        <PersonalTemplates />
      </ATabPane>
    </ATabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { spaceRoutes } from '@pages/index/router/modules';
import IconFont from '@components/IconFont';
import Subfield from '@components/Subfield';

import RecentFiles from './RecentFiles.vue';
import RecommendedTemplates from './RecommendedTemplates.vue';
import PersonalTemplates from './PersonalTemplates.vue';

const router = useRouter();

const activeKey = ref('1');

const handleWork = () => {
  router.push(spaceRoutes.children[0].children[1].meta.fullpath);
}

</script>

<style lang="scss" scoped>

</style>
