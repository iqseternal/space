import type { RouteRecordRaw } from 'vue-router';
import { terminalSvg, dashboardSvg, settingSvg } from '@renderer/assets';
import { makeRoute } from '@libs/router';
// import Layout from '@renderer/pages/index/layout/index.vue';

const Layout = () => import('@renderer/pages/index/layout/index.vue');

export const loginRoute = makeRoute({
  name: 'Login',
  path: '/login',
  component: () => import('@pages/index/views/login/index.vue')
});

export const spaceRoutes = makeRoute({
  name: 'Space',
  path: '/space',
  component: Layout,
  redirect: '/space/workbenches',
  children: [
    {
      name: 'Workbenches',
      path: 'workbenches',
      meta: { svg: terminalSvg, title: '工作台' },
      component: () => import('@pages/index/views/workbenches/index.vue')
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
});

export const routes = [
  {
    name: 'root',
    path: '/',
    redirect: loginRoute.path
    // redirect: '/space'
  },
  loginRoute,
  spaceRoutes
];

export default routes;
