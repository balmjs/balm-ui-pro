```js
import { useRouterModel } from 'balm-ui-pro';
import IndexLayout from '@/views/layouts/index';
import UserList from '@/views/user/list';
import UserDetail from '@/views/user/detail';
import Post from '@/views/post/index';

const $routerModel = useRouterModel();

const routes = $routerModel.createRoutes(
  'user',
  {
    namespace: 'demo',
    indexLeadingSlash: true,
    indexView: IndexLayout,
    // indexOptions: {},
    listPath: 'list/:type?',
    listView: UserList,
    listOptions: {
      meta: {
        auth: true
      },
      a: 'hello'
    },
    detailPath: ':userId?',
    detailView: UserDetail
    detailOptions: {
      b: 'world'
    }
  }
);

const route = $routerModel.createRoute('/post', 'post', Post, {
  namespace: 'demo'
});
```
