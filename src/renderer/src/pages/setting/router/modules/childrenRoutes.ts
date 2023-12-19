import type { RouteRecordRaw } from 'vue-router';

export const settingChildrenRoutes: RouteRecordRaw[] = [
  {
    name: 'General',
    path: 'general',
    meta: { title: '通用' },
    component: () => import('@pages/setting/views/general/index.vue')
  },
  {
    name: 'About',
    path: 'about',
    meta: { title: '关于产品' },
    component: () => import('@pages/setting/views/about/index.vue')
  },
  {
    name: 'NetWork',
    path: 'network',
    meta: { title: '网络' },
    component: () => import('@pages/setting/views/network/index.vue')
  },
  {
    name: 'ShortCut',
    path: 'shortcut',
    meta: { title: '快捷键' },
    component: () => import('@pages/setting/views/shortcut/index.vue')
  },
  {
    name: 'Advanced',
    path: 'advanced',
    meta: { title: '高级' },
    component: () => import('@pages/setting/views/advanced/index.vue')
  },
  {
    name: 'Theme',
    path: 'theme',
    meta: { title: '外观与布局' },
    component: () => import('@pages/setting/views/theme/index.vue')
  },
  {
    name: 'Update',
    path: 'update',
    meta: { title: '软件更新' },
    component: () => import('@pages/setting/views/update/index.vue')
  }
];


