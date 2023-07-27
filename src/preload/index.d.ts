
import type { ExposeApi } from './index';

declare global {
  interface Window extends ExposeApi { }
}

export { };
