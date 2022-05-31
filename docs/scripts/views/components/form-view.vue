<template>
  <ui-form-view v-model="formData" debug :model-config="config"></ui-form-view>
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

    console.log(module);

    // setTimeout(() => {
    //   this.config = module;
    //   this.formData = {
    //     a: 'world'
    //   };
    // }, 1e3);
  }
};
