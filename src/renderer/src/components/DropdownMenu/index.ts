// 包裹一层的原因为需要定制化样式, 但是又不想污染原来的组件库
import { Dropdown, Menu, SubMenu, MenuItem, Divider } from 'ant-design-vue';
import DropdownMenuVue from './DropdownMenu.vue';
import ComboBoxMenuVue from './ComboBoxMenu.vue';
import SingleMenuVue from './SingleMenu.vue';
import MenuDriverVue from './MenuDriver.vue';

export const DropdownMenu: typeof Dropdown = DropdownMenuVue as (typeof Dropdown);
export const ComboBoxMenu: typeof SubMenu = ComboBoxMenuVue as (typeof SubMenu);
export const SingleMenu: typeof MenuItem = SingleMenuVue as (typeof MenuItem);
export const MenuDriver: typeof Divider = MenuDriverVue as (typeof Divider);

