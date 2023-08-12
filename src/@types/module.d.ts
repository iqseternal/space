
/// <reference types="vite/client" />

import { icpR as icpResponseFn } from '#/code/core/common/icpR';

declare module '*.json' {
  const data: Record<string, any>
  export default data
}

declare global {

  var icpR: typeof icpResponseFn;
}




