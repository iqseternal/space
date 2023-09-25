import { RouteRecordRaw } from 'vue-router';

import Layout from '@renderer/pages/index/layout/index.vue';

import terminalSvg from '@renderer/assets/svg/terminal.svg?url';
import dashboardSvg from '@renderer/assets/svg/dashboard.svg?url';
import settingSvg from '@renderer/assets/svg/setting.svg?url';

export const spaceRoutes: RouteRecordRaw = {
  name: 'space',
  path: '/space',
  component: Layout,
  children: [
    {
      name: 'dynamics',
      path: 'dynamics',
      meta: { svg: terminalSvg },
      component: () => import('@pages/index/views/dynamics/index.vue')
    },
    {
      name: 'dashboard',
      path: 'dashboard',
      meta: { svg: dashboardSvg },
      component: () => import('@pages/index/views/dashboard/index.vue')
    },
    {
      name: 'profile',
      path: 'profile',
      meta: { svg: settingSvg },
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
