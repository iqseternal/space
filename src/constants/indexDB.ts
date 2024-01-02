import type { Meta2dData } from '@meta2d/core';

export type CalcTableEnumKeyToValue<TableEnum, T extends {
  [Key in keyof TableEnum]?: unknown;
}> = T;

export const TABLE_DOCUMENT = {
  GENERATOR_KEY: 'GENERATOR_KEY',
  CREAT_AT: 'CREAT_AT', // 创建于
  EDIT_AT: 'EDIT_AT', // 编辑于
  META_2D_DATA: 'META_2D_DATA', // meta2d 数据
};

export type TableDocumentType = CalcTableEnumKeyToValue<typeof TABLE_DOCUMENT, {
  GENERATOR_KEY?: string;
  CREAT_AT: string;
  EDIT_AT: string;
  META_2D_DATA: Meta2dData;
}>;

export const TABLES = {
  TABLE_DOCUMENT
};

export type TablesType = CalcTableEnumKeyToValue<typeof TABLES, {
  TABLE_DOCUMENT: TableDocumentType;
}>;

export const DATABASES_META2D = {
  DATABASES_NAME: 'meta2dDocument',
  DATABASES_VERSION: 1,
  TABLES,
  TABLES_NAMES: Object.keys(TABLES).reduce((pre, cur) => ({ ...pre, [cur]: cur }), {} as {
    [Key in keyof typeof TABLES]: Key;
  })
};
