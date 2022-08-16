import Home from '@/views/home';
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
  guideRoutes,
  componentRoutes,
  pluginRoutes,
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
];

export default routes;
