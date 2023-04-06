<template>
  <docs-page name="detail-view" without-css demo-count="1">
    <ui-detail-view
      title="Detail View"
      model="user"
      model-path="model-config/b.js"
      :to="{
        name: 'components.list-view'
      }"
      :form-view-attr-or-prop="{
        components
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
import XFormItem from '@/components/x-form-item';

const components = {
  XFormItem
};

function onChange(key, value, _) {
  console.log('onChange', key, value, _);
}

function onAction(action, data) {
  console.log('onAction', action, data);
}
</script>
