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

<script setup>
import { reactive, toRefs, onMounted } from 'vue';
import { loadAsset } from '@/utils';
import defaultModelConfig from '@/model-config/a.json';

const state = reactive({
  modelConfig: defaultModelConfig,
  formData: {
    a: 'hello'
  }
});
const { modelConfig, formData } = toRefs(state);

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

onMounted(async () => {
  const module = await loadAsset('model-config/b.js');

  setTimeout(() => {
    state.formData = {
      a: 'world'
    };
    setTimeout(() => {
      state.modelConfig = module;
    }, 1e3);
  }, 1e3);
});

function onAction(type) {
  console.log('onAction', type);
}

function onSubmit(data) {
  console.log('onSubmit', data, state.formData);
}
</script>
