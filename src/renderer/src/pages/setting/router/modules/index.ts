import { RouteRecordRaw } from 'vue-router';
import {  RequiredRouteRecordRaw } from '@libs/router';
import Layout from '@pages/setting/layout';
import { settingChild } from './childRoutes';

export const settingRoutes:RequiredRouteRecordRaw = { ...settingChild, component: Layout } as unknown as RequiredRouteRecordRaw;

export const routes: Array<RouteRecordRaw> = [
  {
    name: 'root',
    path: '/',
    redirect: settingRoutes.meta.fullpath
  },
  settingRoutes
];

export default routes;
