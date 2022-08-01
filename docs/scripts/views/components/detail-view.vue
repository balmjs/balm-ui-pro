<template>
  <div>
    <ui-detail-view
      title="Detail View"
      model="user"
      model-path="model-config/b.js"
      :model-options="modelOptions"
      :to="{
        name: 'components.table-view'
      }"
      @submit="onSubmit"
    >
      <template #custom-slot>gg</template>
    </ui-detail-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelOptions: {
        selectOptions: [],
        checkboxOptions: [],
        radioOptions: [],
        chipsOptions: [],
        multiSelectOptions1: []
      }
    };
  },
  methods: {
    onSubmit() {
      console.log('gg');
    }
  }
};
</script>
