import { createApp } from 'vue';

import router from './router';
import store from '@renderer/store';

import App from './App.vue';

import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

import '@renderer/styles/index.scss';
import './style.scss';

;(async () => {
  const app = createApp(App);

  app.use(store).use(router);

  router.isReady().then(() => {
    app.mount('#app')
  });
})();


