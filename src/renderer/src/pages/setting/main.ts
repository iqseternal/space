import { createApp } from 'vue';
import '@scss/index.scss'
import App from './App.vue';
import './styles.scss'
import router from '@pages/setting/router';

;(async () => {
  const app = createApp(App)

  app.use(router).mount('#app');
})();
