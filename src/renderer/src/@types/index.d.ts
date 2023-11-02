
import type { PropType as VuePropType } from 'vue';
import type { IconRealKey as VueIconRealKey } from './router';

declare global {
  declare type PropType<T> = VuePropType<T>;

  declare type IconRealKey = VueIconRealKey;
}


export {};
