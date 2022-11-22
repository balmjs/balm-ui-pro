<template>
  <docs-page name="detail-view" without-css demo-count="1">
    <ui-detail-view
      title="Detail View"
      model="user"
      model-path="model-config/b.js"
      :to="{
        name: 'components.list-view'
      }"
      @update:x="onChange"
      @action="onAction"
    >
      <template #custom-slot>gg</template>
    </ui-detail-view>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>

<script setup>
function onChange(key, value, _) {
  console.log('onChange', key, value, _);
}

function onAction(action, data) {
  console.log('onAction', action, data);
}
</script>
