import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './main';
import { initRouter } from './middleware';

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

initRouter(router);

export default router;
