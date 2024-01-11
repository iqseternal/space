import type { RouteRecordRaw, RouteMeta, _RouteRecordBase } from 'vue-router';

export const DEFAULT_META: Required<RouteMeta> = {
  title: '', crumbsTitle: '', crumbsName: '', curmbsMeta: [],
  fullpath: '',
  icon: 'AccountBookFilled', svg: '',
  roles: [], permission: 0, hidden: false
}

type RouteRecordSingleView = Omit<RouteRecordRaw, 'RouteRecordSingleView'>;
type RouteRecordSingleViewWithChildren = Omit<RouteRecordRaw, 'RouteRecordSingleViewWithChildren'>;
type RouteRecordMultipleViewsWithChildren = Omit<RouteRecordRaw, 'RouteRecordMultipleViewsWithChildren'>;
type RouteRecordMultipleViews = Omit<RouteRecordRaw, 'RouteRecordMultipleViews'>;
type RouteRecordRedirect = Omit<RouteRecordRaw, 'RouteRecordRedirect'>;

export type RequiredRouteRecordRaw =
  (Omit<RouteRecordSingleView, 'meta'> & { name: string;meta: Required<RouteMeta>;children: never;components: never; }) |
  (Omit<RouteRecordSingleViewWithChildren, 'meta' | 'children'> & { name: string;meta: Required<RouteMeta>;children: RequiredRouteRecordRaw[];components: never; }) |
  (Omit<RouteRecordMultipleViewsWithChildren, 'meta' | 'children'> & { name: string;meta: Required<RouteMeta>;children: RequiredRouteRecordRaw[];components: never; }) |
  (Omit<RouteRecordMultipleViews, 'meta'> & { name: string;meta: Required<RouteMeta>;children: never;components: never; }) |
  (Omit<RouteRecordRedirect, 'meta'> & { name: string;meta: Required<RouteMeta>;children: never;components: never; });

export function makeRequireRouteMeta<T extends RouteRecordRaw>(_route: T, preRoute?: T): RequiredRouteRecordRaw {
  const route = _route as RequiredRouteRecordRaw;
  if (!route.meta) route.meta = {} as Required<RouteMeta>;

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

  if (route.meta.fullpath.endsWith('/')) route.meta.fullpath = route.meta.fullpath.substring(0, route.meta.fullpath.length - 1)

  if (route.redirect) route.redirect = route.meta.fullpath + ((route.redirect as string).startsWith('/') ? '' : '/') + route.redirect

  if (route.children) route.children = route.children.map(routeChild => {
    if (routeChild.path.startsWith('/')) routeChild.path = routeChild.path.replace('/', '');
    return makeRequireRouteMeta(routeChild, route);
  });

  return route as RequiredRouteRecordRaw;
}

export { makeRequireRouteMeta as makeRoute };
