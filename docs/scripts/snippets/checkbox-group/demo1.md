- model config

  ```js
  [
    {
      label: 'Checkbox',
      component: 'ui-checkbox-group',
      key: 'e',
      value: [],
      attrOrProp: {
        options: [
          {
            label: 'C',
            value: 3
          },
          {
            label: 'D',
            value: 4
          }
        ]
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
