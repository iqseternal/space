import { RouteRecordRaw } from 'vue-router';

import Layout from '@renderer/pages/index/layout/index.vue';

export const spaceRoutes: RouteRecordRaw = {
  name: 'space',
  path: '/space',
  component: Layout,
  children: [
    {
      name: 'dynamics',
      path: 'dynamics',
      component: () => import('@pages/index/views/dynamics/index.vue')
    },
    {
      name: 'dashboard',
      path: 'dashboard',
      component: () => import('@pages/index/views/dashboard/index.vue')
    },
    {
      name: 'profile',
      path: 'profile',
      component: () => import('@pages/index/views/profile/index.vue')
    }
  ]
};

export const routes: Array<RouteRecordRaw> = [
  {
    name: 'root',
    path: '/',
    redirect: '/space/dynamics'
  },
  spaceRoutes
];

export default routes;
