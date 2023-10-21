import { createApp } from 'vue';

import router from './router';
import store from '@renderer/store';

import App from './App.vue';

import 'animate.css';
import 'ant-design-vue/dist/reset.css';
import 'dayjs/locale/zh-cn';

import '@suey/rocketry/index.css';
import '@scss/index.scss';

;(async () => {
  const app = createApp(App);

  app.use(store).use(router);

  router.isReady().then(() => {
    app.mount('#app');
  });
})();

import Mousetrap from 'mousetrap';

Mousetrap.bind(['ctrl+r', 'command+r', 'f5'], () => {
  window.location.reload();
});
