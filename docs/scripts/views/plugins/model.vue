<template>
  <div>
    <div>apis: {{ apis }}</div>
    <hr />
    <div>routes: {{ routes }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apis: this.$apiModel.apis,
      routes: this.$routerModel.createViewRoutes(
        'user',
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
