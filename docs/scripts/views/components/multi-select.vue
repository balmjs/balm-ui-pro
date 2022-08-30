<template>
  <docs-page name="multi-select" without-css demo-count="1">
    <!-- <ui-multi-select
      v-model="formData"
      :components="components"
    ></ui-multi-select> -->
    <ui-form-view v-model="formData" :model-config="modelConfig"></ui-form-view>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>

<script>
import modelConfig from '@/views/model-config/multi-select';

export default {
  data() {
    return {
      components: [
        {
          key: 'l',
          value: '',
          options: () =>
            this.$store.getModel(
              'demo',
              {},
              { apiAction: 'multiSelectOptions1' }
            ),
          attrOrProp: {
            defaultLabel: 'Select1'
          }
        },
        {
          key: 'm',
          value: '',
          options: ({ l }) =>
            this.$store.getModel(
              'demo',
              { id: l },
              { apiAction: 'multiSelectOptions2' }
            ),
          attrOrProp: {
            defaultLabel: 'Select2'
          }
        },
        {
          key: 'n',
          value: '',
          options: async ({ m }) =>
            await this.$store.getModel(
              'demo',
              { id: m },
              { apiAction: 'multiSelectOptions3' }
            ),
          attrOrProp: {
            defaultLabel: 'Select3'
          }
        }
      ],
      modelConfig,
      formData: {}
    };
  }
};
</script>
