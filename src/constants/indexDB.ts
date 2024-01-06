import type { Meta2dData } from '@meta2d/core';

/**
 * 根据对象的Key的枚举创建类型
 */
export type CalcTableEnumKeyToValue<TableEnum, T extends {
  [Key in keyof TableEnum]?: unknown;
}> = T;

/**
 * 一张表的类型，字段，创建得是常量枚举，所以Key和Value应该相等
 * 这里是文档表，用于存储Meta2d所产生的需要存储的数据
 */
export const TABLE_DOCUMENT = {
  GENERATOR_KEY: 'GENERATOR_KEY',
  CREAT_AT: 'CREAT_AT', // 创建于
  EDIT_AT: 'EDIT_AT', // 编辑于
  META_2D_DATA: 'META_2D_DATA', // meta2d 数据
};

/**
 * TABLE_DOCUMENT 表的字段所对应的值的类型
 */
export type TableDocumentType = CalcTableEnumKeyToValue<typeof TABLE_DOCUMENT, {
  GENERATOR_KEY?: string;
  CREAT_AT: string;
  EDIT_AT: string;
  META_2D_DATA: Meta2dData;
}>;

/**
 * 所有的表,通过 TABLES 获取所有的字段名
 */
export const TABLES = {
  TABLE_DOCUMENT
};

/**
 * TABLES 的表结构, 通过创建这个可以得到 IndexDb 某个数据库中所有 Tables 的表结构
 */
export type TablesType = CalcTableEnumKeyToValue<typeof TABLES, {
  TABLE_DOCUMENT: TableDocumentType;
}>;

/**
 * IndexedDB 的常量
 */
export const DATABASES_META2D = {
  DATABASES_NAME: 'meta2dDocument',
  DATABASES_VERSION: 1,
  TABLES,
  TABLES_NAMES: Object.keys(TABLES).reduce((pre, cur) => ({ ...pre, [cur]: cur }), {} as {
    [Key in keyof typeof TABLES]: Key;
  })
};
