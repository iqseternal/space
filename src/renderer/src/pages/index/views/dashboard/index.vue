<template>
  <ACard>
    <Subfield>
      <div>
        <AButton @click="handleCreate">新建</AButton>
      </div>
      <div>
        <AInputSearch />
      </div>
    </Subfield>

    <ATable v-bind="tableAttrs" :dataSource="dataList" :columns="columns">
      <template #bodyCell="{ record, column }">
        <template v-if="column.dataIndex === 'operator'">
          <AButton @click="handleEdit(record as Response)">编辑</AButton>
        </template>
      </template>
    </ATable>

    <NewLi v-bind="modalAllAttrs" />
  </ACard>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useTableAttrs, useColumns } from '@renderer/hooks';
import type { Response } from './api';
import { getListApi } from './api';
import Subfield from '@components/Subfield';
import NewLi from './NewLi.vue';

const dataList = ref<Response[]>([]);
const columns = useColumns<Response>([
  { title: '名称', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '源地址', dataIndex: ['data', 's_addr'] },
  { title: '目的地址', dataIndex: ['data', 'd_addr'] },
  { title: '操作', dataIndex: 'operator' }
]);

const { tableAttrs, modalAllAttrs, open } = useTableAttrs<Response>({
  rowKey: row => row.name
}, next => {
  getListApi().then(res => {
    dataList.value = res;
    next();
  })
});

const handleCreate = () => open('新建', 'create', {});

const handleEdit = (record: Response) => open('编辑', 'edit', { ...record });
</script>
