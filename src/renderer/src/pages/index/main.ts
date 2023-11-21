import { createApp } from 'vue';

import router from './router';
import store from '@renderer/store';

import App from './App.vue';

import 'animate.css';
import 'ant-design-vue/dist/reset.css';
import 'dayjs/locale/zh-cn';

import '@scss/index.scss';

;(async () => {
  const app = createApp(App);

  app.use(store).use(router);

  router.isReady().then(() => {
    app.mount('#app');
  });
})();


