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
    indexView: IndexLayout,
    listView: UserList,
    detailView: UserDetail
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

const route = $routerModel.createRoute('/post', 'post', Post, {
  namespace: 'user'
});
```
