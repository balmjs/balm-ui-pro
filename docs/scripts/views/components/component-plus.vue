<template>
  <docs-page name="component-plus" without-css demo-count="2">
    <ui-form-view v-model="formData" :model-config="modelConfig"></ui-form-view>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
    <hr />
    <ui-form-view
      v-model="formData2"
      :model-config="modelConfig2"
    ></ui-form-view>
    <ui-snippet :code="$store.demos[2]"></ui-snippet>
  </docs-page>
</template>

<script>
import { modelConfig, modelConfig2 } from '@/views/model-config/component-plus';

export default {
  data() {
    return {
      modelConfig,
      formData: {
        x: []
      },
      modelConfig2,
      formData2: {
        y: [
          {
            key1: 1,
            key2: 'a'
          },
          {
            key1: 2,
            key2: 'b'
          }
        ]
      }
    };
  }
};
</script>
