<template>
  <div class="bulletinBoard">
    <Subfield :gap="20">
      <!-- <div class="flex-col-center" @click="handleWork">
        <Graph text="新建空白文档" />
      </div> -->
      <Graph text="新建空白文档" @click="handleCreateDoc" />

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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { spaceRoutes } from '@pages/index/router/modules';
import { Graph, GraphGroup } from './components';
import { useDocStore } from '@renderer/store/modules/doc';
import { setupIndexedDB } from '@renderer/indexedDB';
import { TABLES, TABLE_DOCUMENT, DATABASES_META2D } from '#constants/indexDB';

import IconFont from '@components/IconFont';
import Subfield from '@components/Subfield';

import RecentFiles from './RecentFiles.vue';
import RecommendedTemplates from './RecommendedTemplates.vue';
import PersonalTemplates from './PersonalTemplates.vue';


const router = useRouter();

const activeKey = ref('1');


const { createDoc, state, setDocId } = useDocStore();

const handleCreateDoc = async () => {
  const doc = await createDoc().catch(err => err);


  setDocId(2);
}

onMounted(async () => {
  const indexedDB = await setupIndexedDB();

  const objectStore = indexedDB.transaction(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT, 'readonly').objectStore(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT);

  const res = await objectStore.getAll();

  console.log(res);

})
</script>

<style lang="scss" scoped>

.bulletinBoard {
  padding: 0 10px;
}
</style>
