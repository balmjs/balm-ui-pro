import { createApp } from 'vue';
import router from '@/routes';
import $analytics from '@/plugins/analytics';
import i18n from '@/locales';
import $http from '@/plugins/http';
import $mock from '@/plugins/mock';
import $prism from '@/plugins/prism';
import App from '@/views/layouts/app';
import setGlobalProperties from '@/config/properties';
// BalmUI
import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui-plus';
import BalmUIPro from 'balm-ui-pro';
import {
  BalmUIConfig,
  BalmUIProConfig,
  customComponents
} from '@/config/components';
// PWA
import './my-sw';

function createBalmUIProApp() {
  const app = createApp(App);

  app.use(router);
  app.use($analytics, 5);
  app.use(i18n);
  app.use($http);
  app.use($mock);
  app.use($prism);
  app.use(BalmUI, BalmUIConfig);
  app.use(BalmUIPlus);
  app.use(BalmUIPro, BalmUIProConfig);
  customComponents.forEach((component) =>
    app.component(component.name, component)
  );

  setGlobalProperties(app);

  router.isReady().then(() => app.mount('#app'));
}

export default createBalmUIProApp;
