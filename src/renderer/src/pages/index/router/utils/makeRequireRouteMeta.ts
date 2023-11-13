
import type { RouteRecordRaw, RouteMeta } from 'vue-router';


export function makeRequireRouteMeta<T extends RouteRecordRaw>(route: T) {






  return route;
}


export { makeRequireRouteMeta as makeRoute };
