<template>
  <div>
    <ui-detail-view
      title="Detail View"
      model="user"
      model-path="model-config/b.js"
      :to="{
        name: 'components.table-view'
      }"
      @change:x="onChange"
      @action="onAction"
    >
      <template #custom-slot>gg</template>
    </ui-detail-view>
  </div>
</template>

<script setup>
function onChange(key, value, _) {
  console.log('onChange', key, value, _);
}

function onAction(action, data) {
  console.log('onAction', action, data);
}
</script>
