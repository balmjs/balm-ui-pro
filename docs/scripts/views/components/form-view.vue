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
        a: 'hello',
        f: 5
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
    if (this.id) {
      this.formData = await this.$http.get(`/user/${this.id}`, {
        baseURL: '/api/mock'
      });
    } else {
      setTimeout(() => {
        this.formData = {
          a: 'world',
          d: 1,
          f: 5,
          g: [8]
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
