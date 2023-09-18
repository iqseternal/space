import { createApp } from 'vue';

import router from './router';
import store from '@renderer/store';

import App from './App.vue';

import 'ant-design-vue/dist/reset.css';

import '@suey/rocketry/index.css';

import '@renderer/styles/index.scss';
import './style.scss';

;(async () => {
  const app = createApp(App);

  app.use(store).use(router);

  router.isReady().then(() => {
    app.mount('#app');
  });
})();
