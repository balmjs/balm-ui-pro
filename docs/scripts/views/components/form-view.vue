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
import XFormItem from '@/components/x-form-item';
import { loadAsset } from '@/utils';
import modelConfig from '@/model-config/a.json';

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
  components: {
    // XFormItem
  },
  data() {
    return {
      formData: {
        a: 'hello',
        b: 'world'
      },
      modelConfig,
      modelOptions: {
        selectOptions: defaultSelectOptions,
        checkboxOptions: defaultCheckboxOptions,
        radioOptions: defaultRadioOptions,
        chipsOptions: defaultChipsOptions,
        multiSelectOptions1: []
      },
      actionConfig,
      message: ''
    };
  },
  computed: {
    id() {
      return this.$route.params.id || 0;
    }
  },
  async mounted() {
    this.modelConfig = await loadAsset('model-config/b.js');

    // const selectOptions = await this.$http.post('/mock/select/options');
    // const checkboxOptions = await this.$http.post('/mock/checkbox/options');
    // const radioOptions = await this.$http.post('/mock/radio/options');
    // const chipsOptions = await this.$http.post('/mock/chips/options');
    // const multiSelectOptions1 = await this.$http.post(
    //   '/mock/multi-select/options1'
    // );

    // setTimeout(() => {
    //   this.$set(this.modelOptions, 'selectOptions', selectOptions);
    // }, 100);
    // setTimeout(() => {
    //   this.$set(this.modelOptions, 'checkboxOptions', checkboxOptions);
    // }, 200);
    // setTimeout(() => {
    //   this.$set(this.modelOptions, 'radioOptions', radioOptions);
    // }, 300);
    // setTimeout(() => {
    //   this.$set(this.modelOptions, 'chipsOptions', chipsOptions);
    // }, 400);
    // this.$set(this.modelOptions, 'multiSelectOptions1', multiSelectOptions1);

    if (this.id) {
      this.formData = await this.$http.get(`/user/${this.id}`, {
        baseURL: '/api/mock'
      });
    } else {
      setTimeout(() => {
        this.formData = {
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
  },
  methods: {
    onAction({ type, valid, message }) {
      console.log('onAction', type);

      if (type === 'submit') {
        this.message = message;

        if (valid) {
          console.log('gg');
        }
      }
    },
    onSubmit(data) {
      console.log('onSubmit', data, this.formData);
    },
    clearFormData() {
      this.formData = {};
    },
    setFormData() {
      this.formData = {
        a: 'xxx',
        b: 'yyy'
      };
    }
  }
};
</script>
