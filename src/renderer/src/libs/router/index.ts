/**
 * ==========================================
 * 创建项目 Router 所需的 Api或者类型
 *
 * View.vue 没有实际意义, 作为占位符处理
 * ==========================================
 */

export { default as View } from './View.vue';

export type { RequiredRouteRecordRaw, AutoRequiredRouteRecordRaw } from './makeRequireRouteMeta';
export { makeRequireRouteMeta, makeRoute, toRoutes } from './makeRequireRouteMeta';
