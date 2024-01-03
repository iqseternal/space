<template>
  <DropdownMenu trigger="contextmenu">
    <slot name="default" />

    <template #overlay>
      {{ renderMenu(props.menu) }}
    </template>
  </DropdownMenu>
</template>

<script lang="tsx" setup>
import { withDefaults } from 'vue';
import type { DropdownDataType } from './declare';
import { isComboBoxMenuData, isMenuDriverData, isSingleMenuData } from './declare';
import DropdownMenu from './DropdownMenu.vue';
import MenuDriver from './MenuDriver.vue';
import ComboBoxMenu from './ComboBoxMenu.vue';
import SingleMenu from './SingleMenu.vue';

const props = withDefaults(defineProps<{
  menu: DropdownDataType;
}>(), {
  menu: () => ([])
});

const renderMenu = (menus: DropdownDataType) => {
  return menus.map((item, index) => {
    if (isMenuDriverData(item)) return <MenuDriver />;
    if (isSingleMenuData(item)) return <SingleMenu {...item} key={item.mark as string + index} />;

    if (isComboBoxMenuData(item)) {
      const comboxBoxMenuProps = { ...item, children: void 0 };

      return <ComboBoxMenu {...comboxBoxMenuProps}>
        {renderMenu(item.children)}
      </ComboBoxMenu>
    }
    return <></>;
  })
}
</script>
