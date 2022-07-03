<template>
  <div>
    <ui-form-view
      v-model="formData"
      :model-config="modelConfig"
      :model-options="modelOptions"
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

<script>
import defaultModelConfig from '@/model-config/a.json';

const defaultSelectOptions = [
  {
    label: 'A',
    value: 1
  },
  {
    label: 'B',
    value: 2
  }
];

const defaultCheckboxOptions = [
  {
    label: 'C',
    value: 3
  },
  {
    label: 'D',
    value: 4
  }
];

const defaultRadioOptions = [
  {
    label: 'E',
    value: 5
  },
  {
    label: 'F',
    value: 6
  }
];

const defaultChipsOptions = [
  {
    label: 'G',
    value: 7
  },
  {
    label: 'H',
    value: 8
  },
  {
    label: 'I',
    value: 9
  }
];
</script>

<script setup>
import { reactive, toRefs, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useHttp } from '@/plugins/http';
import { loadAsset } from '@/utils';

const route = useRoute();
const http = useHttp();

const state = reactive({
  formData: {
    a: 'hello',
    b: 'world'
  },
  modelConfig: defaultModelConfig,
  modelOptions: {
    selectOptions: defaultSelectOptions,
    checkboxOptions: defaultCheckboxOptions,
    radioOptions: defaultRadioOptions,
    chipsOptions: defaultChipsOptions,
    multiSelectOptions1: []
  },
  message: ''
});
const { formData, modelConfig, modelOptions, message } = toRefs(state);

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

  const selectOptions = await http.post('/mock/select/options');
  const checkboxOptions = await http.post('/mock/checkbox/options');
  const radioOptions = await http.post('/mock/radio/options');
  const chipsOptions = await http.post('/mock/chips/options');
  const multiSelectOptions1 = await http.post('/mock/multi-select/options1');

  state.modelOptions.selectOptions = selectOptions;
  state.modelOptions.checkboxOptions = checkboxOptions;
  state.modelOptions.radioOptions = radioOptions;
  state.modelOptions.chipsOptions = chipsOptions;
  state.modelOptions.multiSelectOptions1 = multiSelectOptions1;

  if (id.value) {
    state.formData = await http.get(`/user/${id.value}`, {
      baseURL: '/api/mock'
    });
  } else {
    setTimeout(() => {
      state.formData = {
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
