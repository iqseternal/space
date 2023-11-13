import "vue-router";
import * as icons from '@ant-design/icons-vue';
import * as assrtUrls from '@renderer/assets';

export type IconRealKey =
Exclude<
  Exclude<
    Exclude<
      Exclude<
        Exclude<
          keyof typeof icons
        , 'TwoToneColor'>
      , 'setTwoToneColor'>
    , 'getTwoToneColor'>
  , 'createFromIconfontCN'>
, 'default'>;

declare module "vue-router" {
  interface RouteMeta {
    // 设置该路由在侧边栏和面包屑中展示的名字
    title?: string;

    icon?: IconRealKey | `icon-${string}`;

    // 设置该路由的图标, 暂时是一个 path 路径
    svg?: string;

    // 默认 false，设置 true 的时候该路由不会在侧边栏出现
    hidden?: boolean;

    // 设置该路由进入的权限，支持多个权限叠加, 适合对用户角色的分类
    roles?: string[];

    // 权限, 取决于采用哪种形式, 如果使用下面这种形式, 那么就是动态叠加的权限
    // 采用二进制, 每一位对应一种权限, 如果查看是否拥有用 | 运算, 如果要添加权限, 使用 & 运算
    permission?: number;

    // 是否缓存该路由页面 默认为 false，为 true 时代表需要缓存，此时该路由和该页面都需要设置一致的 Name
    keepAlive?: boolean;
  }
}


export {};
