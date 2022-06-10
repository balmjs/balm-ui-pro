import { createApp } from 'vue';
import router from '@/routes';
import $http from '@/plugins/http';
import $prism from '@/plugins/prism';
import App from '@/views/layouts/app';
// BalmUI
import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui-plus';
import BalmUIPro from 'balm-ui-pro';
import { customComponents } from '@/config/components';
// PWA
// import './my-sw';

function createBalmUIProApp() {
  const app = createApp(App);

  app.use(router);
  app.use($http);
  app.use($prism);
  app.use(BalmUI);
  app.use(BalmUIPlus);
  app.use(BalmUIPro, {
    $model: {
      crud: {
        create: 'add',
        update: 'edit'
      }
    }
  });
  customComponents.forEach((component) =>
    app.component(component.name, component)
  );

  router.isReady().then(() => app.mount('#app'));
}

export default createBalmUIProApp;
