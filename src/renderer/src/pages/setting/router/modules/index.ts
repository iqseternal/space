import type { RouteRecordRaw } from 'vue-router';
import { makeRoute } from '@libs/router';
import { settingChildrenRoutes } from './childrenRoutes';
import Layout from '@pages/setting/layout';

export { settingChildrenRoutes };

export const settingRoutes = makeRoute({
  name: 'setting',
  path: '/setting',
  component: Layout,
  redirect: 'general',
  children: settingChildrenRoutes
});

export const routes: RouteRecordRaw[] = [
  {
    name: 'root',
    path: '/',
    redirect: settingRoutes.path
  },
  settingRoutes
];

export default routes;
