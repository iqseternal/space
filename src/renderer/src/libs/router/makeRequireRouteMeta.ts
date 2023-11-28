
import type { RouteRecordRaw, RouteMeta, _RouteRecordBase } from 'vue-router';

export const DEFAULT_META: Required<RouteMeta> = {
  title: '', crumbsTitle: '', crumbsName: '', curmbsMeta: [],
  fullpath: '',
  icon: 'AccountBookFilled', svg: '',
  roles: [], permission: 0, hidden: false
}

type RouteRecordRedirect = Exclude<Exclude<RouteRecordRaw, 'RouteRecordSingleView'>, 'RouteRecordMultipleViews'>;
type RouteRecordSingleView = Exclude<Exclude<RouteRecordRaw, 'RouteRecordRedirect'>, 'RouteRecordMultipleViews'>;
type RouteRecordMultipleViews = Exclude<Exclude<RouteRecordRaw, 'RouteRecordRedirect'>, 'RouteRecordSingleView'>;

export type RequiredRouteRecordRaw =
  RouteRecordRedirect & { name: string;meta: Required<RouteMeta>;children?: RequiredRouteRecordRaw[] } |
  RouteRecordSingleView & { name: string;meta: Required<RouteMeta>;children?: RequiredRouteRecordRaw[] } |
  RouteRecordMultipleViews & { name: string;meta: Required<RouteMeta>;children?: RequiredRouteRecordRaw[] };

export function makeRequireRouteMeta<T extends RouteRecordRaw>(route: T, preRoute?: T): RequiredRouteRecordRaw {
  if (!route.meta) route.meta = {};

  for (const key in DEFAULT_META) if (!route.meta[key]) route.meta[key] = DEFAULT_META[key];

  // 非基本数据类型
  route.meta.curmbsMeta = [];
  route.meta.roles = [];

  if (route.meta.crumbsTitle === DEFAULT_META.crumbsTitle) route.meta.crumbsTitle = route.meta.title;
  if (route.meta.crumbsName === DEFAULT_META.crumbsName) route.meta.crumbsName = route.meta.title;
  if (preRoute?.meta) route.meta.curmbsMeta.push({
    ...preRoute.meta as Required<RouteMeta>,
    name: preRoute.name as string ?? ''
  });

  route.meta.curmbsMeta.push({
    ...route.meta as Required<RouteMeta>,
    name: route.name as string ?? ''
  });

  route.meta.fullpath = (preRoute?.meta?.fullpath ?? '')
    + (route.path.startsWith('/') ? '' : '/')
    + (route.path.substring(1).includes('/') ? route.path.substring(0, route.path.lastIndexOf('/')) : route.path);

  if (route.children) route.children = route.children.map(routeChild => {
    if (routeChild.path.startsWith('/')) routeChild.path = routeChild.path.replace('/', '');
    return makeRequireRouteMeta(routeChild, route);
  });

  return route as RequiredRouteRecordRaw;
}

export { makeRequireRouteMeta as makeRoute };
