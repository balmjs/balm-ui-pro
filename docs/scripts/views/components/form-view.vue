<template>
  <docs-page
    name="form-view"
    :apis="['form-view', 'form-item']"
    without-css
    demo-count="1"
  >
    <ui-form-view
      v-model="formData"
      :components="components"
      :model-config="modelConfig"
      :model-options="{
        extra
      }"
      :action-config="actionConfig"
      @loaded="onLoaded"
      @action="onAction"
      @change:x="onChange"
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
        <ui-form-field>
          <label for="extra-option">
            Extra options: select disabled ({{ extra }})
          </label>
          <ui-checkbox v-model="extra" input-id="extra-option"></ui-checkbox>
        </ui-form-field>

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

<script>
import XFormItem from '@/components/x-form-item';
import modelConfig from '@/views/model-config/a.json';
// import {
//   defaultSelectOptions,
//   defaultCheckboxOptions,
//   defaultRadioOptions,
//   defaultChipsOptions,
//   switchOptions
// } from './options';

const components = {
  XFormItem
};

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
      components,
      formDataSource: {},
      formData: {
        a: 'hello',
        b: 'world'
      },
      modelConfig,
      extra: false,
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

    if (this.id) {
      this.formDataSource = await this.$store.getModelDetail('user', {
        id: this.id
      });
      this.formData = Object.assign({}, this.formDataSource);
    } else {
      setTimeout(() => {
        this.formDataSource = {
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
        this.formData = Object.assign({}, this.formDataSource);
      }, 1e3);
    }
  },
  methods: {
    onLoaded(formData) {
      console.info('onLoaded', formData);
    },
    onAction(action, result) {
      console.log('onAction', action, result);

      if (action.type === 'submit') {
        const { valid, message } = result;

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
      this.$set(this.formDataSource, key, value);
    }
  }
};
</script>
