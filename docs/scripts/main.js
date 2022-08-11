import Vue from 'vue';
import router from '@/routes';
import i18n from '@/locales';
import $http from '@/plugins/http';
import $prism from '@/plugins/prism';
import App from '@/views/layouts/app';
import { setGlobalProps } from '@/config';
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

function createBalmUIProApp(mock = false) {
  Vue.prototype.$mock = mock;

  Vue.use($http);
  Vue.use($prism);
  Vue.use(BalmUI, BalmUIConfig);
  Vue.use(BalmUIPlus);
  Vue.use(BalmUIPro, BalmUIProConfig);
  customComponents.forEach((component) => {
    Vue.component(component.name, component);
  });

  setGlobalProps(Vue);

  new Vue({
    el: '#app',
    components: {
      App
    },
    router,
    i18n,
    template: '<app />'
  });
}

export default createBalmUIProApp;
