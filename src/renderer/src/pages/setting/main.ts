import '@scss/index.scss';
import './styles.scss';

import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

(async () => {
  const app = createApp(App);

  app.use(router);

  router.isReady().then(() => {
    app.mount('#app');
  });
})();
