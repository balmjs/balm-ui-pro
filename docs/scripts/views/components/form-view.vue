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

<script setup>
import { reactive, toRefs, onMounted } from 'vue';
import { loadAsset } from '@/utils';

const state = reactive({
  modelConfig: [],
  formData: {}
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
    state.modelConfig = module;
    setTimeout(() => {
      state.formData = {
        a: 'world'
      };
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
