import type { define } from '#/../vite.config.util';

type DefineProperties = ReturnType<typeof define>;

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends DefineProperties {

  }
}

export {};
