import Home from '@/views/home';
// Routes
import guideRoutes from './guide';
import componentRoutes from './components';
import pluginRoutes from './plugins';
import demoRoutes from './demo';
import testRoutes from './test';
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
  ...demoRoutes,
  testRoutes,
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
