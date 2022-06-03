<template>
  <div>
    <ui-form-view
      v-model="formData"
      :model-config="modelConfig"
      :action-config="actionConfig"
      @action="onAction"
    >
      <template #before>
        <div>outer formData: {{ formData }}</div>
        <hr />
      </template>
      <!-- <template #actions="{ className, data }">
        <ui-form-field :class="className">
          <ui-button raised @click="onSubmit(data)">Custom Submit</ui-button>
        </ui-form-field>
      </template> -->
      <template #after="{ data, dataSource }">
        <div>inner formData: {{ data }}</div>
        <hr />
        <div>formDataSource: {{ dataSource }}</div>
      </template>
    </ui-form-view>
  </div>
</template>

<script>
import { loadAsset } from '@/utils';
import modelConfig from '@/model-config/a.json';

const actionConfig = [
  {
    type: 'reset',
    text: 'Reset',
    attrOrProp: {
      outlined: true
    }
  },
  {
    type: 'submit',
    text: 'Submit',
    attrOrProp: {
      raised: true
    }
  }
];

export default {
  data() {
    return {
      modelConfig,
      formData: {
        a: 'hello'
      },
      actionConfig
    };
  },
  async mounted() {
    const module = await loadAsset('model-config/b.js');

    setTimeout(() => {
      this.formData = {
        a: 'world'
      };
      setTimeout(() => {
        this.modelConfig = module;
      }, 1e3);
    }, 1e3);
  },
  methods: {
    onAction(type) {
      console.log('onAction', type);
    },
    onSubmit(data) {
      console.log('onSubmit', data, this.formData);
    }
  }
};
</script>
