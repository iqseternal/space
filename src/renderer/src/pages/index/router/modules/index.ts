import { RouteRecordRaw } from 'vue-router';

import Layout from '@renderer/layout/space/index.vue';

const spaceRoutes: RouteRecordRaw = {
  name: 'space',
  path: '/space',
  component: Layout,
  children: [
    {
      name: 'home',
      path: 'dynamics',
      component: () => import('@pages/index/views/dynamics/index.vue')
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
