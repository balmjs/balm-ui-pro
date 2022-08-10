<template>
  <docs-page name="detail-view" without-css demo-count="1">
    <ui-detail-view
      title="Detail View"
      model="user"
      model-path="model-config/b.js"
      :to="{
        name: 'components.table-view'
      }"
      @action="onAction"
    >
      <template #custom-slot>gg</template>
    </ui-detail-view>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>

<script>
export default {
  methods: {
    onAction(action, data) {
      console.log('onAction', action, data);
    }
  }
};
</script>
