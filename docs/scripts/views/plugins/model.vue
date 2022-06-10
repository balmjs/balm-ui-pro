<template>
  <div>
    <div>model: {{ model }}</div>
    <div>apis: {{ apis }}</div>
    <hr />
    <div>routes: {{ routes }}</div>
  </div>
</template>

<script setup>
import { useApiModel, useRouterModel } from 'balm-ui-pro';

const model = 'user';

const apiModel = useApiModel();
const routerModel = useRouterModel();

const a = apiModel.createApis(model, '/api/user', {
  // create: {},
  read: {
    list: 'index',
    detail: 'info'
  }
  // update: {
  //   status: 'xxx/status'
  // },
  // delete: {
  //   id: 'id'
  // },
  // excludeDefaults: ['create']
});

const b = apiModel.createApis('post', '/api/post');

const apis = apiModel.apis;

const routes = routerModel.createViewRoutes(
  model,
  {
    indexView: 'blank-layout',
    listView: 'list-view',
    detailView: 'detail-view'
  },
  {
    listPath: 'list/:type?',
    detailPath: ':userId?',
    listOptions: {
      meta: {
        auth: true
      },
      a: 'hello'
    },
    detailOptions: {
      b: 'world'
    }
  }
);
</script>
