import { RouteRecordRaw } from 'vue-router';

import Layout from '@renderer/pages/index/layout/index.vue';

import terminalSvg from '@renderer/assets/svg/terminal.svg?url';
import dashboardSvg from '@renderer/assets/svg/dashboard.svg?url';
import settingSvg from '@renderer/assets/svg/setting.svg?url';

export const loginRoute: RouteRecordRaw = {
  name: 'Login',
  path: '/login',
  component: () => import('@pages/index/views/login/index.vue')
};

export const spaceRoutes: RouteRecordRaw = {
  name: 'Space',
  path: '/space',
  component: Layout,
  redirect: '/space/dynamics',
  children: [
    {
      name: 'Dynamics',
      path: 'dynamics',
      meta: { svg: terminalSvg },
      component: () => import('@pages/index/views/dynamics/index.vue')
    },
    {
      name: 'Dashboard',
      path: 'dashboard',
      meta: { svg: dashboardSvg },
      component: () => import('@pages/index/views/dashboard/index.vue')
    },
    {
      name: 'Profile',
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
    redirect: '/login'
    // redirect: '/space'
  },
  loginRoute,
  spaceRoutes
];

export default routes;
