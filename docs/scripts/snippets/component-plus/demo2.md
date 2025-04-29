- model config

  ```js
  [
    {
      label: 'Component Plus',
      component: 'ui-component-plus',
      key: 'y',
      value: [],
      attrOrProp: {
        fixed: true,
        componentName: 'demo-component',
        componentModelValue: {},
        componentModelEvent: 'change'
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
        formData: {
          y: [
            {
              key1: 1,
              key2: 'a'
            },
            {
              key1: 2,
              key2: 'b'
            }
          ]
        }
      };
    }
  };
  ```
