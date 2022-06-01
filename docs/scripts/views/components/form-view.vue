<template>
  <div>
    <ui-form-view v-model="formData" :model-config="config" debug>
      <template #after="{ actionClass, data }">
        <ui-form-field :class="actionClass">
          <ui-button raised @click="onSubmit(data)">Submit</ui-button>
        </ui-form-field>
      </template>
    </ui-form-view>
    formData: {{ formData }}
  </div>
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
