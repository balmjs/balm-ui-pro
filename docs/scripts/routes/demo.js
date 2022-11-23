import { $routerModel } from '@/pro/model';

const DrawerAboveToolbar = () =>
  import('@/views/components/demo/drawer-above-toolbar');
const DrawerBelowToolbar = () =>
  import('@/views/components/demo/drawer-below-toolbar');

const modelName = 'demo';
const meta = {
  noLayout: true
};

export default [
  $routerModel.createRoute(
    `/${modelName}/drawer-above-toolbar`,
    `${modelName}.drawer-above-toolbar`,
    DrawerAboveToolbar,
    { meta }
  ),
  $routerModel.createRoute(
    `/${modelName}/drawer-below-toolbar`,
    `${modelName}.drawer-below-toolbar`,
    DrawerBelowToolbar,
    { meta }
  )
];

export const routes = $routerModel.createRoutes('user', {
  namespace: 'demo',
  indexLeadingSlash: true,
  indexView: 'IndexView',
  // indexOptions: {},
  listPath: 'list/:type?',
  listView: 'ListView',
  listOptions: {
    meta: {
      auth: true
    },
    a: 'hello'
  },
  detailPath: ':userId?',
  detailView: 'DetailView',
  detailOptions: {
    b: 'world'
  }
});

export const route = $routerModel.createRoute('/post', 'post', 'PostView', {
  namespace: 'demo'
});
