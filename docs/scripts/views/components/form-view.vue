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
      <template #form-item__ui-textfield--l>
        <input v-model="formData.l" />
      </template>
      <template #custom-slot>gg</template>
      <!-- <template #actions="{ className, data }">
        <ui-form-field :class="className">
          <ui-button raised @click="onSubmit(data)">Custom Submit</ui-button>
        </ui-form-field>
      </template> -->
      <template #after="{ data }">
        <div>inner formData: {{ data }}</div>
        <ui-alert v-if="message" state="warning">{{ message }}</ui-alert>
      </template>
    </ui-form-view>

    <ui-button @click="clearFormData">Clear formData</ui-button>
    <ui-button @click="setFormData">Set formData</ui-button>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useHttp } from '@/plugins/http';
import { loadAsset } from '@/utils';
import defaultModelConfig from '@/model-config/a.json';

const route = useRoute();
const http = useHttp();

const state = reactive({
  modelConfig: defaultModelConfig,
  formData: {
    a: 'hello',
    f: 5
  },
  message: ''
});
const { modelConfig, formData, message } = toRefs(state);

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

const id = computed(() => route.params.id || 0);

onMounted(async () => {
  state.modelConfig = await loadAsset('model-config/b.js');
  if (id.value) {
    state.formData = await http.get(`/user/${id.value}`, {
      baseURL: '/api/mock'
    });
  } else {
    setTimeout(() => {
      state.formData = {
        a: 'world',
        d: 1,
        f: 5,
        g: [8]
      };
    }, 1e3);
  }
});

function onAction({ type, valid, message }) {
  console.log('onAction', type);

  if (type === 'submit') {
    state.message = message;

    if (valid) {
      console.log('gg');
    }
  }
}

function onSubmit(data) {
  console.log('onSubmit', data, state.formData);
}

function clearFormData() {
  state.formData = {};
}

function setFormData() {
  state.formData = {
    a: 'xxx',
    b: 'yyy'
  };
}
</script>
