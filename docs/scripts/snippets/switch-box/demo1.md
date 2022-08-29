- model config

  ```js
  [
    {
      label: 'Switch',
      component: 'ui-switch-box',
      key: 'j',
      value: 'off',
      attrOrProp: {
        options: [
          {
            label: 'ON',
            value: 'on'
          },
          {
            label: 'OFF',
            value: 'off'
          }
        ],
        switchAttrOrProp: {
          trueValue: 'on',
          falseValue: 'off'
        }
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
