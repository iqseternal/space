
import type { PropType as VuePropType } from 'vue';
import type { IconRealKey as VueIconRealKey } from './router';
import type { TableColumnType as AntdTableColumnType } from 'ant-design-vue';
import type { EvtCallback } from '@components/Modal/index.d';

declare global {
  declare type ModalEvtCallBack = EvtCallback;

  declare type PropType<T> = VuePropType<T>;

  declare type IconRealKey = VueIconRealKey;

  declare namespace TableType {

    export type Column<T> = CustomColumn<AntdTableColumnType<T>, T>;

    export type Columns<T> = Column<T>[];

    export type BodyCell<T> = {
      column: Column<T>;
      record: T;
      text: any;
      index: number;
      value: any;
    };
  };
}

export {};
