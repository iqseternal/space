import type { RouteRecordRaw } from 'vue-router';
import { terminalSvg, dashboardSvg, settingSvg } from '@renderer/assets';
import { View, makeRoute } from '@libs/router';

export const loginRoute = makeRoute({
  name: 'Login',
  path: '/login',
  component: () => import('@pages/index/views/login/index.vue')
});

export const spaceRoutes = makeRoute({
  name: 'Space',
  path: '/space',
  component: () => import('@renderer/pages/index/layout/index.vue'),
  redirect: '/space/workbenches',
  children: [
    {
      name: 'Workbenches',
      path: 'workbenches',
      meta: { svg: dashboardSvg, title: '工作台' },
      component: View,
      redirect: '/space/workbenches/bulletinBoard',
      children: [
        {
          name: 'BulletinBoard',
          path: 'bulletinBoard',
          component: () => import('@pages/index/views/workbenches/bulletinBoard/index.vue')
        },
        {
          name: 'DrawingBoard',
          path: 'drawingBoard',
          component: () => import('@pages/index/views/workbenches/drawingBoard/index.vue')
        }
      ]
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
      meta: { icon: 'ProfileOutlined' },
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
