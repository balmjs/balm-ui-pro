import Home from '@/views/home';
// Layouts
import BlankLayout from '@/views/layouts/blank';
// Routes
import guideRoutes from './guide';
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
    path: '/guide',
    name: 'guide',
    component: BlankLayout,
    children: guideRoutes
  },
  {
    path: '/components',
    name: 'components',
    component: BlankLayout,
    children: componentRoutes
  },
  {
    path: '/plugins',
    name: 'plugins',
    component: BlankLayout,
    children: pluginRoutes
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
];

export default routes;
