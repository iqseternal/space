import { createApp } from 'vue';

import antd from 'ant-design-vue';
import router from './router';
import store from '@renderer/store';
56
import App from './App.vue';

import 'animate.css';
import 'ant-design-vue/dist/reset.css';
import 'dayjs/locale/zh-cn';

import '@suey/rocketry/index.css';
import '@scss/index.scss';

;(async () => {
  const app = createApp(App);

  app.use(antd);

  app.use(store).use(router);

  router.isReady().then(() => {
    app.mount('#app');
  });
})();
