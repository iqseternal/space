import { RouteRecordRaw } from 'vue-router';

import Layout from '@renderer/layout/index.vue';

const spaceRoutes: RouteRecordRaw = {
  name: 'space',
  path: '/space',
  component: Layout,
  children: [
    {
      name: 'home',
      path: 'dynamics',
      component: () => import('@renderer/views/dynamics/index.vue')
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
