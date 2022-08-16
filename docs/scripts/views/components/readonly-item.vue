<template>
  <docs-page name="readonly-item" without-css demo-count="1">
    <ui-form-view v-model="formData" :model-config="modelConfig"></ui-form-view>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>

<script>
import modelConfig from '@/views/model-config/readonly';

export default {
  data() {
    return {
      modelConfig,
      formData: {
        a: 'hello',
        b: 'world'
      }
    };
  }
};
</script>
