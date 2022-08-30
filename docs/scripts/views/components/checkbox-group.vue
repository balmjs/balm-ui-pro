<template>
  <docs-page name="checkbox-group" without-css demo-count="1">
    <ui-form-view v-model="formData" :model-config="modelConfig"></ui-form-view>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>

<script>
import modelConfig from '@/views/model-config/checkbox-group';

export default {
  data() {
    return {
      modelConfig,
      formData: {}
    };
  }
};
</script>
