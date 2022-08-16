<template>
  <docs-page name="router-model" without-css demo-count="1">
    <section class="demo-wrapper">
      <div>
        routes:
        <pre>{{ routes }}</pre>
      </div>
      <br />
      <div>
        route:
        <pre>{{ route }}</pre>
      </div>
      <ui-snippet :code="$store.demos[1]"></ui-snippet>
    </section>
  </docs-page>
</template>

<script>
import { routes, route } from '@/routes/demo';

export default {
  data() {
    return {
      routes,
      route
    };
  },
  mounted() {
    // this.$routerModel.debug();
  }
};
</script>
