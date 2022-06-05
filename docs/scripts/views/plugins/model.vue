<template>
  <div>
    <div>model: {{ model }}</div>
    <div>apis: {{ apis }}</div>
    <div>apiName: {{ apiName }}</div>
    <div>routes: {{ routes }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: 'user',
      apis: this.$apiModel.createApis(
        'user',
        '/api/user',
        {
          updateUserStatus: 'status'
        },
        {
          crud: {
            detail: 'info'
          },
          exclude: ['update']
        }
      ),
      apiName: this.$apiModel.getApiName('user', 'list'),
      routes: this.$routerModel.createViewRoutes(
        'user',
        {
          BlankView: 'blank-layout',
          ListView: 'list-view',
          DetailView: 'detail-view'
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
