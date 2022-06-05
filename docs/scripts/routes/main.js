import Home from '@/views/home';
// Layouts
import BlankLayout from '@/views/layouts/blank';
// Routes
import componentRoutes from './components';
import pluginRoutes from './plugins';
// Pages
const NotFound = () => import('@/views/not-found');

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/component',
    name: 'component',
    component: BlankLayout,
    children: componentRoutes
  },
  {
    path: '/plugin',
    name: 'plugin',
    component: BlankLayout,
    children: pluginRoutes
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
];

export default routes;
