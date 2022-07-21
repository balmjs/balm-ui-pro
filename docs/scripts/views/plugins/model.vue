<template>
  <div>
    <div>model: {{ model }}</div>
    <div>apis: {{ apis }}</div>
    <hr />
    <div>routes: {{ routes }}</div>
  </div>
</template>

<script>
import { useApiModel } from 'balm-ui-pro';

const model = 'user';

const $apiModel = useApiModel();

const a = $apiModel.createApis(model, '/api/user', {
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

const b = $apiModel.createApis('post', '/api/post');

// const c = $apiModel.createApis('college-info', '/admin/service', {});

export default {
  data() {
    return {
      model,
      apis: this.$apiModel.apis,
      routes: this.$routerModel.createViewRoutes(
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
      )
    };
  }
};
</script>
