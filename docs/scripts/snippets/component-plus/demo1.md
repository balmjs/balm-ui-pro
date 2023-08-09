- model config

  ```js
  [
    {
      label: 'Component Plus',
      component: 'ui-component-plus',
      key: 'x',
      value: [],
      attrOrProp: {
        componentName: 'ui-textfield',
        componentModelEvent: 'input'
      }
    }
  ];
  ```

- page

  ```html
  <ui-form-view v-model="formData" :model-config="modelConfig"></ui-form-view>
  ```

  ```js
  import modelConfig from '@/model-config/demo';

  export default {
    data() {
      return {
        modelConfig,
        formData: {}
      };
    }
  };
  ```
