import type { RouteRecordRaw, RouteMeta, _RouteRecordBase } from 'vue-router';
import type { RequiredRouteRecordRaw } from '../src/renderer/src/libs/router';
import { makeRequireRouteMeta, makeRoute, View } from '../src/renderer/src/libs/router';

export function toRoutes<T extends Readonly<RouteRecordRaw>>(route: T) {

  return {

  }
}

export const spaceRoutes = makeRequireRouteMeta({
  name: 'Space',
  path: '/space',
  component: View,
  redirect: 'workbenches',
  children: [
    {
      name: 'Workbenches',
      path: 'workbenches',
      meta: { svg: '1', title: '工作台' },
      redirect: 'bulletinBoard',
      children: [
        {
          name: 'BulletinBoard',
          path: 'bulletinBoard',
          component: View,
        },
        {
          name: 'DrawingBoard',
          path: 'drawingBoard',
          component: View,
        }
      ]
    },
    {
      name: 'Dashboard',
      path: 'dashboard',
      meta: { svg: '2' },
      component: View,
    },
    {
      name: 'Profile',
      path: 'profile',
      meta: { icon: 'ProfileOutlined' },
      component: View,
    }
  ]
} as const);

export const { workbenchesRoute, profileRoute, dashboardRoute } = toRoutes(spaceRoutes);

const c = workbenchesRoute.children;




