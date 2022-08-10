<template>
  <docs-page name="api-model" without-css demo-count="1">
    <section class="demo-wrapper">
      <div>
        APIs:
        <pre>{{ apis }}</pre>
      </div>
      <hr />
      <ui-form-view
        v-model="formData"
        :model-config="formConfig"
        :action-config="actionConfig"
        use-grid
        @action="onAction"
      >
        <template #after-form-view>
          <ui-alert v-if="message" state="warning">{{ message }}</ui-alert>
          <p v-else>API url: {{ apiUrl }}</p>
        </template>
      </ui-form-view>
      <ui-snippet :code="$store.demos[1]"></ui-snippet>
    </section>
  </docs-page>
</template>

<script>
import { useConstantList } from 'balm-ui-pro';

const formConfig = [
  {
    component: 'ui-select',
    label: 'Model name',
    key: 'modelName',
    value: '',
    attrOrProp: {
      options: useConstantList('modelName')
    },
    validator: 'required'
  },
  {
    component: 'ui-select',
    label: 'Operation',
    key: 'operation',
    value: '',
    attrOrProp: {
      options: useConstantList('operation')
    },
    validator: 'required'
  },
  {
    component: 'ui-textfield',
    label: 'Action suffix',
    key: 'actionSuffix',
    value: ''
  }
];

const actionConfig = [
  {
    type: 'submit',
    text: 'Get API',
    attrOrProp: {
      raised: true
    }
  }
];

export default {
  data() {
    return {
      apis: this.$apiModel.apis,
      formConfig,
      actionConfig,
      formData: {
        modelName: 'user',
        operation: '',
        actionSuffix: ''
      },
      message: '',
      apiUrl: ''
    };
  },
  mounted() {
    this.$apiModel.debug();
  },
  methods: {
    onAction(action, result) {
      const { valid, message } = result;
      this.message = message;

      if (valid) {
        try {
          this.apiUrl = this.$apiModel.getApi(
            this.formData.modelName,
            this.formData.operation,
            this.formData.actionSuffix
          );
        } catch (e) {
          this.message = e.toString();
        }
      }
    }
  }
};
</script>
