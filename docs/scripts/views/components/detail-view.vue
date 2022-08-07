<template>
  <div>
    <ui-detail-view
      title="Detail View"
      model="user"
      :get-model-config-fn="getModelConfig"
      :set-model-data-fn="setModelData"
      @submit="onSubmit"
    >
      <template #custom-slot>gg</template>
    </ui-detail-view>
  </div>
</template>

<script>
import { loadAsset } from '@/utils';

export default {
  methods: {
    async getModelConfig({ model }) {
      console.log('model', model);
      return await loadAsset('model-config/b.js');
    },
    async setModelData() {
      console.log('save');
    },
    onSubmit() {
      console.log('gg');
    }
  }
};
</script>
