import { createRouter, createWebHistory } from 'vue-router';
import routes from './main';

const history = createWebHistory();
const router = createRouter({
  history,
  routes
});

export default router;
