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

<script>
import { loadAsset } from '@/utils';

export default {
  data() {
    return {
      config: [],
      formData: {}
    };
  },
  async mounted() {
    const module = await loadAsset('model-config/b.js');

    setTimeout(() => {
      this.config = module;
      this.formData = {
        a: 'world'
      };
    }, 1e3);
  },
  methods: {
    onSubmit(formData) {
      console.log(formData);
    }
  }
};
</script>
