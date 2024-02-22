import { IS_DEV } from '#/constants';
import { printError } from '@suey/printer';
import type { RouteRecordRaw, RouteMeta, _RouteRecordBase } from 'vue-router';

export const DEFAULT_META: Required<RouteMeta> = {
  title: '', crumbsTitle: '', crumbsName: '', curmbsMeta: [],
  fullpath: '',
  icon: 'AccountBookFilled', svg: '',
  roles: [], permission: 0, hidden: false
}

export type RouteRecordSingleView = Omit<RouteRecordRaw, 'RouteRecordSingleView'>;
export type RouteRecordSingleViewWithChildren = Omit<RouteRecordRaw, 'RouteRecordSingleViewWithChildren'>;
export type RouteRecordMultipleViewsWithChildren = Omit<RouteRecordRaw, 'RouteRecordMultipleViewsWithChildren'>;
export type RouteRecordMultipleViews = Omit<RouteRecordRaw, 'RouteRecordMultipleViews'>;
export type RouteRecordRedirect = Omit<RouteRecordRaw, 'RouteRecordRedirect'>;

export type RequiredRouteRecordSingleView = (Omit<RouteRecordSingleView, 'meta'> & { name: string;meta: Required<RouteMeta>;children: never;components: never; });
export type RequiredRouteRecordSingleViewWithChildren = (Omit<RouteRecordSingleViewWithChildren, 'meta' | 'children'> & { name: string;meta: Required<RouteMeta>;children: RequiredRouteRecordRaw[];components: never; });
export type RequiredRouteRecordMultipleViewsWithChildren = (Omit<RouteRecordMultipleViewsWithChildren, 'meta' | 'children'> & { name: string;meta: Required<RouteMeta>;children: RequiredRouteRecordRaw[];components: never; });
export type RequiredRouteRecordMultipleViews = (Omit<RouteRecordMultipleViews, 'meta'> & { name: string;meta: Required<RouteMeta>;children: never;components: never; });
export type RequiredRouteRecordRedirect = (Omit<RouteRecordRedirect, 'meta'> & { name: string;meta: Required<RouteMeta>;children: never;components: never; });

export type RequiredRouteRecordRaw =
  RequiredRouteRecordSingleView |
  RequiredRouteRecordSingleViewWithChildren |
  RequiredRouteRecordMultipleViewsWithChildren |
  RequiredRouteRecordMultipleViews |
  RequiredRouteRecordRedirect;

export type AutoRequiredRouteRecordRaw<
  T extends Readonly<RouteRecordRaw>,
  Children extends T['children'] = T['children']
> = Omit<T, 'meta' | 'children'> & {
  meta: T['meta'] extends unknown ? Required<RouteMeta> : ObjAutoComplete<Exclude<T['meta'], undefined>, Required<RouteMeta>>;
  children: Children extends {} ? {
    [Index in keyof Children]:
      Index extends (number | `${number}`)
        // @ts-ignore
        ? AutoRequiredRouteRecordRaw<Exclude<Children[Index], undefined>>
        : Children[Index];
  } : never;
}

export function makeRequireRouteMeta<T extends Readonly<RouteRecordRaw>>(_route: T, preRoute?: T): AutoRequiredRouteRecordRaw<T> {
  if (IS_DEV) {
    const startChat = (_route.name as string)?.charAt(0);
    if (!startChat) printError(`lib: 路由的name必须是一个字符串`);
    if (startChat < 'A' || startChat > 'Z') printError(`lib: 路由的name必须大写字母开头`);
  }

  const route = _route as unknown as RequiredRouteRecordRaw;
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

  return route as unknown as AutoRequiredRouteRecordRaw<T>;
}

export { makeRequireRouteMeta as makeRoute };

/**
 * 传入一个makeRequiredRouteMeta 然后从这个对象得children中进行解构出对象
 *
 * key 为chidren中每一项得name得小写字母加Route
 * value 就是这children中的一项
 * @param route
 * @returns
 */
export function toRoutes<T>(route: T) {
  // type R = typeof spaceRoutes.children;

  // @ts-ignore
  type R = T['children'];
  // @ts-ignore
  type ChildrenKeys = ArrayKeys<R>;
  // @ts-ignore
  type IndexToName = { [Index in ChildrenKeys]: R[Index]['name']; }
  type Res = {
    // @ts-ignore
    [Index in keyof IndexToName as `${Lowercase<IndexToName[Index]>}Route`]: R[Index];
  }

  const res = {} as Res;
  // @ts-ignore
  route.children?.forEach(child => {
    if (!child) return;
    if (!child.name) return;

    res[`${(child.name as string).toLowerCase()}Route`] = child;
  });

  return res;
}
