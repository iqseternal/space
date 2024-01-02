
import type { Plugin } from 'vue';

import vResizeWidthDirective from './vResizeWidth';
export * from './vResizeWidth';


export default <Plugin>{
  install(app, ...options) {
    app.use(vResizeWidthDirective);


  }
};
