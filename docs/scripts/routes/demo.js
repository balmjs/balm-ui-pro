import { $routerModel } from '@/pro/model';

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
