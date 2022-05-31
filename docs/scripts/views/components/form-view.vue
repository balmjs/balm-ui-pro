<template>
  <ui-form-view v-model="formData" :model-config="config"></ui-form-view>
</template>

<script setup>
import { reactive, toRefs, onMounted } from 'vue';
import { loadAsset } from '@/utils';

const state = reactive({
  config: [],
  formData: {}
});
const { config, formData } = toRefs(state);

onMounted(async () => {
  const module = await loadAsset('model-config/b.js');

  setTimeout(() => {
    state.config = module;
    state.formData = {
      a: 'world'
    };
  }, 1e3);
});
</script>
