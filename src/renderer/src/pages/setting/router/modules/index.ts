import { RouteRecordRaw } from 'vue-router';
import {  RequiredRouteRecordRaw } from '@libs/router';
import Layout from '@pages/setting/layout';
import { settingChild } from './childRoutes';

export const settingRoutes = { ...settingChild, component: Layout } as RequiredRouteRecordRaw;

export const routes: RouteRecordRaw[] = [
  {
    name: 'root',
    path: '/',
    redirect: settingRoutes.meta.fullpath
  },
  settingRoutes
];

export default routes;
