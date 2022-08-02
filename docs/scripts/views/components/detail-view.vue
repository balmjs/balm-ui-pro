<template>
  <docs-page name="detail-view" without-css>
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
  </docs-page>
</template>

<script>
import {
  defaultSelectOptions,
  defaultCheckboxOptions,
  defaultRadioOptions,
  defaultChipsOptions
} from './options';

export default {
  data() {
    return {
      modelOptions: {
        selectOptions: defaultSelectOptions,
        checkboxOptions: defaultCheckboxOptions,
        radioOptions: defaultRadioOptions,
        chipsOptions: defaultChipsOptions,
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
