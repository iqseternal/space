<template>
  <div class="bulletinBoard">
    <Subfield :gap="20">
      <!-- <div class="flex-col-center" @click="handleWork">
        <Graph text="新建空白文档" />
      </div> -->
      <Graph text="新建空白文档" @click="handleWork" />

      <GraphGroup>
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
      </GraphGroup>
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
import { Graph, GraphGroup } from './components';

import IconFont from '@components/IconFont';
import Subfield from '@components/Subfield';

import RecentFiles from './RecentFiles.vue';
import RecommendedTemplates from './RecommendedTemplates.vue';
import PersonalTemplates from './PersonalTemplates.vue';

const router = useRouter();

const activeKey = ref('1');

const handleWork = () => {

}
</script>

<style lang="scss" scoped>

.bulletinBoard {
  padding: 0 10px;
}
</style>
