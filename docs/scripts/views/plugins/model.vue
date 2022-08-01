<template>
  <docs-page name="model" without-css>
    <div>apis: {{ apis }}</div>
    <hr />
    <div>routes: {{ routes }}</div>
    <br />
    <div>route: {{ route }}</div>
  </docs-page>
</template>

<script>
export default {
  data() {
    return {
      apis: this.$apiModel.apis,
      routes: this.$routerModel.createRoutes(
        'user',
        {
          indexView: 'BlankLayout',
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
      ),
      route: this.$routerModel.createRoute('/post', 'post', 'PostView', {
        namespace: 'user'
      })
    };
  }
};
</script>
