import { $routerModel } from './model';

export const routes = $routerModel.createRoutes(
  'user',
  {
    indexView: 'IndexView',
    listView: 'ListView',
    detailView: 'DetailView'
  },
  {
    // indexOptions: {},
    listPath: 'list/:type?',
    listOptions: {
      meta: {
        auth: true
      },
      a: 'hello'
    },
    detailPath: ':userId?',
    detailOptions: {
      b: 'world'
    }
  }
);

export const route = $routerModel.createRoute('/post', 'post', 'PostView', {
  namespace: 'user'
});
