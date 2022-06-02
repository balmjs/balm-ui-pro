<template>
  <div>
    <ui-form-view
      v-model="formData"
      :model-config="modelConfig"
      :action-config="actionConfig"
      debug
      @action="onAction"
    >
      <!-- <template #actions="{ className, data }">
        <ui-form-field :class="className">
          <ui-button raised @click="onSubmit(data)">Custom Submit</ui-button>
        </ui-form-field>
      </template> -->
    </ui-form-view>

    formData: {{ formData }}
  </div>
</template>

<script>
import { loadAsset } from '@/utils';

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
      modelConfig: [],
      formData: {},
      actionConfig
    };
  },
  async mounted() {
    const module = await loadAsset('model-config/b.js');

    setTimeout(() => {
      this.modelConfig = module;
      setTimeout(() => {
        this.formData = {
          a: 'world'
        };
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
