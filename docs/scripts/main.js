import Vue from 'vue';
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
  Vue.config.productionTip = false;

  Vue.use($http);
  Vue.use($prism);
  Vue.use(BalmUI);
  Vue.use(BalmUIPlus);
  Vue.use(BalmUIPro);
  customComponents.forEach((component) => {
    Vue.component(component.name, component);
  });

  new Vue({
    el: '#app',
    components: {
      App
    },
    router,
    template: '<app />'
  });
}

export default createBalmUIProApp;
