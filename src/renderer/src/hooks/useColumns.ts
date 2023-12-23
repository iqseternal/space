
import { ref } from 'vue';
import type { TableColumnType, TableColumnsType } from 'ant-design-vue';

export function useColumns<R, T = TableType.Columns<R>>(cols: T) {

  const colums = ref(cols);




  return colums;
}

