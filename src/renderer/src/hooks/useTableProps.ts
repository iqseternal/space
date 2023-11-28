
import type { UnwrapNestedRefs } from 'vue';
import { reactive } from 'vue';
import type { TableProps } from 'ant-design-vue';

import { usePagination } from './usePaginationAttrs';
import { useModalAttrs } from './useModalAttrs';

export type InitTableFn = (
  params: ReturnType<typeof usePagination>['paginParams'],
  refent: {
    pagination: ReturnType<typeof usePagination>,
    modal: ReturnType<typeof useModalAttrs>,
    tableAttrs: UnwrapNestedRefs<Partial<TableProps>>
  }
) => void;

export function useTableAttrs<
  T extends Partial<TableProps>,
  FN extends InitTableFn
>(
  props: T,
  /** 数据的初始化函数, 返回一个 Promise */
  loadDataFn: FN,
  /** 加载一个 Modal */
  loadModal?: (loadData: () => void | Promise<void>) => ReturnType<typeof useModalAttrs>,
  /** 加载一个 Pagination */
  loadPagination?: (loadData: () => void | Promise<void>) => ReturnType<typeof usePagination>
) {
  const pagination = loadPagination ? loadPagination(loadData) : usePagination({}, loadData);

  const modal = loadModal ? loadModal(loadData) : useModalAttrs({}, {
    ok: loadData
  });

  const tableAttrs = reactive({
    pagination: pagination.paginAttrs,
    loading: false,
    ...props
  });

  async function loadData() {
    tableAttrs.loading = true;
    await loadDataFn(pagination.paginParams, { pagination, modal, tableAttrs });
    tableAttrs.loading = false;
  }

  return {
    /**
     * 加载数据, 自动调用
     */
    loadData,
    refresh: loadData,
    tableAttrs,
    ...pagination,
    ...modal
  }
}
