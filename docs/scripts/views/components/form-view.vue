<template>
  <docs-page name="form-view" without-css demo-count="1">
    <ui-form-view
      v-model="formData"
      :model-config="modelConfig"
      :action-config="actionConfig"
      :test="onTest"
      @loaded="onLoaded"
      @action="onAction"
      @update:x="onChange"
    >
      <template #before-form-view>
        <div>outer formData: {{ formDataSource }}</div>
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
      <template #after-form-view="{ data }">
        <hr />
        <div>inner formData: {{ data }}</div>
        <ui-alert v-if="message" state="warning">{{ message }}</ui-alert>
      </template>
    </ui-form-view>
    <!-- <ui-button @click="clearFormData">Clear formData</ui-button>
    <ui-button @click="setFormData">Set formData</ui-button> -->
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>


<script setup>
import { reactive, toRefs, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'balm-ui';
import defaultModelConfig from '@/views/model-config/a.json';

const route = useRoute();
const store = useStore();

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

async function onTest() {
  const modelConfig = await store.getModelConfig('model-config/b.js');
  console.log('hello test');
  return modelConfig;
}

const state = reactive({
  formDataSource: {},
  formData: {
    a: 'hello',
    b: 'world'
  },
  modelConfig: defaultModelConfig,
  message: ''
});
const { formDataSource, formData, modelConfig, message } = toRefs(state);

const id = computed(() => route.params.id || 0);

onMounted(async () => {
  state.modelConfig = await store.getModelConfig('model-config/b.js');

  if (id.value) {
    state.formDataSource = await store.getModelDetail('user', {
      id: id.value
    });
    state.formData = Object.assign({}, state.formDataSource);
  } else {
    setTimeout(() => {
      state.formDataSource = {
        a: 'a1',
        b: 'b1',
        c: '<p>c1</p>',
        d: 1,
        f: 5,
        g: [7, 8],
        h: '2022-06-11',
        i: ['2022-06-05', '2022-06-15'],
        j: 'off',
        k: 30,
        l: 1,
        m: 11,
        n: 111,
        o: 'o1',
        p: 'p1',
        x: 'xyz'
      };
      state.formData = Object.assign({}, state.formDataSource);
    }, 1e3);
  }
});

function onLoaded(formData) {
  console.info('onLoaded', formData);
}

function onAction(action, result) {
  console.log('onAction', action, result);

  if (action.type === 'submit') {
    const { valid, message } = result;

    state.message = message;

    if (valid) {
      console.log('gg');
    }
  } else {
    state.message = '';
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

function onChange(key, value) {
  console.log('onChange', key, value);
  state.formDataSource[key] = value;
}
</script>
