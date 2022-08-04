<template>
  <docs-page name="detail-view" without-css demo-count="1">
    <ui-detail-view
      title="Detail View"
      model="user"
      model-path="model-config/b.js"
      :to="{
        name: 'components.table-view'
      }"
      @cancel="onCancel"
      @submit="onSubmit"
    >
      <template #custom-slot>gg</template>
    </ui-detail-view>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>

<script>
export default {
  methods: {
    onCancel() {
      console.log('cancel');
    },
    onSubmit(result, vm) {
      console.log('submit', result, vm);
    }
  }
};
</script>
