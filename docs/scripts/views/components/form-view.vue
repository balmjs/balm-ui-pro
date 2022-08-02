<template>
  <docs-page name="form-view" without-css>
    <ui-form-view
      v-model="formData"
      :model-config="modelConfig"
      :model-options="modelOptions"
      :action-config="actionConfig"
      @action="onAction"
      @change:x="onChange"
    >
      <template #before-form-view>
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
      <template #after-form-view="{ data }">
        <hr />
        <div>inner formData: {{ data }}</div>
        <ui-alert v-if="message" state="warning">{{ message }}</ui-alert>
      </template>
    </ui-form-view>
    <!-- <ui-button @click="clearFormData">Clear formData</ui-button>
    <ui-button @click="setFormData">Set formData</ui-button> -->
  </docs-page>
</template>

<script>
import XFormItem from '@/components/x-form-item';
import modelConfig from '@/model-config/a.json';
import {
  defaultSelectOptions,
  defaultCheckboxOptions,
  defaultRadioOptions,
  defaultChipsOptions
} from './options';

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
    this.modelConfig = await this.$store.getModelConfig('model-config/b.js');

    // const selectOptions = await this.$store.getModel(
    //   'demo',
    //   {},
    //   { apiName: 'selectOptions' }
    // );
    // const checkboxOptions = await this.$store.getModel(
    //   'demo',
    //   {},
    //   { apiName: 'checkboxOptions' }
    // );
    // const radioOptions = await this.$store.getModel(
    //   'demo',
    //   {},
    //   { apiName: 'radioOptions' }
    // );
    // const chipsOptions = await this.$store.getModel(
    //   'demo',
    //   {},
    //   { apiName: 'chipsOptions' }
    // );
    const multiSelectOptions1 = await this.$store.getModel(
      'demo',
      {},
      { apiName: 'multiSelectOptions1' }
    );

    // this.$set(this.modelOptions, 'selectOptions', selectOptions);
    // this.$set(this.modelOptions, 'checkboxOptions', checkboxOptions);
    // this.$set(this.modelOptions, 'radioOptions', radioOptions);
    // this.$set(this.modelOptions, 'chipsOptions', chipsOptions);
    this.$set(this.modelOptions, 'multiSelectOptions1', multiSelectOptions1);

    if (this.id) {
      this.formData = await this.$store.getModelDetail('user', {
        id: this.id
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
      } else {
        this.message = '';
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
    },
    onChange(key, value) {
      console.log('onChange', key, value);
    }
  }
};
</script>
